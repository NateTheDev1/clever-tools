import { Redirect, Route } from 'react-router';
import Loading from '../ui/Loading';

export const PublicRoute: any = ({
	children,
	...rest
}: {
	children: any;
	rest: any;
}) => {
	// const authenticated = UserSelectors.useSelectAuthenticated();
	// const loading = UserSelectors.useSelectUserLoading();

	const authenticated = false;
	const loading = false;

	if (!authenticated && !loading) {
		return <Route {...rest}>{children}</Route>;
	}

	if (authenticated && !loading) {
		return <Redirect to="/app" />;
	}

	return <Loading />;
};
