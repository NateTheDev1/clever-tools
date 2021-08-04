import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DeleteUser } from '../components/ui/admin/DeleteUser';
import Navbar from '../components/ui/Navbar';
import { UserSelectors } from '../redux/User/selectors';
import './Admin.scss';

const Admin = () => {
	const user = UserSelectors.useSelectUser();
	const history = useHistory();
	const [pageState, setPageState] = useState('NONE');

	useEffect(() => {
		if (user) {
			if (!user.admin) {
				history.push('/app');
			}
		}
	}, []);

	return (
		<div className="page-container">
			<Navbar />
			{user && user.admin && (
				<div className="admin p-8">
					<h3 className="header-title">ADMIN</h3>
					<hr className="hr" />

					<div className="action-container">
						<h4 className="subtitle">User Actions</h4>
						<hr />
						<div className="actions">
							<p
								className="action-button"
								onClick={() => setPageState('DELETE_USER')}
							>
								Delete a user
							</p>
							<p className="action-button">Create a new user</p>
						</div>
					</div>
					{pageState === 'DELETE_USER' && <DeleteUser />}
				</div>
			)}
		</div>
	);
};

export default Admin;
