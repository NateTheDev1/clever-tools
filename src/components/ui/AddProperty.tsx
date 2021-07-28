import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddProperty.scss';

type Inputs = {
	name: string;
};

export const AddProperty = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();

	const [formError, setFormError] = useState('');

	const onSubmit = (data: Inputs) => {};

	return (
		<div className="add-property">
			<h4>Add a property</h4>
			<form onSubmit={handleSubmit(data => onSubmit(data))}>
				<label htmlFor="Property Name" className="mt-8 mb-4">
					Property Name
				</label>
				<input
					{...register('name', { required: true })}
					required
					type="text"
					autoComplete="Property Name"
					name="Property Name"
					className={`p-3 ${errors.name && 'error'}`}
					placeholder="Westveld Park Apartments"
				/>
				<label htmlFor="Property Name" className="mt-8 mb-4">
					Property Address
				</label>
				<input
					{...register('name', { required: true })}
					required
					type="text"
					autoComplete="Property Name"
					name="Property Name"
					className={`p-3 ${errors.name && 'error'}`}
					placeholder="1700 W Example Ave."
				/>
				<button type="submit" className="mt-8 p-2">
					Add Property
				</button>
			</form>
		</div>
	);
};
