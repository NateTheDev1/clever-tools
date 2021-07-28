import { useDispatch } from 'react-redux';
import {
	LoginUser,
	UserActionConstants,
	LogoutUser,
	SetLoading,
	FetchUser
} from './types';

import decode from 'jwt-decode';
import { RootActions } from '../types/action-types';
import { useGetUserLazyQuery } from '../../graphql';

export const UserActions: RootActions['user'] = {
	useLogin() {
		const dispatch = useDispatch();
		const fetchUser = UserActions.useFetchUser();

		return async (token: string) => {
			const action: LoginUser = {
				type: UserActionConstants.USER_LOGGED_IN,
				payload: token
			};

			await localStorage.setItem(
				process.env.REACT_APP_CLEVER_TOKEN!,
				token
			);

			dispatch(action);

			fetchUser();

			return true;
		};
	},
	useLogout() {
		const dispatch = useDispatch();

		return async () => {
			const action: LogoutUser = {
				type: UserActionConstants.USER_LOGGED_OUT,
				payload: undefined
			};

			await localStorage.removeItem(process.env.REACT_APP_CLEVER_TOKEN!);

			dispatch(action);
		};
	},
	useFetchUser() {
		const dispatch = useDispatch();

		const [getUser] = useGetUserLazyQuery({
			fetchPolicy: 'no-cache',
			onCompleted: data => {
				const action: FetchUser = {
					type: UserActionConstants.APP_FETCHED_USER,
					payload: data.getUser as any
				};

				dispatch(action);
			}
		});

		return async () => {
			const token = (await localStorage.getItem(
				process.env.REACT_APP_CLEVER_TOKEN!
			)!) as string;

			const jwt: { userId: number } = decode(token);

			getUser({ variables: { id: jwt.userId } });
		};
	},
	useSetLoading() {
		const dispatch = useDispatch();

		return (loadState: boolean) => {
			const action: SetLoading = {
				type: UserActionConstants.SET_LOADING,
				payload: loadState
			};

			dispatch(action);
		};
	}
};
