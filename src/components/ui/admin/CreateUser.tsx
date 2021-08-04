import { Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
import { useCreateUserMutation } from '../../../graphql';
import { UserSelectors } from '../../../redux/User/selectors';
import './CreateUser.scss';

type Inputs = {
	name: string;
	username: string;
	password: string;
};

const StyledChecbkox = withStyles({
	root: {
		color: '#0fbab5',
		'&$checked': {
			color: '#0fbab5'
		}
	},
	checked: {}
})(Checkbox);

export const CreateUser = () => {
	const [createUser, createUserData] = useCreateUserMutation();

	const user = UserSelectors.useSelectUser();

	const [isAdmin, setIsAdmin] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();

	const [formError, setFormError] = useState('');

	const onSubmit = (data: Inputs) => {
		createUser({
			variables: {
				user: {
					username: data.username,
					password: data.password,
					name: data.name,
					admin: isAdmin,
					createdBy: user?.username ?? ''
				}
			}
		})
			.then(res => {
				if (res.data) {
					alert(`${data.name} has been created!`);
					reset();
					setIsAdmin(false);
				} else {
					setFormError(
						'A user with this username may already exist.'
					);
				}
			})
			.catch(e => {
				console.error(e);
				setFormError(
					'Were were not able to creaate this user Please try again.'
				);
			});
	};

	return (
		<div className="create-user">
			<hr />
			<h4>Create a user</h4>
			<hr />

			<form onSubmit={handleSubmit(data => onSubmit(data))}>
				<label htmlFor="name" className="mt-8 mb-4">
					Name
				</label>
				<input
					{...register('name', { required: true })}
					required
					type="text"
					autoComplete="name"
					name="name"
					className={`p-3 ${errors.username && 'error'}`}
					placeholder="John Doe"
				/>
				<label htmlFor="username" className="mt-8 mb-4">
					Username
				</label>
				<input
					{...register('username', { required: true })}
					required
					type="text"
					autoComplete="username"
					name="username"
					className={`p-3 ${errors.username && 'error'}`}
					placeholder="johndoe1"
				/>
				<label htmlFor="password" className="mt-12 mb-4">
					Password
				</label>
				<input
					{...register('password', { required: true })}
					required
					type="text"
					name="password"
					autoComplete="password"
					className={`p-3 ${errors.password && 'error'}`}
					placeholder="abc123!"
				/>
				<FormControlLabel
					style={{ marginTop: '1rem' }}
					className="check"
					control={
						<StyledChecbkox
							checked={isAdmin}
							onClick={e => setIsAdmin(!isAdmin)}
							value={isAdmin}
						/>
					}
					label="Make this an admin user"
				/>

				{createUserData.loading ? (
					<div className="mt-12 mb-8 m-auto">
						<PropagateLoader color="#0FBAB5" loading={true} />
					</div>
				) : (
					<button type="submit" className="mt-12 p-2">
						Submit
					</button>
				)}
				{formError.length > 0 && (
					<p className="text-red-500 mt-8 text-center">{formError}</p>
				)}
			</form>
		</div>
	);
};
