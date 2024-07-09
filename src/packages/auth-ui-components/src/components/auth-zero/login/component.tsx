import { useCallback, useEffect, useRef, useState } from 'react';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import { Button, localStorageAuthKey } from '@exogee/graphweaver-admin-ui-components';
import { useNavigate } from 'react-router-dom';

// We are using this cache as a hook to save the access token in the local storage
const cache = {
	get: () => undefined,
	remove: () => {},
	set: (_: string, value: any) => {
		const accessToken = value?.body?.access_token;
		if (accessToken) {
			localStorage.setItem(localStorageAuthKey, `Bearer ${accessToken}`);
		}
	},
};

export const Auth0 = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>();
	const shouldRedirect = useRef(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (shouldRedirect.current) {
			shouldRedirect.current = false;
			requestLogin();
		}
	}, []);

	useEffect(() => {
		if (!loading && !error) {
			navigate('/');
		}
	}, [loading, error]);

	const requestLogin = useCallback(async () => {
		const auth0Client = await createAuth0Client({
			domain: import.meta.env.VITE_AUTH_ZERO_DOMAIN,
			clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
			cache,
		});
		try {
			await auth0Client.loginWithPopup();
		} catch (e: any) {
			if (e.message) setError(e.message);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleRetry = () => {
		requestLogin();
	};

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			{error && <div>{error}</div>}
			<Button onClick={handleRetry}>Retry</Button>
		</div>
	);
};
