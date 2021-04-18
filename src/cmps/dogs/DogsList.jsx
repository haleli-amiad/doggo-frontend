import DogsPreview from './DogsPreview';

function DogsList({ dogs }) {
	return dogs.map((dog) => <DogsPreview dog={dog} key={dog.id} />);
}
export default DogsList;
