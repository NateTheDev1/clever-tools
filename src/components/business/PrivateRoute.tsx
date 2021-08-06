import { Redirect, Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import { UserSelectors } from '../../redux/User/selectors';
import Loading from '../ui/Loading';

export const PrivateRoute: any = ({
	children,
	...rest
}: {
	children: any;
	rest: any;
}) => {
	const authenticated = UserSelectors.useSelectAuthenticated();
	const loading = UserSelectors.useSelectUserLoading();
	const path = useLocation().pathname;

	if (!authenticated && !loading && path !== '/') {
		return <Redirect to="/" />;
	}

	if (authenticated && !loading) {
		return <Route {...rest}>{children}</Route>;
	}

	return <Loading />;
};
