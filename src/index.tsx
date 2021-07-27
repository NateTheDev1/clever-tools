import { ApolloProvider } from '@apollo/client';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { apolloClient } from './components/business/GQLClient';

import './normalize.scss';
import './tailwind.css';

const rootElement = document.getElementById('root');

render(
	<ApolloProvider client={apolloClient}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>,
	rootElement
);
