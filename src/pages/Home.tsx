import { PropagateLoader } from 'react-spinners';
import Navbar from '../components/ui/Navbar';
import { useGetStatisticsQuery } from '../graphql';

import './Home.scss';

const Home = () => {
	const { data, loading } = useGetStatisticsQuery();

	return (
		<div className="page-container">
			<Navbar />
			<div className="home p-8">
				{loading && (
					<div
						className="mt-12 mb-8 m-auto"
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						<PropagateLoader color="#0FBAB5" loading={true} />
					</div>
				)}
				{data?.getStatistics && (
					<>
						<h1
							style={{
								textAlign: 'center',
								fontSize: '2rem',
								fontWeight: 300,
								textTransform: 'uppercase',
								letterSpacing: '1rem',
								marginTop: '100px'
							}}
						>
							Your Insights
						</h1>
						<div className="row">
							<div className="stat p-8">
								<h4>Total Properties</h4>
								<p>{data.getStatistics.totalProperties}</p>
							</div>
							<div className="stat p-8">
								<h4>Total Open Rooms</h4>
								<p>{data.getStatistics.totalOpenRooms}</p>
							</div>
						</div>
						<div className="row">
							<div className="stat p-8">
								<h4>Total Rooms</h4>
								<p>{data.getStatistics.totalRooms}</p>
							</div>
							<div className="stat p-8">
								<h4>Total Unavailable Rooms</h4>
								<p>
									{data.getStatistics.totalUnavailableRooms}
								</p>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
