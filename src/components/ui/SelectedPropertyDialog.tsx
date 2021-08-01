import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel
} from '@material-ui/core';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PropagateLoader } from 'react-spinners';
import { Property, useEditPropertyMutation } from '../../graphql';

type Inputs = {
	name: string;
	address: string;
};

export const SelectedPropertyDialog = ({
	property,
	open,
	setOpen,
	onSave
}: {
	property: Property;
	open: boolean;
	setOpen: (val: boolean) => void;
	onSave: () => void;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<Inputs>();

	const [editProperty, editPropertyData] = useEditPropertyMutation();

	useEffect(() => {
		reset({ name: property.name, address: property.address });
	}, [property, reset]);

	const submitEdit = (data: Inputs) => {
		editProperty({
			variables: {
				id: property.id,
				input: { name: data.name, address: data.address }
			}
		})
			.then(res => {
				if (res.data) {
					onSave();
					setOpen(false);
				}
			})
			.catch(e => console.error(e));
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="property-dialog"
			maxWidth="md"
			fullWidth
		>
			<form onSubmit={handleSubmit(data => submitEdit(data))}>
				<DialogTitle>
					{property.name} Details For The Year {property.year}
				</DialogTitle>
				<DialogContent>
					<div className="edit-room-form">
						<label htmlFor="Property Name" className="mt-8 mb-4">
							Property Name
						</label>
						<input
							{...register('name')}
							required
							type="text"
							autoComplete="Property Name"
							name="name"
							className={`p-3 ${errors.name && 'error'}`}
							placeholder="Westview Park"
						/>
						<label htmlFor="Property Address" className="mt-8 mb-4">
							Property Address
						</label>
						<input
							{...register('address')}
							required
							type="text"
							autoComplete="address"
							name="property"
							className={`p-3 ${errors.address && 'error'}`}
							placeholder="123 Example Street"
						/>
						{editPropertyData.loading && (
							<div className="mt-8 mb-4 m-auto">
								<PropagateLoader
									color="#0FBAB5"
									loading={true}
								/>
							</div>
						)}
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						disabled={editPropertyData.loading}
						onClick={() => setOpen(false)}
					>
						Close
					</Button>
					<Button disabled={editPropertyData.loading} type="submit">
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
