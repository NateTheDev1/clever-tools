import { PropagateLoader } from 'react-spinners';
import {
	useDeleteUserMutation,
	useSearchUsersLazyQuery
} from '../../../graphql';
import './DeleteUser.scss';

export const DeleteUser = () => {
	const [queryUsers, { data, loading }] = useSearchUsersLazyQuery({
		fetchPolicy: 'network-only'
	});
	const [deleteUser] = useDeleteUserMutation();

	const onChange = (e: any) => {
		if (e.target.value.length > 0) {
			queryUsers({ variables: { query: e.target.value } });
		}
	};

	const onDelete = (id: number) => {
		const continueDelete = window.confirm(
			'Are you sure you want to delete this user? This cannot be undone.'
		);

		if (continueDelete) {
			console.log('here');
			deleteUser({ variables: { id } }).then(res => {
				if (res.data) {
					queryUsers({ variables: { query: '11231312' } });
				}
			});
		}
	};

	return (
		<div className="delete-user">
			<hr />
			<h4>Delete a user</h4>
			<hr />
			<div className="search">
				<label htmlFor="name" className="mt-8 mb-4">
					Search for an account name
				</label>
				<input
					required
					type="text"
					autoComplete="none"
					name="name"
					onChange={e => onChange(e)}
					className={`p-3`}
					placeholder="John Doe"
				/>
			</div>
			<div className="results">
				{loading && (
					<div
						className="mt-12 mb-8 m-auto"
						style={{ display: 'flex', justifyContent: 'center' }}
					>
						<PropagateLoader color="#0FBAB5" loading={true} />
					</div>
				)}
				{!loading && data && (
					<div className="result-list">
						{data.searchUsers.map((user, key) => (
							<>
								<div className="result" key={key}>
									<p>Username: {user?.username}</p>
									<button
										onClick={() => onDelete(user?.id!)}
										disabled={user?.username === 'root'}
									>
										{user?.username === 'root'
											? 'Cannot delete the root user'
											: 'Delete'}
									</button>
								</div>
								<hr />
							</>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
