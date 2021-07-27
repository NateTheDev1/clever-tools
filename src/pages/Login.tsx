import { Logo } from '../components/ui/Logo';
import './Login.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	username: string;
	password: string;
};

const Login = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<Inputs>();

	const onSubmit = (data: Inputs) => {
		console.log(data);
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
				<form onSubmit={handleSubmit(onSubmit)}>
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
						name="username"
						autoComplete="password"
						className={`p-3 ${errors.password && 'error'}`}
						placeholder="***********"
					/>
					<button type="submit" className="mt-12 p-2">
						Submit
					</button>
				</form>
				<h4 className="text-gray-500 mt-8">Authorized Usage Only</h4>
			</div>
		</div>
	);
};

export default Login;
