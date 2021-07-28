import Navbar from '../components/ui/Navbar';

import './Home.scss';

const Home = () => {
	return (
		<div className="page-container">
			<Navbar />
			<div className="home p-8">
				<h1>Home</h1>
			</div>
		</div>
	);
};

export default Home;
