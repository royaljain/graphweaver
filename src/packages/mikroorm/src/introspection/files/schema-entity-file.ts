import type {
	Dictionary,
	EntityMetadata,
	EntityProperty,
	NamingStrategy,
	Platform,
} from '@mikro-orm/core';
import { ReferenceType, Utils } from '@mikro-orm/core';

import { BaseFile } from './base-file';

export class SchemaEntityFile extends BaseFile {
	protected readonly coreImports = new Set<string>();
	protected readonly scalarImports = new Set<string>();
	protected readonly entityImports = new Set<string>();
	protected readonly enumImports = new Set<string>();

	constructor(
		protected readonly meta: EntityMetadata,
		protected readonly namingStrategy: NamingStrategy,
		protected readonly platform: Platform
	) {
		super(meta, namingStrategy, platform);
	}

	getBasePath() {
		const dirName = this.pascalToKebabCaseString(this.meta.className);
		return `backend/schema/${dirName}/`;
	}

	getBaseName() {
		return 'entity.ts';
	}

	generate(): string {
		const enumDefinitions: string[] = [];
		let classBody = '\n';
		const props = Object.values(this.meta.properties);
		props.forEach((prop) => {
			const decorator = this.getPropertyDecorator(prop);
			const definition = this.getPropertyDefinition(prop);

			if (!classBody.endsWith('\n\n')) {
				classBody += '\n';
			}

			classBody += decorator;
			classBody += definition;

			if (props[props.length - 1] !== prop) classBody += '\n';

			if (prop.enum) {
				const enumClassName = this.namingStrategy.getClassName(
					this.meta.collection + '_' + prop.fieldNames[0],
					'_'
				);
				enumDefinitions.push(this.getEnumClassDefinition(enumClassName));
			}
		});

		let ret = '';

		if (enumDefinitions.length) {
			ret += enumDefinitions.join('\n');
			ret += '\n\n';
		}

		this.coreImports.add('ObjectType');
		ret += `@ObjectType(${this.quote(this.meta.className)})\n`;

		this.coreImports.add('GraphQLEntity');
		ret += `export class ${this.meta.className} extends GraphQLEntity<Orm${this.meta.className}> {\n`;
		ret += `\tpublic dataEntity!: Orm${this.meta.className};`;

		ret += `${classBody}}\n`;
		const imports = [
			`import { ${[...this.coreImports].sort().join(', ')} } from '@exogee/graphweaver';`,
		];

		if (this.scalarImports.size > 0) {
			imports.push(
				`import { ${[...this.scalarImports]
					.sort()
					.join(', ')} } from '@exogee/graphweaver-scalars';`
			);
		}

		const entityImports = [...this.entityImports].filter((e) => e !== this.meta.className);
		entityImports.sort().forEach((entity) => {
			imports.push(`import { ${entity} } from '../${this.pascalToKebabCaseString(entity)}';`);
		});

		imports.push(
			`import { ${this.enumImports.size > 0 ? [...this.enumImports].sort().join(', ') + ', ' : ''}${
				this.meta.className
			} as Orm${this.meta.className} } from '../../entities';`
		);

		ret = `${imports.join('\n')}\n\n${ret}`;

		return ret;
	}

	protected getTypescriptPropertyType(prop: EntityProperty): string {
		if (['jsonb', 'json', 'any'].includes(prop.columnTypes?.[0])) {
			return `Record<string, unknown>`;
		}

		return prop.type;
	}

	protected getPropertyDefinition(prop: EntityProperty): string {
		const padding = '\t';

		if ([ReferenceType.ONE_TO_MANY, ReferenceType.MANY_TO_MANY].includes(prop.reference)) {
			this.entityImports.add(prop.type);
			return `${padding}${prop.name}!: ${prop.type}[];\n`;
		}

		// string defaults are usually things like SQL functions, but can be also enums, for that `useDefault` should be true
		const isEnumOrNonStringDefault = prop.enum || typeof prop.default !== 'string';
		const useDefault = prop.default != null && isEnumOrNonStringDefault;
		const optional = prop.nullable ? '?' : useDefault ? '' : '!';

		const ret = `${prop.name}${optional}: ${this.getTypescriptPropertyType(prop)}`;

		if (!useDefault) {
			return `${padding + ret};\n`;
		}

		if (prop.enum && typeof prop.default === 'string') {
			return `${padding}${ret} = ${prop.type}.${prop.default.toUpperCase()};\n`;
		}

		return `${padding}${prop.name} = ${prop.default};\n`;
	}

	protected getEnumClassDefinition(enumClassName: string): string {
		this.coreImports.add('registerEnumType');
		this.enumImports.add(enumClassName);
		return `registerEnumType(${enumClassName}, { name: ${this.quote(enumClassName)} });`;
	}

	private getGraphQLPropertyType(prop: EntityProperty): string {
		if (prop.primary) {
			this.coreImports.add('ID');
			return 'ID';
		}

		if (prop.type === 'Date') {
			this.scalarImports.add('ISODateStringScalar');
			return 'ISODateStringScalar';
		}

		if (prop.columnTypes?.[0] === 'date') {
			this.scalarImports.add('DateScalar');
			return 'DateScalar';
		}

		if (prop.type === 'unknown') {
			return 'String';
		}

		if (['jsonb', 'json', 'any'].includes(prop.columnTypes?.[0])) {
			this.scalarImports.add('GraphQLJSONObject');
			return `GraphQLJSONObject`;
		}

		if (prop.type.includes('[]')) {
			return `[${prop.type.charAt(0).toUpperCase() + prop.type.slice(1).replace('[]', '')}]`;
		}

		if (prop.pivotTable) {
			return `[${prop.type.charAt(0).toUpperCase() + prop.type.slice(1)}]`;
		}

		return prop.type.charAt(0).toUpperCase() + prop.type.slice(1);
	}

	private getPropertyDecorator(prop: EntityProperty): string {
		const padding = '\t';
		const options = {} as Dictionary;
		let decorator = this.getDecoratorType(prop);

		if ([ReferenceType.MANY_TO_MANY, ReferenceType.ONE_TO_MANY].includes(prop.reference)) {
			this.getManyToManyDecoratorOptions(options, prop);
		} else if (prop.reference === ReferenceType.ONE_TO_MANY) {
			this.getOneToManyDecoratorOptions(options, prop);
		} else if (prop.reference !== ReferenceType.SCALAR) {
			this.getForeignKeyDecoratorOptions(options, prop);
		}

		this.getCommonDecoratorOptions(options, prop);
		decorator = [decorator].map((d) => padding + d).join('\n');

		if (!Utils.hasObjectKeys(options)) {
			return `${decorator}(() => ${this.getGraphQLPropertyType(prop)})\n`;
		}

		return `${decorator}(() => ${this.getGraphQLPropertyType(prop)}, { ${Object.entries(options)
			.map(([opt, val]) => `${opt}: ${val}`)
			.join(', ')} })\n`;
	}

	protected getCommonDecoratorOptions(options: Dictionary, prop: EntityProperty): void {
		if (prop.nullable && !prop.mappedBy) {
			options.nullable = true;
		}
	}

	protected getManyToManyDecoratorOptions(options: Dictionary, prop: EntityProperty) {
		this.entityImports.add(prop.type);
		options.relatedField = this.quote(`${this.snakeToCamelCaseString(this.meta.collection)}s`);
	}

	protected getOneToManyDecoratorOptions(options: Dictionary, prop: EntityProperty) {
		this.entityImports.add(prop.type);
		options.entity = `() => ${prop.type}`;
		options.mappedBy = this.quote(prop.mappedBy);
	}

	protected getForeignKeyDecoratorOptions(options: Dictionary, prop: EntityProperty) {
		const parts = prop.referencedTableName.split('.', 2);
		const className = this.namingStrategy.getClassName(parts.length > 1 ? parts[1] : parts[0], '_');
		this.entityImports.add(className);
		options.id = `(entity) => entity.${prop.name}?.id`;
	}

	protected getDecoratorType(prop: EntityProperty): string {
		if ([ReferenceType.ONE_TO_ONE, ReferenceType.MANY_TO_ONE].includes(prop.reference)) {
			this.coreImports.add('RelationshipField');
			return `@RelationshipField<${this.meta.className}>`;
		}

		if ([ReferenceType.ONE_TO_MANY, ReferenceType.MANY_TO_MANY].includes(prop.reference)) {
			this.coreImports.add('RelationshipField');
			return `@RelationshipField<${prop.type}>`;
		}

		this.coreImports.add('Field');
		return '@Field';
	}
}
