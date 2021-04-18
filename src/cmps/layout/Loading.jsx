import LottieAnimation from '../../Lottie';
import corgi from './LoaderLottie.json';
function Loading() {
	return (
		<div className="loading">
			<LottieAnimation lotti={corgi} height={400} width={700} />
            <h1>Hold on.. I'm coming!</h1>
		</div>
	);
}

export default Loading;
