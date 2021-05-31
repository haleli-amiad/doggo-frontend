import { useEffect, useState } from 'react';
import Filter from './Filter';
import React, { Fragment } from 'react';

function BreedsList(props) {
	const [ breeds, setBreeds ] = useState([]);
	const [ breedsToShow, setBreedsToShow ] = useState([]);
	const { dogs } = props;
	// useEffect(
	// 	() => {
	// 		if (breedsToShow.length > 0) {
	// 			let filteredByBreed = [];
	// 			breedsToShow.map((breed) => {
	// 				dogs.map((dog) => {
	// 					if (dog.breed_name === breed) filteredByBreed.push(dog);
	// 					return dog;
	// 				});
	// 				return breed;
	// 			});
	// 			setDogsToShow(filteredByBreed);
	// 		} else setDogsToShow([]);
	// 	},
	// 	[ breedsToShow, dogs ]
	// );

	useEffect(
		() => {
			const getBreeds = () => {
				return dogs.map((dog) => {
					return dog.breed_name || '';
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

	const onFilterByBreed = (selectedBreed, isToAdd) => {
		if (isToAdd) {
			setBreedsToShow((prevState) => [ ...prevState, selectedBreed ]);
		} else {
			const breedsToShowCopy = JSON.parse(JSON.stringify(breedsToShow));
			const updatedFilteredDogs = breedsToShowCopy.filter((breed) => breed !== selectedBreed);
			setBreedsToShow(updatedFilteredDogs);
		}
	};

	return !breeds ? (
		<Fragment />
	) : (
		<Filter onFilter={onFilterByBreed} type={'checkbox'} title={'By breed'} filterList={breeds} />
	);
}

export default BreedsList;
