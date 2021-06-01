import { useEffect, useState } from 'react';
import DogsList from './DogsList';
import Pagination from '@material-ui/lab/Pagination';

export default function DogsPagination({ dogs, dogsToShow }) {
	const [ currPageDogs, setCurrPageDogs ] = useState([]);
	const [ page, setPage ] = useState(1);
	const dogsPerPage = 12;
	const [ count, setCount ] = useState(null);
	const index = page * dogsPerPage - dogsPerPage;

	useEffect(() => {
		dogs && !dogsToShow.length ? setCount(Number((dogs.length / dogsPerPage).toFixed(0))) : setCount(null);
		if (dogsToShow.length) {
			const amountOfPages = Number((dogsToShow.length / dogsPerPage).toFixed(0));
			amountOfPages > 0 ? setCount(amountOfPages) : setCount(1);
		}
	}, []);

	useEffect(
		() => {
			function setCurrDogs(dogs) {
				setCurrPageDogs(dogs.slice(index, index + dogsPerPage));
			}
			if (dogs) {
				dogsToShow.length === 0 ? setCurrDogs(dogs) : setCurrDogs(dogsToShow);
			}
		},
		[ page ]
	);

	useEffect(
		() => {
			setCurrPageDogs(dogsToShow.slice(index, index + dogsPerPage));
		},
		[ dogsToShow ]
	);

	const handleChange = (event, value) => {
		setPage(value);
	};

	return (
		<span className="list-wrapper">
			<Pagination variant="outlined" page={page} onChange={handleChange} count={count} />
			<div className="card-grid">
				<DogsList dogs={currPageDogs} />
			</div>
			<Pagination variant="outlined" page={page} onChange={handleChange} count={count} />
		</span>
	);
}
