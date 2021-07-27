import { Route, Switch, useLocation } from 'react-router';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const Router = () => {
	const location = useLocation();

	return (
		<div>
			<Switch location={location}>
				<PrivateRoute path="/home">
					<h1>Home</h1>
				</PrivateRoute>
				<PublicRoute path="/">
					<h1>Login</h1>
				</PublicRoute>
				<Route component={NotFound} />
			</Switch>
		</div>
	);
};

export default Router;
