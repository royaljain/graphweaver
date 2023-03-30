import { ApolloQueryResult, useMutation } from '@apollo/client';
import classnames from 'classnames';
import { Field, Form, Formik, FormikHelpers, useField } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from '../modal';
import { useAsyncError, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Dropdown, DropdownItem } from '../dropdown';

import {
	decodeSearchParams,
	Entity,
	EntityField,
	getEntity,
	routeFor,
	useSchema,
	useSelectedEntity,
} from '../utils';
import { Button } from '../button';
import { Spinner } from '../spinner';

import { generateUpdateEntityMutation } from './graphql';

import styles from './styles.module.css';
import { flattenRelationshipIds } from './utils';

interface ResultBaseType {
	id: string;
}

const DetailPanelError = () => {
	const error = useAsyncError() as Error;

	console.error(error);

	return <pre className={styles.wrapper}>Error!: {error.message}</pre>;
};

const SelectField = ({ name }: { name: string }) => {
	const [field, meta] = useField({ name, multiple: false });
	const { initialValue } = meta;

	console.log(initialValue);

	const initialOption: DropdownItem = initialValue;
	const options = [initialOption];

	return <Dropdown items={options} className={styles.selectField} defaultValue={initialOption} />;
};

const DetailField = ({ field }: { field: EntityField }) => {
	if (field.relationshipType) {
		// @todo: For these fields we want both the ID and the name (value)
		return (
			<div className={styles.detailField}>
				<label htmlFor={field.name} className={styles.fieldLabel}>
					{field.name}
				</label>
				<SelectField name={field.name} />
			</div>
		);
	}
	return (
		<div className={styles.detailField}>
			<label htmlFor={field.name} className={styles.fieldLabel}>
				{field.name}
			</label>
			<Field id={field.name} name={field.name} className={styles.textInputField} />
		</div>
	);
};

const DetailForm = ({
	initialValues,
	detailFields,
	onCancel,
	onSubmit,
}: {
	initialValues: Record<string, any>;
	detailFields: EntityField[];
	onSubmit: (values: any, actions: FormikHelpers<any>) => void;
	onCancel: () => void;
}) => {
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} onReset={onCancel}>
			{({ isSubmitting }) => (
				<Form className={styles.detailFormContainer}>
					<div className={styles.detailFieldList}>
						{detailFields.map((field) => {
							return <DetailField key={field.name} field={field} />;
						})}
						<div className={styles.detailButtonContainer}>
							<Button type="reset" disabled={isSubmitting}>
								Cancel
							</Button>
							<Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
								Save
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const ModalContent = ({
	selectedEntity,
	detail,
	onClose,
}: {
	selectedEntity: Entity;
	detail: ApolloQueryResult<{ result: ResultBaseType }>;
	onClose: () => void;
}) => {
	// @todo: Modal won't reopen on same record once closed
	const [id, setId] = useState<string | null>(null);
	const [closing, setClosing] = useState(false);
	const { entityByType } = useSchema();

	useEffect(() => {
		setId(detail.data.result.id);
	}, [detail.data.result]);

	const getValue = (field: EntityField, result: any) => {
		if (field.relationshipType) {
			const relatedEntity = entityByType(field.type);
			const relatedField = result[field.name];

			return {
				id: relatedField.id,
				name: relatedField
					? relatedField[relatedEntity?.summaryField || ('id' as keyof typeof result)]
					: '',
			};
		}
		return result[field.name as keyof typeof result];
	};

	// Weed out ID fields - for the moment.
	const formFields: EntityField[] = selectedEntity.fields.filter((field) => field.name !== 'id');

	const initialValues = formFields.reduce((acc, field) => {
		const { result } = detail.data;
		const value = getValue(field, result);
		//@todo: For relationshipType fields, we want both the ID and the value
		acc[field.name] = value || '';
		return acc;
	}, {} as Record<string, any>);

	const [updateEntity] = useMutation(generateUpdateEntityMutation(selectedEntity, entityByType));

	// Orchestrate close so that slideout gets time to execute (0.5s)
	const closeModal = () => {
		setClosing(true);
		setId(null);
		setTimeout(() => {
			setClosing(false);
			onClose();
		}, 500);
	};

	const handleOnSubmit = async (values: any, actions: FormikHelpers<any>) => {
		const id = detail.data.result.id;
		console.log(values, detail.data.result);
		await updateEntity({
			variables: {
				data: {
					id,
					...flattenRelationshipIds(values),
				},
			},
		});
		actions.setSubmitting(false);
		onClose();
	};

	return (
		<Modal
			isOpen={closing || id !== null}
			onRequestClose={closeModal}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			className={id ? styles.detailContainer : classnames(styles.detailContainer, styles.finished)}
			title={selectedEntity.name}
			modalContent={
				<DetailForm
					initialValues={initialValues}
					detailFields={formFields}
					onCancel={closeModal}
					onSubmit={handleOnSubmit}
				/>
			}
		/>
	);
};

export const DetailPanel = ({ refetchData }: { refetchData: () => void }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { selectedEntity } = useSelectedEntity();
	const { entityByName } = useSchema();
	const [search] = useSearchParams();
	if (!selectedEntity) throw new Error('There should always be a selected entity at this point.');
	const [detail, setDetail] = useState<ApolloQueryResult<any> | null>(null);
	const fetchData = useCallback(async () => {
		if (id) {
			const result = await getEntity(selectedEntity, id, entityByName);
			if (result) setDetail(result);
		}
	}, [id]);

	// Don't put fetchData into dependency array here - causes inf loop
	useEffect(() => {
		fetchData()
			// TODO: error handling
			.catch(console.error);
	}, [id]);

	const navigateBack = useCallback(() => {
		setDetail(null);
		const { filters, sort } = decodeSearchParams(search);
		navigate(routeFor({ entity: selectedEntity, filters, sort }));
		refetchData();
	}, [search, selectedEntity]);

	if (!detail) return null;

	if (detail.loading) {
		return (
			<pre>
				<Spinner />
			</pre>
		);
	}
	if (detail.error || detail.errors) {
		return <DetailPanelError />;
	}

	if (detail.data.result === null) {
		return <pre className={styles.wrapper}>Data result is null</pre>;
	}

	return <ModalContent selectedEntity={selectedEntity} detail={detail} onClose={navigateBack} />;
};
