import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import { Fragment, useState } from 'react';

function Filter(props) {
	const { filterList, title, type } = props;
	const [ checkedGender, setCheckedGender ] = useState(null);

	const handleChange = (event) => {
		const { value, checked } = event.target;
		if (value === 'Male' || event.target.value === 'Female' || event.target.value === 'All')
			setCheckedGender(value);
		props.onFilter(value, checked);
	};

	return (
		<div className="dog-filter">
			<h2>{title}</h2>
			{type === 'radio' && (
				<Fragment>
					{filterList.map((item) => {
						return (
							<div key={item} className="checkbox-list flex center space">
								<Radio
									onChange={handleChange}
									value={item}
									name={item}
									checked={checkedGender === item}
								/>
								<p>{item}</p>
							</div>
						);
					})}
				</Fragment>
			)}

			{type === 'checkbox' &&
				filterList.map((item) => {
					return (
						<div key={item} className="checkbox-list flex center space">
							<Checkbox id={item} value={item} onChange={handleChange} />
							<p className="pointer">{item}</p>
						</div>
					);
				})}
		</div>
	);
}
export default Filter;
