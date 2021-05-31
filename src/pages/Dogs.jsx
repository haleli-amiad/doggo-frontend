import { useEffect, useState } from 'react';
import DogsList from '../cmps/dogs/DogsList';
import Loading from '../cmps/layout/Loading';
import Pagination from '@material-ui/lab/Pagination';
import Search from '../cmps/sidebars/Search';
import { getDogs } from '../store/Dogs/dogsActions';
import { connect } from 'react-redux';
import BreedsList from '../cmps/sidebars/BreedsList';
import GenderList from '../cmps/sidebars/GenderList';

function _Dogs(props) {
	const [ dogs, setDogs ] = useState(null);
	const [ currPageDogs, setCurrPageDogs ] = useState([]);
	const [ page, setPage ] = useState(1);
	const dogsPerPage = 12;
	const [ count, setCount ] = useState(null);
	const [ dogsToShow, setDogsToShow ] = useState([]);

	useEffect(() => {
		const loadDogs = async () => {
			await props.getDogs();
		};
		loadDogs();
		// eslint-disable-next-line  react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => {
			if (!dogs && props.dogs.length > 1) {
				setDogs(props.dogs);
			} else {
				// eslint-disable-next-line no-unused-vars
				const isToCount =
					dogs && !dogsToShow.length ? setCount(Number((dogs.length / dogsPerPage).toFixed(0))) : null;
			}
		},
		// eslint-disable-next-line  react-hooks/exhaustive-deps
		[ dogs, dogsToShow ]
	);

	useEffect(
		() => {
			if (dogs && dogs.length > 0) {
				var index = page * dogsPerPage - dogsPerPage;
				if (dogsToShow.length === 0) {
					var dogsCopy = JSON.parse(JSON.stringify(dogs));
					setCurrPageDogs(dogsCopy.slice(index, index + dogsPerPage));
				} else {
					var dogsToShowCopy = JSON.parse(JSON.stringify(dogsToShow));
					setCurrPageDogs(dogsToShowCopy.slice(index, index + dogsPerPage));
				}
			}
			if (dogsToShow.length) {
				const amountOfPages = Number((dogsToShow.length / dogsPerPage).toFixed(0));
				// eslint-disable-next-line no-unused-vars
				const whichToSetCount = amountOfPages > 0 ? setCount(amountOfPages) : setCount(1);
			}
		},
		[ dogs, page, dogsToShow ]
	);

	const handleChange = (event, value) => {
		setPage(value);
	};

	const onSearch = (term) => {
		const dogsCopy = JSON.parse(JSON.stringify(dogs));
		const dogsBySearch = dogsCopy.filter((dog) => {
			dog.name.toLowerCase();
			return dog.name.includes(term.toLowerCase());
		});
		setDogsToShow(dogsBySearch);
	};

	const setFilter = (dogsList) => {
		console.log(dogsList);
	};

	return !dogs ? (
		<Loading />
	) : (
		<main className="dogs-page flex space col">
			<Search onSearch={onSearch} />
			<Pagination variant="outlined" page={page} onChange={handleChange} count={count} />
			<span className="content-wrapper flex space">
				<span>
					<GenderList dogs={dogs} onFilter={setFilter} />
					<BreedsList dogs={dogs} onFilter={setFilter} />
				</span>
				<span className="list-wrapper">
					<div className="card-grid">
						<DogsList dogs={currPageDogs} />
					</div>
					<Pagination variant="outlined" page={page} onChange={handleChange} count={count} />
				</span>
			</span>
		</main>
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

export const Dogs = connect(mapStateToProps, mapDispatchToProps)(_Dogs);
