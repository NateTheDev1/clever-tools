import { Logo } from '../components/ui/Logo';
import './Login.scss';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../graphql';
import { UserActions } from '../redux/User/actions';
import { useState } from 'react';
import { PropagateLoader } from 'react-spinners';

type Inputs = {
	username: string;
	password: string;
};

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();

	const [formError, setFormError] = useState('');

	const [loginUser, loginData] = useLoginMutation();
	const setLoggedIn = UserActions.useLogin();
	const fetchUser = UserActions.useFetchUser();

	const onSubmit = (data: Inputs) => {
		loginUser({
			variables: {
				credentials: {
					username: data.username,
					password: data.password
				}
			}
		})
			.then(res => {
				if (res.data) {
					setLoggedIn(res.data.login);
					fetchUser();
				} else {
					setFormError('Incorrect username or password.');
				}
			})
			.catch(e => {
				console.error(e);
				setFormError(
					'Were were not able to log you in. Please try again.'
				);
			});
	};

	return (
		<div className="w-screen h-screen p-8 login">
			<div className="m-auto login-container">
				<Logo width="15%" />
				<h1 className="mt-8 header-text-lg">EMPLOYEE LOGIN</h1>
				<h4
					className="text-gray-500 mt-4 subtitle"
					style={{ fontWeight: 300 }}
				>
					Property Management Tools
				</h4>
				<hr className="hr" />
				<h2 className="mt-8 text-lg leading-loose font-medium">
					The site is temporarily offline. Please contact me at
					nathaniel@datacompusa.com or by using the link below.
				</h2>

				<a
					href="mailto:nathaniel@datacompusa.com"
					className="underline text-lg mt-4"
				>
					Contact Me
				</a>

				{/* <form onSubmit={handleSubmit(data => onSubmit(data))}>
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
						placeholder="johndoe@email.com"
					/>
					<label htmlFor="password" className="mt-12 mb-4">
						Password
					</label>
					<input
						{...register('password', { required: true })}
						required
						type="password"
						name="password"
						autoComplete="password"
						className={`p-3 ${errors.password && 'error'}`}
						placeholder="***********"
					/>
					{loginData.loading ? (
						<div className="mt-12 mb-8 m-auto">
							<PropagateLoader color="#0FBAB5" loading={true} />
						</div>
					) : (
						<button type="submit" className="mt-12 p-2">
							Submit
						</button>
					)}
					{formError.length > 0 && (
						<p className="text-red-500 mt-8 text-center">
							{formError}
						</p>
					)}
				</form> */}
				<h4 className="text-gray-500 mt-8">Authorized Usage Only</h4>
			</div>
		</div>
	);
};

export default Login;
