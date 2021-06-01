import { useState } from 'react';
import Loading from '../cmps/layout/Loading';
import DogsPagination from '../cmps/dogs/Pagination';
import Search from '../cmps/sidebars/Search';
import { connect } from 'react-redux';
import BreedsList from '../cmps/sidebars/BreedsList';
import GenderList from '../cmps/sidebars/GenderList';

function _Dogs(props) {
	const [ dogsToShow, setDogsToShow ] = useState([]);
	const { dogs } = props;

	const onSearch = (term) => {
		const dogsCopy = JSON.parse(JSON.stringify(dogs));
		const dogsBySearch = dogsCopy.filter((dog) => {
			dog.name.toLowerCase();
			return dog.name.includes(term.toLowerCase());
		});
		dogsBySearch.length ? setDogsToShow(dogsBySearch) : setDogsToShow([])
	};

	const setFilter = (dogsList) => {
		console.log(dogsList);
	};

	return !dogs ? (
		<Loading />
	) : (
		<main className="dogs-page flex space col">
			<Search onSearch={onSearch} />
			<span className="content-wrapper flex space">
				<span>
					<GenderList dogs={dogs} onFilter={setFilter} />
					<BreedsList dogs={dogs} onFilter={setFilter} />
				</span>
				<DogsPagination dogs={dogs} dogsToShow={dogsToShow} />
			</span>
		</main>
	);
}

const mapStateToProps = (state) => {
	return {
		dogs: state.dogReducer.dogs
	};
};

export const Dogs = connect(mapStateToProps)(_Dogs);
