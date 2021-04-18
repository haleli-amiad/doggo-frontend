import { useEffect, useState } from 'react';
import DogsList from '../cmps/dogs/DogsList';
import Loading from '../cmps/layout/Loading';
import Pagination from '@material-ui/lab/Pagination';
import Search from '../cmps/sidebars/Search';
import { getDogs } from '../store/Dogs/dogsActions';
import Filter from '../cmps/sidebars/Filter';
import { connect } from 'react-redux';

function _Dogs(props) {
	const [ dogs, setDogs ] = useState(null);
	const [ currPageDogs, setCurrPageDogs ] = useState([]);
	const [ page, setPage ] = useState(1);
	const dogsPerPage = 12;
	const [ breeds, setBreeds ] = useState([]);
	const [ count, setCount ] = useState(null);
	const [ breedsToShow, setBreedsToShow ] = useState([]);
	const [ genderToShow, setGenderToShow ] = useState(null);
	const [ dogsToShow, setDogsToShow ] = useState([]);

	useEffect(
		() => {
			const loadDogs = async () => {
				await props.getDogs();
			};
			if (!props.dogs || !props.dogs.length) {
				setDogs(loadDogs());
			} else {
				setDogs(props.dogs);
			}
			const isToCount = (dogs && !dogsToShow.length) ? setCount(Number((dogs.length / dogsPerPage).toFixed(0))) : null;
		},
		[ dogs, props, dogsToShow ]
	);

	useEffect(
		() => {
			if (breedsToShow.length > 0) {
				let filteredByBreed = [];
				breedsToShow.map((breed) => {
					dogs.map((dog) => {
						if (dog.breeds && dog.breeds[0]) {
							if (dog.breeds[0].name === breed) filteredByBreed.push(dog);
						}
						return dog;
					});
					return breed;
				});
				setDogsToShow(filteredByBreed);
			} else setDogsToShow([]);
		},
		[ breedsToShow, dogs ]
	);

	useEffect(
		() => {
			const getBreeds = () => {
				return dogs.map((dog) => {
					if (dog.breeds && dog.breeds[0]) {
						if (dog.breeds[0].name) return dog.breeds[0].name;
						else return '';
					} else return '';
				});
			};
			if (dogs && dogs.length > 0 && breeds.length === 0) {
				const dogBreeds = getBreeds();
				const uniqueBreeds = dogBreeds.filter(
					(breedName, i) => dogBreeds.indexOf(breedName) === i && breedName !== ''
				);
				setBreeds(uniqueBreeds);
			}
		},
		[ breeds, dogs ]
	);

	useEffect(
		() => {
			if (dogs && dogs.length > 0) {
				var index = page * dogsPerPage - dogsPerPage;
				if (dogsToShow.length === 0) {
					var dogsCopy = JSON.parse(JSON.stringify(dogs));
					setCurrPageDogs(dogsCopy.slice(index, index + dogsPerPage));
				} else {
					console.log(page, dogsPerPage, dogsToShow, index);
					var dogsToShowCopy = JSON.parse(JSON.stringify(dogsToShow));
					setCurrPageDogs(dogsToShowCopy.slice(index, index + dogsPerPage));
				}
			}
			if (dogsToShow.length) {
				console.log(dogsToShow);
				const amountOfPages = Number((dogsToShow.length / dogsPerPage).toFixed(0));
				const whichToSetCount = amountOfPages > 0 ? setCount(amountOfPages) : setCount(1);
			}
		},
		[ dogs, page, dogsToShow ]
	);

	const handleChange = (event, value) => {
		setPage(value);
	};

	const onFilterByBreed = (selectedBreed, isToAdd) => {
		if (isToAdd) {
			setBreedsToShow((prevState) => [ ...prevState, selectedBreed ]);
		} else {
			const breedsToShowCopy = JSON.parse(JSON.stringify(breedsToShow));
			const updatedFilteredDogs = breedsToShowCopy.filter((breed) => breed !== selectedBreed);
			setBreedsToShow(updatedFilteredDogs);
		}
	};

	useEffect(
		() => {
			if (genderToShow === 'all') setDogsToShow([]);
			else if (dogs && dogs.length) {
				const dogsCopy = JSON.parse(JSON.stringify(dogs));
				const dogsByGender = dogsCopy.filter((dog) => dog.gender === genderToShow);
				setDogsToShow(dogsByGender);
			}
		},
		[ genderToShow, dogs ]
	);

	const onFilterByGender = (gender) => {
		setGenderToShow(gender.toLowerCase());
	};

	const onSearch = (term) => {
		console.log(term);
	}

	return !dogs || !dogs.length > 0 ? (
		<Loading />
	) : (
		<main className="dogs-page flex space col">
			<Search onSearch={onSearch}/>
			<Pagination variant="outlined" page={page} onChange={handleChange} count={count} />
			<span className="content-wrapper flex space">
				<span>
					<Filter
						onFilter={onFilterByGender}
						type={'radio'}
						title={'By Gender'}
						filterList={[ 'All', 'Male', 'Female' ]}
					/>
					{breeds.length > 1 && (
						<Filter onFilter={onFilterByBreed} type={'checkbox'} title={'By breed'} filterList={breeds} />
					)}
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
