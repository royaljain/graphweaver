import fs from 'fs';
import path from 'path';
import { executeCodegen } from '@graphql-codegen/cli';
import nearOperationFilePreset from '@graphql-codegen/near-operation-file-preset';
import { GraphQLSchema } from 'graphql';

import loader from './loader';

const content = `/* eslint-disable */
/* 
* This file is auto-generated by Graphweaver. 
* Please do not edit it directly.
*/`;

export const codeGenerator = async (schema?: GraphQLSchema, outdir?: string) => {
	try {
		const files = await executeCodegen({
			cwd: process.cwd(),
			pluginLoader: async (plugin: string) => import(plugin),
			schema: {
				graphweaver: {
					loader: () => loader(schema),
				} as any,
			},
			ignoreNoDocuments: true,
			documents: ['./src/**/!(*.generated).{ts,tsx}'],
			generates: {
				'src/types.generated.ts': {
					config: {
						skipDocumentsValidation: {
							skipDuplicateValidation: true, // A flag to disable the validation for duplicate query and mutation names we don't need this as we are using near-operation-file
						},
					},
					plugins: [
						{
							add: {
								content,
							},
						},
						'typescript',
					],
				},
				'src/': {
					preset: nearOperationFilePreset,
					presetConfig: {
						extension: '.generated.ts',
						baseTypesPath: 'types.generated.ts',
					},
					plugins: [
						{
							add: {
								content,
							},
						},
						'typescript-operations',
						'typescript-react-apollo',
					],
				},
			},
		});

		// ensure that we have a graphweaver directory
		const dirPath = path.join(process.cwd(), outdir || './.graphweaver');
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}

		const writeOperations = files.flatMap((file) => [
			fs.promises.writeFile(file.filename, file.content, 'utf8'),
			// We save the types to two locations src and .graphweaver / outdir
			...(file.filename === 'src/types.generated.ts'
				? [fs.promises.writeFile(`${dirPath}/types.ts`, file.content, 'utf8')]
				: []),
		]);

		// Write the files to disk
		await Promise.all(writeOperations);
	} catch (err: any) {
		const defaultStateMessage = `Unable to find any GraphQL type definitions for the following pointers:`;
		if (err.message && err.message.includes(defaultStateMessage)) {
			// do nothing for now and silently fail
		} else {
			console.log(err.message + `\n in ${err.source?.name}`);
		}
	}
};
