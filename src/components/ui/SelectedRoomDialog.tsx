import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	withStyles
} from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { Room, useEditRoomMutation } from '../../graphql';
import AddedRoom from './emitters/addedRoom';

type Inputs = {
	name: string;
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

export const SelectedRoomDialog = ({
	room,
	setRoom
}: {
	room: Room | undefined;
	setRoom: (newValue: Room | undefined) => void;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();

	const [editRoom, editRoomData] = useEditRoomMutation();

	const { year, propertyId }: { year: string; propertyId: string } =
		useParams();

	const [available, setAvailable] = useState(room?.available);

	useEffect(() => {
		setAvailable(room?.available);
		reset({ name: room?.name });
	}, [year, room, propertyId, reset]);

	const submitEdit = (data: Inputs) => {
		if (room) {
			editRoom({
				variables: {
					id: room.id,
					input: { name: data.name, available }
				}
			})
				.then(res => {
					if (res.data) {
						AddedRoom.emit('ADDED_ROOM', {});
						setRoom(undefined);
					} else {
					}
				})
				.catch(e => {
					console.error(e);
				});
		}
	};

	return (
		<Dialog
			open={room !== undefined}
			onClose={() => setRoom(undefined)}
			aria-labelledby="room-dialog"
			maxWidth="md"
			fullWidth
		>
			<form onSubmit={handleSubmit(data => submitEdit(data))}>
				{room && (
					<DialogTitle>
						{room?.name} Details For The Year {room?.year}
					</DialogTitle>
				)}
				<DialogContent>
					<div className="edit-room-form">
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
							placeholder="Room #23"
						/>
						<FormControlLabel
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
						{editRoomData.loading && (
							<div className="mt-8 mb-4 m-auto">
								<PropagateLoader
									color="#0FBAB5"
									loading={true}
								/>
							</div>
						)}
						<h4>Previous Updates</h4>
						<hr />
						<div className="updates">
							{room &&
								room.updates.map((update, key) => (
									<div className="update" key={key}>
										<p
											style={{
												marginTop: '0.5rem',
												fontWeight: 500
											}}
										>
											{update?.timestamp}
										</p>
										<pre className="update-json">
											{update?.room}
										</pre>
									</div>
								))}
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						disabled={editRoomData.loading}
						onClick={() => setRoom(undefined)}
					>
						Close
					</Button>
					<Button disabled={editRoomData.loading} type="submit">
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
