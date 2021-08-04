import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Properties from '../../pages/Properties';
import Property from '../../pages/Property';
import { UserActions } from '../../redux/User/actions';
import { UserSelectors } from '../../redux/User/selectors';
import NotFound from './NotFound';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Admin from '../../pages/Admin';

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
			<SwitchTransition>
				<CSSTransition
					key={location.key}
					classNames="fade"
					timeout={100}
				>
					<Switch location={location}>
						<PrivateRoute path="/app/admin">
							<Admin />
						</PrivateRoute>
						<PrivateRoute path="/app/properties/:year/:propertyId">
							<Property />
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
				</CSSTransition>
			</SwitchTransition>
		</div>
	);
};

export default Router;
