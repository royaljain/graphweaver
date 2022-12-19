import path from 'path';
import { BuildOptions } from 'esbuild';

export interface AdditionalFunctionConfig {
	handlerPath: string;
	handlerName?: string;
	urlPath: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ANY';
}

export const inputPathFor = (userSuppliedPath: string) =>
	path.resolve(process.cwd(), userSuppliedPath);

export const devOutputPathFor = (userSuppliedPath: string) =>
	path.resolve(process.cwd(), '.graphweaver', userSuppliedPath);

export const buildOutputPathFor = (userSuppliedPath: string) => {
	const components = userSuppliedPath.split(path.sep);

	return path.resolve(
		process.cwd(),
		'dist',
		...components.filter((component) => component !== 'src')
	);
};

export const baseEsbuildConfig: BuildOptions = {
	minify: false,
	bundle: true,
	sourcemap: true,
	platform: 'node',
	target: ['node16'],
	format: 'cjs',
	watch: true,
};

export const makeAllPackagesExternalPlugin = () => ({
	name: 'make-all-packages-external',
	setup(build: any) {
		const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
		build.onResolve({ filter }, ({ path }: any) => {
			// On Windows, packages in the monorepo are resolved as full file paths starting with C:\ ...
			// And Go (used by esbuild) does not support regex with negative lookaheads
			return { path, external: !/^[C-Z]:\\/.test(path) };
		});
	},
});

export const makeOptionalMikroOrmPackagesExternalPlugin = () => ({
	name: 'make-mikro-orm-packages-external',
	setup(build: any) {
		const filter = /^@mikro-orm/;
		build.onResolve({ filter }, ({ path }: any) => {
			// If it's available locally then it should be bundled,
			// otherwise let it be external in the resulting bundle.
			try {
				require.resolve(path);

				// If that succeeded, it's in.
				return { path, external: false };
			} catch (error) {
				// Ok, it's out.
				return { path, external: true };
			}
		});
	},
});
