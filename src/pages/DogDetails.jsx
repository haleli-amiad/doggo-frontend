import { useEffect, useState } from 'react';
import Loading from '../cmps/layout/Loading';
import DogsSlick from '../cmps/dogs/DogsSlick';
import DogIntroduction from '../cmps/dogs/DogIntroduction';

const DogDetails = (props) => {
	const [ dog, setDog ] = useState(null);

	useEffect(
		() => {
			setDog(props.location.state.dog);
		},
		[ dog, props ]
	);
	return !dog ? (
		<Loading />
	) : (
		<main className="dog-details">
			<DogIntroduction dog={dog} />
			<DogsSlick />
		</main>
	);
};

export default DogDetails;
