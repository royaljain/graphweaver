import esbuild from 'esbuild';
import svgrPlugin from 'esbuild-plugin-svgr';
import cssModulesPlugin from 'esbuild-css-modules-plugin';

(async () => {
	await esbuild.build({
		outdir: 'lib',
		format: 'esm',
		bundle: true,
		sourcemap: 'linked',
		external: [
			// This can't be bundled because it's virtual and supplied by Vite.
			'virtual:graphweaver-user-supplied-dashboards',

			// And these can't because they're peer dependencies, and we need to use
			// the version supplied by the ultimate consumer of the library.
			'graphql',
			'react',
			'react-dom',
			'react-router',
			'react-router-dom',
			'@remix-run/router',
		],
		entryPoints: ['src/index.ts'],
		plugins: [cssModulesPlugin(), svgrPlugin({ exportType: 'named' })],
	});
})();
