import fs from 'fs';
import { executeCodegen } from '@graphql-codegen/cli';

const backendEndpoint = 'http://localhost:9001';

const content = `/* eslint-disable */
/* 
* This file is auto-generated by GraphWeaver. 
* Please do not edit it directly.
*/`;

export const codeGenerator = async () => {
	try {
		const files = await executeCodegen({
			cwd: process.cwd(),
			schema: backendEndpoint,
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
					preset: 'near-operation-file',
					presetConfig: {
						extension: '.generated.tsx',
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

		await Promise.all(
			files.map(async (file) => fs.promises.writeFile(file.filename, file.content, 'utf8'))
		);
	} catch (err: any) {
		const defaultStateMessage = `Unable to find any GraphQL type definitions for the following pointers:`;
		if (err.message && err.message.includes(defaultStateMessage)) {
			// do nothing for now and silently fail
		} else {
			console.log(err.message + `\n in ${err.source?.name}`);
		}
	}
};
