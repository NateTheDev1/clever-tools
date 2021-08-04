import { Checkbox, FormControlLabel, withStyles } from '@material-ui/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { useAddRoomMutation } from '../../graphql';
import './AddProperty.scss';
import AddedRoom from './emitters/addedRoom';

type Inputs = {
	name: string;
	address: string;
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

export const AddRoom = ({ year }: { year: string }) => {
	const { propertyId }: { propertyId: string } = useParams();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();

	const [add, addRoomData] = useAddRoomMutation();
	const [available, setAvailable] = useState(false);

	const [formError, setFormError] = useState('');

	const onSubmit = (data: Inputs) => {
		add({
			variables: {
				input: {
					name: data.name,
					year: year,
					propertyId: Number(propertyId),
					available
				}
			}
		})
			.then(res => {
				if (res.data) {
					AddedRoom.emit('ADDED_ROOM', {});
					setAvailable(false);
					reset();
				} else {
					setFormError('Could not add room');
				}
			})
			.catch(e => {
				console.error(e);
				setFormError(
					'Were were not able to add the room. Please try again.'
				);
			});
	};

	return (
		<div className="add-property mt-4">
			<h4>Add a room for {year}</h4>
			<p style={{ opacity: 0.5, marginTop: '1rem' }}>
				Room is added for the currently selected year.
			</p>
			<form onSubmit={handleSubmit(data => onSubmit(data))}>
				<label htmlFor="Room Name" className="mt-8 mb-4">
					Room Name
				</label>
				<input
					{...register('name')}
					required
					type="text"
					autoComplete="Room Name"
					name="name"
					className={`p-3 ${errors.name && 'error'}`}
					placeholder="Room #342"
				/>
				<FormControlLabel
					style={{ marginTop: '1rem' }}
					className="check"
					control={
						<StyledChecbkox
							checked={available}
							onClick={e => setAvailable(!available)}
							value={available}
						/>
					}
					label="Mark this room as available"
				/>

				{addRoomData.loading ? (
					<div className="mt-8 mb-8 m-auto">
						<PropagateLoader color="#0FBAB5" loading={true} />
					</div>
				) : (
					<button type="submit" className="mt-8 p-2">
						Add Room
					</button>
				)}
			</form>
		</div>
	);
};
