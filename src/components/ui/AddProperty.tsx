import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
import { useAddPropertyMutation } from '../../graphql';
import './AddProperty.scss';
import AddedProperty from './emitters/addedProperty';

type Inputs = {
	address: string;
};

export const AddProperty = ({ year }: { year: string }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();

	const [add, addData] = useAddPropertyMutation();

	const [formError, setFormError] = useState('');

	const onSubmit = (data: Inputs) => {
		add({
			variables: {
				input: {
					name: '',
					address: data.address,
					year: year
				}
			}
		})
			.then(res => {
				if (res.data) {
					AddedProperty.emit('REFETCH', true);
					reset();
				} else {
					setFormError('Could not add property');
				}
			})
			.catch(e => {
				console.error(e);
				setFormError(
					'Were were not able to add the properry. Please try again.'
				);
			});
	};

	return (
		<div className="add-property">
			<h4>Add a property for {year}</h4>
			<p style={{ opacity: 0.5, marginTop: '1rem' }} className="mb-4">
				Property is added for the currently selected year.
			</p>
			<form onSubmit={handleSubmit(data => onSubmit(data))}>
				<input
					{...register('address')}
					required
					type="text"
					autoComplete="Property Address"
					name="address"
					className={`p-3 ${errors.address && 'error'}`}
					placeholder="1700 W Example Ave."
				/>
				{addData.loading ? (
					<div className="mt-8 mb-8 m-auto">
						<PropagateLoader color="#0FBAB5" loading={true} />
					</div>
				) : (
					<button type="submit" className="mt-8 p-2">
						Add Property
					</button>
				)}
			</form>
		</div>
	);
};
