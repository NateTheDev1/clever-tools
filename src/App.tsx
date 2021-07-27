import { Provider } from 'react-redux';
import ErrorBoundary from './components/business/ErrorBoundary';
import Router from './components/business/Router';
import { store } from './redux/store';

const App = () => {
	return (
		<ErrorBoundary>
			<Provider store={store}>
				<Router />
			</Provider>
		</ErrorBoundary>
	);
};

export default App;
