import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody
} from '@material-ui/core';
import { useGetPropertiesSearchLazyQuery } from '../../graphql';
import { NoResultsIcon } from './NoResultsIcon';
import { PropagateLoader } from 'react-spinners';
import { useEffect } from 'react';
import AddedProperty from './emitters/addedProperty';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

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

export const PropertiesTable = ({ year }: { year: string }) => {
	const history = useHistory();
	const [query, setQuery] = useState('');

	const [getProperties, { data, loading }] =
		useGetPropertiesSearchLazyQuery();

	const onChange = (e: any) => {
		setQuery(e.target.value);
		getProperties({ variables: { year: year, query: e.target.value } });
	};

	useEffect(() => {
		if (query.length > 0) {
			getProperties({ variables: { year: year, query: query } });
		}
	}, [year, query, getProperties]);

	useEffect(() => {
		AddedProperty.on('REFETCH', () =>
			getProperties({ variables: { year: year, query } })
		);

		return () => {
			AddedProperty.off('REFETCH');
		};
	}, []);

	return (
		<>
			<div className="search">
				<label htmlFor="name" className="mt-8 mb-4">
					Search for a property name
				</label>
				<input
					required
					type="text"
					autoComplete="none"
					name="name"
					onChange={e => onChange(e)}
					className={`p-3`}
					placeholder="Westview"
				/>
			</div>
			{query.length > 0 && (
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
							{data?.getPropertiesSearch.map(row => {
								return (
									<TableRow
										className="table-row"
										hover
										onClick={() =>
											history.push(
												'/app/properties/' +
													year +
													'/' +
													row?.id
											)
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
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					{data && data.getPropertiesSearch.length < 1 && (
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
			)}
		</>
	);
};
