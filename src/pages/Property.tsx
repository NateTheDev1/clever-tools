import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import AddedRoom from '../components/ui/emitters/addedRoom';
import SelectedRoom from '../components/ui/emitters/selectedRoom';
import Navbar from '../components/ui/Navbar';
import { RoomsTable } from '../components/ui/RoomsTable';
import { SelectedRoomDialog } from '../components/ui/SelectedRoomDialog';
import { Room, useGetPropertyEntityQuery } from '../graphql';
import './Property.scss';

const Property = () => {
	const { propertyId, year }: { propertyId: string; year: string } =
		useParams();
	const history = useHistory();

	const { data, loading, error, refetch } = useGetPropertyEntityQuery({
		variables: { propertyId: Number(propertyId), year: Number(year) }
	});

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

	return (
		<div className="page-container">
			<Navbar />
			<div className="property-page p-8">
				<SelectedRoomDialog
					room={selectedRoom}
					setRoom={setSelectedRoom}
				/>

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

						<button>Edit Property</button>
						<button className="delete-btn">Delete Property</button>
					</div>
				</div>
				<p className="subtitle">
					Select a room to view more information or to edit it's
					availability.
				</p>
				<hr />
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
						<PropagateLoader loading={true} />
					</div>
				)}
			</div>
		</div>
	);
};
export default Property;
