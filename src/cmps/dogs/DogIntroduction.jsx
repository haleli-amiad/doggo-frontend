import ScheduleIcon from '@material-ui/icons/Schedule';
import { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiGenderFemale } from '@mdi/js';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { mdiGenderMale } from '@mdi/js';
function DogIntroduction({ dog }) {
	const [ greeting, setGreeting ] = useState(null);
	const [ ctaText, setCtaText ] = useState(null);

	useEffect(
		() => {
			if (!greeting) {
				const greetingTexts = [ 'Hey', 'Holla', 'Ciao', 'Hi', 'Shalom', 'Hey there' ];
				var randomNumber = Math.abs((Math.random() * 6 - 1).toFixed(0));
				setGreeting(greetingTexts[randomNumber]);
			}
		},
		[ greeting ]
	);

	useEffect(
		() => {
			if (!ctaText) {
				const ctaTexts = [
					"I can't wait to meet you! woof",
					"We're gonna be best friends!",
					"I feel like it's fate!",
					'Come get me, please!',
					'I already love you.',
					'This is going to be a love story!'
				];
				var randomNumber = Math.abs((Math.random() * 6 - 1).toFixed(0));
				setCtaText(ctaTexts[randomNumber]);
			}
		},
		[ ctaText ]
	);

	return (
		<div className="dog-intro-container">
			<div className="dog-intro-main flex space">
				<span className="text-container">
					<h1>
						{greeting}, I'm {dog.name}!
					</h1>
					<h2>I'm {dog.age} years old and I'm gonna swipe you off your feet!</h2>
					{dog.breeds[0] && (
						<span>
							<h2>
								{dog.breeds[0].bred_for && (
									<span> I'm specially good at {dog.breeds[0].bred_for},</span>
								)}
								{dog.breeds[0].breed_group && (
									<span>
										{' '}
										I'm from the {dog.breeds[0].breed_group}
										breed group,
									</span>
								)}
								{dog.breeds[0].life_span && (
									<span> My breed's average life is {dog.breeds[0].life_span}. </span>
								)}
							</h2>
							{dog.breeds[0].temperament && <h2>My temperament is {dog.breeds[0].temperament}! </h2>}
						</span>
					)}
					<h2 className="cta-text">{ctaText}</h2>
					<button>
						<ScheduleIcon />Book a meeting with {dog.name}
					</button>
				</span>
				<div className="image-container">
					<img src={dog.url} alt="dog" />
				</div>
			</div>
			<div className="info-line flex center">
				<span className="flex col center wrap">
					{dog.gender === 'female' && <Icon path={mdiGenderFemale} size={1} />}
					{dog.gender === 'male' && <Icon path={mdiGenderMale} size={1} />}
					<p>{dog.gender}</p>
				</span>
				{dog.breeds[0] && (
					<span className="flex col center wrap">
						<PetsOutlinedIcon />
						<p className="dog-title">{dog.breeds[0].name}</p>
					</span>
				)}
				<span className="flex col center wrap">
					<AllInclusiveIcon />
					<p>Your BFF Forever</p>
				</span>
				<span className="flex col center wrap">
					<CakeOutlinedIcon />
					<p>{dog.age} years old</p>
				</span>
			</div>
		</div>
	);
}

export default DogIntroduction;
