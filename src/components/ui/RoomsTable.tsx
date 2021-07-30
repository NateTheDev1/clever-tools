import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';
import { isBoolean } from 'util';
import { Room } from '../../graphql';
import SelectedRoom from './emitters/selectedRoom';
import { NoResultsIcon } from './NoResultsIcon';

const columns = [
	{
		id: 'name',
		label: 'Room Name',
		minWidth: 170,
		align: undefined
	},
	{
		id: 'available',
		label: 'Available',
		minWidth: 100,
		align: undefined
	}
];

export const RoomsTable = ({ rooms = [] }: { rooms: Room[] }) => {
	return (
		<TableContainer style={{ marginTop: '50px' }}>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
						{columns.map(column => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{rooms.map(row => {
						return (
							<TableRow
								className="table-row"
								hover
								onClick={() =>
									SelectedRoom.emit('SELECTED_ROOM', row)
								}
								role="checkbox"
								tabIndex={-1}
								key={row?.id}
							>
								{columns.map(column => {
									//@ts-ignore
									const value = row[column.id];
									return (
										<TableCell
											key={column.id}
											align={column.align}
										>
											{isBoolean(value) &&
												value === true &&
												'Room Available'}
											{isBoolean(value) &&
												value === false &&
												'Not Available'}

											{!isBoolean(value) && value}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{rooms.length < 1 && (
				<div
					style={{
						width: '100%',
						margin: '0 auto',
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
						alignItems: 'center',

						marginTop: '2rem'
					}}
				>
					<NoResultsIcon width={'35%'} />
					<p
						style={{
							textAlign: 'center',
							marginTop: '2rem',
							opacity: 0.7,
							fontWeight: 300
						}}
					>
						No Rooms Found For This Property.
					</p>
				</div>
			)}
		</TableContainer>
	);
};
