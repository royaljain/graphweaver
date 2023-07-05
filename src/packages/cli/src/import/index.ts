import { introspection } from '@exogee/graphweaver-mikroorm';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import ora from 'ora';
import path from 'path';

const createDirectories = (dirPath: string) => {
	const directories = dirPath.split(path.sep);
	let currentPath = '';

	for (const directory of directories) {
		currentPath = path.join(currentPath, directory);
		if (!existsSync(currentPath)) {
			mkdirSync(currentPath);
		}
	}
};

export const importDataSource = async (source: 'mysql' | 'postgresql') => {
	const spinner = ora('Introspecting...').start();

	// mikroOrmConfig: {
	// 		host: '127.0.0.1',
	// 		dbName: 'out_and_seek',
	// 		user: 'root',
	// 		password: 'password',
	// 		port: 3306,
	// 	},

	// host: '127.0.0.1',
	// 		dbName: 'go-collect',
	// 		user: 'postgres',
	// 		password: '',
	// 		port: 5432,

	const files = await introspection(source, {
		mikroOrmConfig: {
			host: '127.0.0.1',
			dbName: 'go-collect',
			user: 'postgres',
			password: '',
			port: 5432,
		},
	});

	spinner.stop();
	console.log('Import complete.');

	for (const file of files) {
		createDirectories(path.join('./src/', file.path));
		writeFileSync(path.join(process.cwd(), './src/', file.path, file.name), file.contents);
	}

	// Force exit because Mikro is keeping the socket open to the db
	process.exit();
};
