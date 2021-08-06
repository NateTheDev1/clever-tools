import { useState } from 'react';
import { AddProperty } from '../components/ui/AddProperty';
import Navbar from '../components/ui/Navbar';
import { PropertiesTable } from '../components/ui/PropertiesTable';

import { UserSelectors } from '../redux/User/selectors';
import './Properties.scss';

const years = [
	new Date().getFullYear() - 1,
	new Date().getFullYear(),
	new Date().getFullYear() + 1
];

const Properties = () => {
	const [year, setYear] = useState('2021');
	const user = UserSelectors.useSelectUser();

	return (
		<div className="page-container">
			<Navbar />
			<div className="properties p-8">
				<h3 className="header-title">PROPERTIES</h3>
				<hr />
				<div className="search-section">
					{user?.admin && <AddProperty year={year} />}
					<h4>Search By Year</h4>

					<div className="years">
						{years.map((yr, key) => (
							<div
								onClick={() => setYear(String(yr))}
								className={`year ${
									yr === Number(year) && 'active'
								}`}
								key={key}
							>
								<p>{yr}</p>
							</div>
						))}
					</div>
				</div>
				<PropertiesTable year={year} />
			</div>
		</div>
	);
};

export default Properties;
