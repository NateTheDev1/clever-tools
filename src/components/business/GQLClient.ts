import {
	ApolloClient,
	ApolloLink,
	concat,
	HttpLink,
	InMemoryCache,
	split
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
	uri:
		process.env.NODE_ENV === 'production'
			? 'https://five-e-server.herokuapp.com/graphql'
			: 'http://localhost:5000/graphql'
});

const wsLink = new WebSocketLink({
	uri:
		process.env.NODE_ENV === 'production'
			? 'wss://five-e-server.herokuapp.com/subscriptions'
			: 'ws://localhost:5000/subscriptions',
	options: {
		reconnect: true
	}
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
);

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers

	const token = localStorage.getItem(
		process.env.REACT_APP_TOKEN_KEY as string
	);

	if (token !== null && token !== undefined && token.length > 0) {
		operation.setContext({
			headers: {
				Authorization: token
			}
		});
	} else {
		operation.setContext({});
	}

	return forward(operation);
});

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
	defaultOptions: {
		mutate: { errorPolicy: 'all' },
		query: { errorPolicy: 'all' }
	},
	link: concat(authMiddleware, splitLink)
});
