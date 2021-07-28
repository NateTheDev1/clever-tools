import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Properties from '../../pages/Properties';
import { UserActions } from '../../redux/User/actions';
import { UserSelectors } from '../../redux/User/selectors';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const Router = () => {
	const location = useLocation();

	const user = UserSelectors.useSelectUser();
	const getUser = UserActions.useFetchUser();

	useEffect(() => {
		if (!user) {
			getUser();
		}
	}, []);

	return (
		<div>
			<Switch location={location}>
				<PrivateRoute path="/app/admin">
					<Home />
				</PrivateRoute>
				<PrivateRoute path="/app/properties">
					<Properties />
				</PrivateRoute>
				<PrivateRoute path="/app">
					<Home />
				</PrivateRoute>
				<PublicRoute path="/">
					<Login />
				</PublicRoute>
				<Route component={NotFound} />
			</Switch>
		</div>
	);
};

export default Router;
