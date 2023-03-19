import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';

export const Playground = () => {
	return (
		<>
			<p>Playground Placeholder</p>
			<GraphiQL
				fetcher={async (graphQLParams) => {
					const data = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(graphQLParams),
						credentials: 'same-origin',
					});
					return data.json().catch(() => data.text());
				}}
			/>
		</>
	);
};
