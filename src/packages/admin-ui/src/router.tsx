import { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import {
	Loader,
	DefaultLayout,
	DefaultErrorFallback,
	DetailPanel,
} from '@exogee/graphweaver-admin-ui-components';

// This is injected by vite-plugin-graphweaver
import { customPages } from 'virtual:graphweaver-user-supplied-custom-pages';
import { List, Root, Playground } from './pages';

const defaultRoutes = [
	{
		element: <DefaultLayout />,
		errorElement: <DefaultErrorFallback />,
		children: [
			{
				path: '/',
				element: customPages.defaultRoute ? <Navigate to={customPages.defaultRoute} /> : <Root />,
			},
			{
				path: ':entity',
				element: <List />,
				children: [
					{
						path: ':id',
						element: <DetailPanel />,
					},
				],
			},
			{
				path: 'loader',
				element: <Loader />,
			},
		],
	},
	{
		path: '/playground',
		element: <Playground />,
	},
];

export const Router = () => {
	const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);

	useEffect(() => {
		(async () => {
			// We need to blend their custom routes in at the top so they can override us if they want.
			const routes = await customPages.routes();
			setRouter(
				createBrowserRouter([...routes, ...defaultRoutes], {
					basename: import.meta.env.VITE_ADMIN_UI_BASE || '/',
				})
			);
		})();
	}, []);

	if (!router) return <Loader />;

	return <RouterProvider router={router} />;
};
