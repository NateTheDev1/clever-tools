import { Redirect, Route } from 'react-router';
import { UserSelectors } from '../../redux/User/selectors';
import Loading from '../ui/Loading';

export const PublicRoute: any = ({
	children,
	...rest
}: {
	children: any;
	rest: any;
}) => {
	const authenticated = UserSelectors.useSelectAuthenticated();
	const loading = UserSelectors.useSelectUserLoading();

	if (!authenticated && !loading) {
		return <Route {...rest}>{children}</Route>;
	}

	if (authenticated && !loading) {
		return <Redirect to="/app" />;
	}
};
