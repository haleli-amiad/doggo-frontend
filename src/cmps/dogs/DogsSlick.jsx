import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiPawOutline } from '@mdi/js';
import { DB_KEY } from '../../constants';
import { Link } from 'react-router-dom';
import Loading from '../layout/Loading';
function DogsSlick() {
	const [ randomDogs, setRandomDogs ] = useState([]);

	useEffect(
		() => {
			if (randomDogs.length < 1) {
				const dogs = JSON.parse(localStorage.getItem(DB_KEY));
				const randomIndex = (Math.random * 30).toFixed(0);
				setRandomDogs(dogs.slice(randomIndex, 7));
			}
		},
		[ randomDogs ]
	);

	useEffect(() => {
		return () => {
			setRandomDogs([]);
		};
	}, []);

	const settings = {
		arrows: true,
		infinite: true,
		slidesToShow: 3,
		initialSlide: 2,
		swipeToSlide: true,
		centerMode: true
	};

	return !randomDogs ? (
		<Loading />
	) : (
		<div className="slick-container">
			<h2>Check them out too</h2>
			<Slider {...settings}>
				{randomDogs.map((dog) => {
					return (
						<div key={dog.id} className="dog-slick">
							<Link
								to={{
									pathname: `/dog/${dog.id}`,
									state: { dog: dog }
								}}
								params={{ dog }}
							>
								<div className="dog-slick-container pointer">
									<img src={dog.url} alt="dog" />
								</div>
								<div className="popover flex center pointer">
									<Icon path={mdiPawOutline} size={1} /> {dog.name && <p>Meet {dog.name}</p>}
									{!dog.name && <p>Meet Doggo</p>}
								</div>
							</Link>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}

export default DogsSlick;
