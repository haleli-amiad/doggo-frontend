import { useEffect, useState } from 'react';
import Filter from './Filter';

function GenderList(props) {
	const [ genderToShow, setGenderToShow ] = useState(null);
	const { dogs } = props;
	// useEffect(
	// 	() => {
	// 		if (genderToShow === 'all') setDogsToShow([]);
	// 		else if (dogs && dogs.length) {
	// 			const dogsCopy = JSON.parse(JSON.stringify(dogs));
	// 			const dogsByGender = dogsCopy.filter((dog) => dog.gender === genderToShow);
	// 			setDogsToShow(dogsByGender);
	// 		}
	// 	},
	// 	[ genderToShow, dogs ]
	// );

	const onFilterByGender = (gender) => {
		setGenderToShow(gender.toLowerCase());
	};

	return (
		<Filter
			onFilter={onFilterByGender}
			type={'radio'}
			title={'By Gender'}
			filterList={[ 'All', 'Male', 'Female' ]}
		/>
	);
}

export default GenderList;
