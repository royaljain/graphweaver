import { buildSchema } from 'type-graphql';
import fs from 'fs';
import path from 'path';

import { codeGenerator } from '../codegen';

const importResolvers = async () => {
	const resolverPath = path.join(process.cwd(), './dist/backend/index.js');
	const { resolvers } = await import(resolverPath);
	return resolvers;
};

export const buildTypes = async () => {
	console.log('building types');
	const resolvers = await importResolvers();
	const schema = await buildSchema({
		resolvers,
	});
	console.log(schema);
	const files = await codeGenerator(schema);
	const types = files?.find((file) => file.filename === 'src/types.generated.ts')?.content;

	if (!types) {
		throw new Error('Could not generate types');
	}

	console.log(types);

	const typesPath = './.graphweaver/types.ts';
	fs.promises.writeFile(typesPath, types, 'utf8');
};
