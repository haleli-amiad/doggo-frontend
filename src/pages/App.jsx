import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from '../Routes.js';
import MainNavbar from '../cmps/layout/MainNavbar';
import MainFooter from '../cmps/layout/MainFooter';

function App() {
	return (
		<Router>
			<div className="main-layout">
				<MainNavbar />
				<Switch>
					{Routes.map((route, key) => (
						<Route exact path={route.path} component={route.component} key={key} />
					))}
				</Switch>
				<MainFooter />
			</div>
		</Router>
	);
}

export default App;
