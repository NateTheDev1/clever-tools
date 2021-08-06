import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { AddRoom } from '../components/ui/AddRoom';
import AddedProperty from '../components/ui/emitters/addedProperty';
import AddedRoom from '../components/ui/emitters/addedRoom';
import SelectedRoom from '../components/ui/emitters/selectedRoom';
import Navbar from '../components/ui/Navbar';
import { RoomsTable } from '../components/ui/RoomsTable';
import { SelectedPropertyDialog } from '../components/ui/SelectedPropertyDialog';
import { SelectedRoomDialog } from '../components/ui/SelectedRoomDialog';
import {
	Room,
	useDeletePropertyMutation,
	useGetPropertyEntityQuery
} from '../graphql';
import { UserSelectors } from '../redux/User/selectors';
import './Property.scss';

const Property = () => {
	const { propertyId, year }: { propertyId: string; year: string } =
		useParams();
	const history = useHistory();

	const user = UserSelectors.useSelectUser();

	const [editingProperty, setEditingProperty] = useState(false);

	const { data, loading, error, refetch } = useGetPropertyEntityQuery({
		variables: { propertyId: Number(propertyId), year: Number(year) },
		fetchPolicy: 'network-only'
	});

	const [deleteProperty] = useDeletePropertyMutation();

	const [selectedRoom, setSelectedRoom] = useState<Room>();

	useEffect(() => {
		if (error) {
			// history.goBack();
		}
	}, [error]);

	useEffect(() => {
		SelectedRoom.on('SELECTED_ROOM', room => setSelectedRoom(room));

		return () => {
			SelectedRoom.off('SELECTED_ROOM');
		};
	}, []);

	useEffect(() => {
		AddedRoom.on('ADDED_ROOM', () => {
			refetch({ propertyId: Number(propertyId), year: Number(year) });
		});

		return () => {
			AddedRoom.off('ADDED_ROOM');
		};
	}, []);

	const onDelete = () => {
		const continueDelete = window.confirm(
			'Are you sure? This cannot be undone and all rooms associated with this property will be deleted.'
		);

		if (continueDelete) {
			deleteProperty({ variables: { id: Number(propertyId) } })
				.then(res => {
					if (res.data) {
						AddedProperty.emit('ADDED_PROPERTY', {});
						history.push('/app/properties');
					} else {
						console.error(res.errors);
					}
				})
				.catch(e => console.error(e));
		}
	};

	const onSave = () => {
		refetch();
	};

	return (
		<div className="page-container">
			<Navbar />
			<div className="property-page p-8">
				<SelectedRoomDialog
					room={selectedRoom}
					setRoom={setSelectedRoom}
				/>
				{data?.getPropertyEntity.property && (
					<SelectedPropertyDialog
						property={{
							...data.getPropertyEntity.property,
							totalRooms: 0,
							availableRooms: 0
						}}
						onSave={onSave}
						open={editingProperty}
						setOpen={setEditingProperty}
					/>
				)}

				<div className="header">
					<h3 className="header-title">
						{data?.getPropertyEntity.property.name.toUpperCase()} -{' '}
						{data?.getPropertyEntity.property.address.toUpperCase()}{' '}
						| {data?.getPropertyEntity.property.year.toUpperCase()}
					</h3>
					<div>
						<button
							className="back-btn"
							onClick={() => history.goBack()}
						>
							Go Back
						</button>

						{user?.admin && (
							<>
								<button
									onClick={() => setEditingProperty(true)}
								>
									Edit Property
								</button>
								<button
									className="delete-btn"
									onClick={() => onDelete()}
								>
									Delete Property
								</button>
							</>
						)}
					</div>
				</div>
				<p className="subtitle">
					Select a room to view more information or to edit it's
					availability.
				</p>
				<hr />
				{user?.admin && <AddRoom year={year} />}
				{!loading && (
					<RoomsTable rooms={data?.getPropertyEntity.rooms as any} />
				)}
				{loading && (
					<div
						style={{
							width: '100%',
							margin: '0 auto',
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							marginTop: '2rem',
							marginBottom: '2rem'
						}}
					>
						<PropagateLoader loading={true} color="#0FBAB5" />
					</div>
				)}
			</div>
		</div>
	);
};
export default Property;
