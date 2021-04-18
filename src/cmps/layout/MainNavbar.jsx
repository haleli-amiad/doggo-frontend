import { NavLink } from 'react-router-dom';
const MainNavbar = () => {
	return (
		<nav className="main-navbar flex center space">
			<NavLink to="/">
				<h1>Doggo</h1>
			</NavLink>
			<div className="links flex center space">
				<NavLink to="/dogs">
				<p>Adopt</p>
				</NavLink>
				<a href="/">Contact</a>
				<a href="/">About</a>
				<a href="/">Volunteer</a>
			</div>
		</nav>
	);
};

export default MainNavbar;
