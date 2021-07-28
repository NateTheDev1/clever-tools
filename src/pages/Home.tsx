import Navbar from '../components/ui/Navbar';

import './Home.scss';

const Home = () => {
	return (
		<div className="page-container">
			<Navbar />
			<div className="home p-8">
				<h3 className="header-title">DASHBOARD</h3>
				<hr />
				<div className="row">
					<div className="stat p-8">
						<h4>Total Properties</h4>
						<p>41</p>
					</div>
					<div className="stat p-8">
						<h4>Total Open Rooms</h4>
						<p>13</p>
					</div>
				</div>
				<div className="row">
					<div className="stat p-8">
						<h4>Total Rooms</h4>
						<p>335</p>
					</div>
					<div className="stat p-8">
						<h4>Total Unavailable Rooms</h4>
						<p>130</p>
					</div>
				</div>
				<hr />
			</div>
		</div>
	);
};

export default Home;
