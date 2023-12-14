import { useField } from 'formik';
import { useEffect } from 'react';
import { SelectOption, Select, SelectMode } from '../../multi-select';
import { Enum } from '../../utils';

export const EnumField = ({ name, typeEnum }: { name: string; typeEnum: Enum }) => {
	const [_, meta, helpers] = useField({ name, multiple: false });
	const { initialValue } = meta;

	useEffect(() => {
		helpers.setValue(initialValue);
	}, []);

	const handleOnChange = (selected: SelectOption[]) => {
		const value = selected?.[0]?.value;
		if (value === undefined) {
			helpers.setValue(undefined);
		} else {
			helpers.setValue(value);
		}
	};

	const enumOptions = Array.from(typeEnum.values).map((v) => ({
		label: v.name,
		value: v.value,
	}));

	return (
		<Select
			options={enumOptions}
			value={initialValue ? [{ value: initialValue, label: `${initialValue}` }] : []}
			onChange={handleOnChange}
			mode={SelectMode.SINGLE}
		/>
	);
};
