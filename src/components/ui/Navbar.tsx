import { Toolbar, AppBar, IconButton, Button, Drawer } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { UserActions } from '../../redux/User/actions';
import { UserSelectors } from '../../redux/User/selectors';
import { Logo } from './Logo';
import MenuIcon from '@material-ui/icons/Menu';

import './Navbar.scss';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { Maybe } from 'graphql/jsutils/Maybe';

const Content = ({
	location,
	user,
	logout
}: {
	location: any;
	user:
		| {
				id: number;
				name?: Maybe<string>;
				username: string;
				admin: boolean;
				createdAt: string;
				createdBy?: Maybe<string>;
		  }
		| undefined;
	logout: () => void;
}) => {
	return (
		<div className="links">
			<div className="user">
				<h3>Logged in as user: root</h3>
			</div>
			<Link to="/app" className="link">
				<svg
					style={{
						color: location.pathname === '/app' ? '#0ABAB5' : 'gray'
					}}
					xmlns="http://www.w3.org/2000/svg"
					className="h-7 w-7"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
				</svg>
				<p
					style={{
						color: location.pathname === '/app' ? '#0ABAB5' : 'gray'
					}}
				>
					Home
				</p>
			</Link>
			<Link to="/app/properties" className="link">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					style={{
						color: location.pathname.includes('/properties')
							? '#0ABAB5'
							: 'gray'
					}}
					className="h-7 w-7"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
					<path
						fillRule="evenodd"
						d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
				<p
					style={{
						color: location.pathname.includes('/properties')
							? '#0abab5'
							: 'black'
					}}
				>
					Properties
				</p>
			</Link>

			{user?.admin && (
				<Link to="/app/admin" className="link">
					<svg
						style={{
							color: location.pathname.includes('/admin')
								? '#0ABAB5'
								: 'gray'
						}}
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
							clipRule="evenodd"
						/>
					</svg>
					<p
						style={{
							color: location.pathname.includes('/admin')
								? '#0abab5'
								: 'black'
						}}
					>
						Admin
					</p>
				</Link>
			)}
			<div className="logout link" onClick={() => logout()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-7 w-7"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
						clipRule="evenodd"
					/>
				</svg>
				<p>Logout</p>
			</div>
		</div>
	);
};

const Navbar = () => {
	const user = UserSelectors.useSelectUser();
	const location = useLocation();
	const [navOpen, setNavOpen] = useState(false);

	const logout = UserActions.useLogout();

	const isSmall = useMediaQuery({
		query: '(max-width: 650px)'
	});

	if (isSmall) {
		return (
			<>
				<AppBar
					title="Menu"
					position="static"
					style={{ background: 'white' }}
				>
					<Toolbar>
						<IconButton
							edge="start"
							onClick={() => setNavOpen(true)}
						>
							<MenuIcon />
						</IconButton>
						<div style={{ flexGrow: 1 }}>
							<Logo />
						</div>
						<Button
							onClick={() => logout()}
							style={{
								fontSize: '0.8rem',
								color: 'red',
								opacity: 0.7
							}}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer
					open={navOpen}
					anchor="left"
					className="navbar"
					onClose={() => setNavOpen(false)}
				>
					<Content user={user} location={location} logout={logout} />
				</Drawer>
			</>
		);
	}

	return (
		<div className="navbar px-4 py-2">
			<Logo width={'100%'} />
			<Content user={user} location={location} logout={logout} />
		</div>
	);
};

export default Navbar;
