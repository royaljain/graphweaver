import { useContext } from 'react';
import { DataContext, Filter, MultiSelect, SelectOption, useSchema } from '..';

interface TextFilterProps {
	fieldName: string;
	entity: string;
	onChange?: (fieldName: string, filter?: Filter) => void;
	initialFilter?: Filter;
	resetCount: number; // We use this to reset the filter using the key
}

export const TextFilter = <T extends { id: string }>({
	fieldName,
	entity,
	onChange,
	initialFilter,
	resetCount,
}: TextFilterProps) => {
	const { entityByName } = useSchema();
	const { entityState } = useContext(DataContext);

	const entityType = entityByName(entity);
	const data = entityState[entity]?.data;
	const field = entityType?.fields.find((f) => f.name === fieldName);
	const value = initialFilter?.[fieldName];
	let textOptions: SelectOption[] = [];
	if (data && field && data.length > 0) {
		// Get a unique, sorted list
		textOptions = data
			// yuk
			.map((item) => (item as any)[field.name])
			.reduce((arr: string[], item) => {
				if (!arr.includes(item)) {
					arr.push(item);
				}
				return arr;
			}, [])
			.sort((a, b) => a?.toLocaleLowerCase().localeCompare(b?.toLocaleLowerCase()))
			// value = label, we don't care
			.map((item) => ({ label: item, value: item }));
	}

	const handleOnChange = (options?: SelectOption[]) => {
		onChange?.(
			fieldName,
			(options ?? [])?.length > 0
				? // @todo this can be expanded to support the in operator { [`${fieldName}_in`]: options?.map((option) => option.value) }
				  { [fieldName]: options?.[0]?.value }
				: undefined
		);
	};

	return (
		<MultiSelect
			key={fieldName + resetCount}
			options={textOptions}
			value={initialFilter && resetCount === 0 ? [{ value, label: value as string }] : []}
			placeholder={fieldName}
			onChange={handleOnChange}
		/>
	);
};
