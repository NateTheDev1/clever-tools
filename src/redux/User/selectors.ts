import { useSelector } from 'react-redux';
import { RootSelectors } from '../types/selector-types';
import { RootState } from '../types/state-types';

export const UserSelectors: RootSelectors['user'] = {
	useSelectAuthenticated: () => {
		const authenticated = useSelector(
			(state: RootState) => state.user.authenticated
		);
		return authenticated;
	},
	useSelectUserLoading: () => {
		const loading = useSelector((state: RootState) => state.user.loading);
		return loading;
	},
	useSelectUserId: () => {
		const userId = useSelector((state: RootState) => state.user.userId);

		return userId;
	},
	useSelectUser: () => {
		const user = useSelector((state: RootState) => state.user.user);

		return user;
	}
};
