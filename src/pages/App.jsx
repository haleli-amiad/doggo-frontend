import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from '../Routes.js';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MainNavbar from '../cmps/layout/MainNavbar';
import { getDogs } from '../store/Dogs/dogsActions';
import MainFooter from '../cmps/layout/MainFooter';

function _App(props) {
	const [ dogs, setDogs ] = useState(null);
	useEffect(() => {
		const loadDogs = async () => {
			await props.getDogs();
		};
		loadDogs();
	}, []);

	useEffect(
		() => {
			if (!dogs && props.dogs.length) {
				setDogs(props.dogs);
			}
		},
		[ dogs, props ]
	);
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

const mapStateToProps = (state) => {
	return {
		dogs: state.dogReducer.dogs
	};
};

const mapDispatchToProps = {
	getDogs
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);

// export default App;
