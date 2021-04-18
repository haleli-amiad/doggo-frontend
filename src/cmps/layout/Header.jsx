import LottieAnimation from '../../Lottie';
import dog from './HeaderLottie.json';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<header className="flex space">
			<div className="text-container">
				<h1>Doggo</h1>
				<Link to="/dogs">
					<button>
						Your best friend is a click away<ArrowForwardIosOutlinedIcon />{' '}
					</button>
				</Link>
			</div>
			<div className="animation-container">
				<div className="animation-circle">
					<LottieAnimation lotti={dog} height={530} width={530} />
				</div>
			</div>
		</header>
	);
}

export default Header;
