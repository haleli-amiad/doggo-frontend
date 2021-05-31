import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import Icon from '@mdi/react';
import { mdiGenderFemale } from '@mdi/js';
import { mdiGenderMale } from '@mdi/js';
import { Link } from 'react-router-dom';

function DogsPreview({ dog }) {
	return (
		<Link
			to={{
				pathname: `dog/${dog.id}`,
				state: { dog: dog }
			}}
			params={{ dog }}
		>
			<div className="dog-preview pointer flex col space">
				<img src={dog.url} alt="" />

				<div className="options-container flex col">
					<span className="info-line">
						<PetsOutlinedIcon />
						<p className="dog-title">{dog.breed_name}</p>
					</span>
					<span className="info-line">
						<CakeOutlinedIcon />
						<p>{dog.age} years old</p>
					</span>
					<span className="info-line">
						{dog.gender === 'female' && <Icon path={mdiGenderFemale} size={1} />}
						{dog.gender === 'male' && <Icon path={mdiGenderMale} size={1} />}
						<p className="dog-gender">{dog.gender}</p>
					</span>
				</div>
			</div>
		</Link>
	);
}

export default DogsPreview;
