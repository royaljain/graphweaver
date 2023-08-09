import yargs from 'yargs';
import chokidar from 'chokidar';
import semver from 'semver';
import {
	StartOptions,
	analyseBundle,
	buildBackend,
	buildFrontend,
	startBackend,
	startFrontend,
} from '@exogee/graphweaver-builder';
import { Backend, init } from './init';
import { importDataSource } from './import';

yargs.version(false);

const MINIMUM_NODE_SUPPORTED = '18.0.0';

yargs
	.env('GRAPHWEAVER')
	.check(() => {
		if (semver.lt(process.version, MINIMUM_NODE_SUPPORTED)) {
			throw new Error(
				`\n\nERROR:\nPlease upgrade Node.js to at least version v${MINIMUM_NODE_SUPPORTED} or above.\n\n`
			);
		}
		return true;
	})
	.command({
		command: ['init'],
		describe: 'Create a graphweaver project in various ways.',
		builder: (yargs) =>
			yargs
				.option('name', {
					type: 'string',
					describe: 'The name of this project.',
				})
				.option('backend', {
					type: 'string',
					describe: 'Specify a data source.',
					choices: ['postgres', 'mysql', 'rest', 'sqlite'],
				})
				.option('version', {
					type: 'string',
					describe: 'Specify a version of Graphweaver to use.',
				})
				.option('host', {
					type: 'string',
					describe: 'Specify the database server hostname.',
				})
				.option('port', {
					type: 'number',
					describe: 'Specify the database server port.',
				})
				.option('password', {
					type: 'string',
					describe: 'Specify the database server password.',
				})
				.option('user', {
					type: 'string',
					describe: 'Specify the database server user.',
				}),
		handler: async (argv) => {
			const version = argv.version;
			const name = argv.name;
			const backend = argv.backend;
			const host = argv.host;
			const port = argv.port;
			const password = argv.password;
			const user = argv.user;

			console.log(
				`Initing project ${name}, ${version}, ${backend}, ${host}, ${port}, ${password}, ${user}...`
			);
			if (backend === 'postgres') init({ name, backend: Backend.Postgres, version });
			if (backend === 'mysql') init({ name, backend: Backend.Mysql, version });
			if (backend === 'rest') init({ name, backend: Backend.Rest, version });
			if (backend === 'sqlite') init({ name, backend: Backend.Sqlite, version });
			init({ name, version });
		},
	})
	.command({
		command: ['import [source]'],
		describe: 'Inspect a data source and then import its entities.',
		builder: (yargs) =>
			yargs
				.positional('source', {
					type: 'string',
					choices: ['mysql', 'postgresql', 'sqlite'],
					default: 'postgresql',
					describe: 'The data source to import.',
				})
				.option('database', {
					type: 'string',
					describe: 'Specify the database name.',
				})
				.option('host', {
					type: 'string',
					describe: 'Specify the database server hostname.',
				})
				.option('port', {
					type: 'number',
					describe: 'Specify the database server port.',
				})
				.option('password', {
					type: 'string',
					describe: 'Specify the database server password.',
				})
				.option('user', {
					type: 'string',
					describe: 'Specify the database server user.',
				}),
		handler: async ({ source, database, host, port, password, user }) => {
			console.log('Importing data source...');
			console.log(
				`Source: ${source}, Database: ${database}, Host: ${host}, Port: ${port}, Password: ${password}, User: ${user}`
			);

			await importDataSource(source, database, host, port, password, user);
		},
	})
	.command({
		command: ['analyse [target]', 'analyze [target]', 'a [target]'],
		describe: 'Instruments your graphweaver project in various ways.',
		builder: (yargs) =>
			yargs.positional('target', {
				type: 'string',
				choices: ['bundle'],
				default: 'bundle',
				describe: 'The thing to analyse.',
			}),
		handler: async ({ target }) => {
			if (target === 'bundle') {
				await analyseBundle();
			}
		},
	})
	.command({
		command: ['build [environment]', 'b [environment]'],
		describe: 'Builds your graphweaver project for deployment.',
		builder: (yargs) =>
			yargs
				.positional('environment', {
					type: 'string',
					choices: ['backend', 'frontend', 'all'],
					default: 'all',
					describe: 'Choose whether you want to build the backend, frontend, or both.',
				})
				.option('adminUiBase', {
					type: 'string',
					default: '/',
					describe: 'Specify the base path for the Admin UI',
				}),
		handler: async ({ environment, adminUiBase }) => {
			if (environment === 'backend' || environment === 'all') {
				await buildBackend({});
			}
			if (environment === 'frontend' || environment === 'all') {
				await buildFrontend({ adminUiBase });
			}

			// Note, this will leave the ESBuild service process around:
			// https://github.com/evanw/esbuild/issues/985
			// console.log('Handles: ', (process as any)._getActiveHandles());
			//
			// It does not give us a way to kill it gracefully, so we'll do it here.
			process.exit(0);
		},
	})
	.command({
		command: ['start [environment]', 's [environment]'],
		describe: 'Runs a development version of the project locally.',
		builder: (yargs) =>
			yargs
				.positional('environment', {
					type: 'string',
					choices: ['backend', 'frontend', 'all'],
					default: 'all',
					describe: 'Choose whether you want to run the backend, frontend, or both.',
				})
				.option('host', {
					type: 'string',
					describe: 'Specify a host to listen on e.g. --host 0.0.0.0',
				})
				.option('port', {
					type: 'number',
					default: 9000,
					describe:
						'Specify a base port to listen on. Frontend will start on this port, and backend will start on port+1',
				}),
		handler: async ({ environment, ...args }) => {
			if (environment === 'backend' || environment === 'all') {
				await startBackend(args as any);
			}
			if (environment === 'frontend' || environment === 'all') {
				await startFrontend(args as StartOptions);
			}
		},
	})
	.command({
		command: ['watch [environment]', 'w [environment]'],
		describe: 'Runs a development version of the project locally and watches files for changes.',
		builder: (yargs) =>
			yargs
				.positional('environment', {
					type: 'string',
					choices: ['backend', 'frontend', 'all'],
					default: 'all',
					describe: 'Choose whether you want to run the backend, frontend, or both.',
				})
				.option('host', {
					type: 'string',
					describe: 'Specify a host to listen on e.g. --host 0.0.0.0',
				})
				.option('port', {
					type: 'number',
					default: 9000,
					describe:
						'Specify a base port to listen on. Frontend will start on this port, and backend will start on port+1',
				}),
		handler: async ({ environment, ...args }) => {
			if (environment === 'backend' || environment === 'all') {
				await startBackend(args as any);
			}
			if (environment === 'frontend' || environment === 'all') {
				// Logic to start the process
				console.log('Watch process started...');
				await startFrontend(args as StartOptions, true);

				// Watch the directory for file changes
				const watcher = chokidar.watch('./src/**', {
					ignored: [/node_modules/, /__generated__/, /.*\.generated\.tsx$/, /.*\.generated\.ts$/],
				});

				// Restart the process on file change
				watcher.on('change', async () => {
					console.log('File changed. Restarting the process...');
					await startFrontend(args as StartOptions, true);
				});
			}
		},
	})
	.showHelpOnFail(true)
	.help('help')
	.command({
		command: '*',
		handler() {
			yargs.showHelp();
		},
	})
	.parse();
