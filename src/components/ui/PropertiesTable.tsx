import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';
import { useGetPropertiesQuery } from '../../graphql';
import { NoResultsIcon } from './NoResultsIcon';
import { PropagateLoader } from 'react-spinners';
import { useEffect } from 'react';
import AddedProperty from './emitters/addedProperty';

const columns = [
	{
		id: 'name',
		label: 'Property Name',
		minWidth: 170,
		align: undefined
	},
	{
		id: 'address',
		label: 'Property Adress',
		minWidth: 100,
		align: undefined
	},
	{
		id: 'totalRooms',
		label: 'Total Rooms',
		minWidth: 100,
		align: undefined
	},
	{
		id: 'availableRooms',
		label: 'Available Rooms',
		minWidth: 100,
		align: undefined
	}
];

function createData() {}

export const PropertiesTable = ({ year }: { year: string }) => {
	const { data, loading, error, refetch } = useGetPropertiesQuery({
		variables: { year }
	});

	useEffect(() => {
		refetch({ year });
	}, [year, refetch]);

	useEffect(() => {
		AddedProperty.on('REFETCH', () => refetch());

		return () => {
			AddedProperty.off('REFETCH');
		};
	}, []);

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
					{data?.getProperties.map(row => {
						return (
							<TableRow
								hover
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
											{value}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{data && data.getProperties.length < 1 && (
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
						No Properties Found.
					</p>
				</div>
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
					<PropagateLoader color="#0FBAB5" loading={true} />
				</div>
			)}
		</TableContainer>
	);
};
