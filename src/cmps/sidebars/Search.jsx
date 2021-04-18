import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
function Search(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: 400
		}
	}));
	const classes = useStyles();

	const onChange = (event) => {
		console.log(event.target.value);
		props.onSearch(event.target.value)
	}
	return (
		<div className="search-bar flex center">
			<span className="wrapper">
				<InputBase
					className={classes.input}
					onChange={onChange}
					placeholder="Search for doggies"
					inputProps={{ 'aria-label': 'Search for doggies' }}
				/>
				<IconButton type="submit" className={classes.iconButton} aria-label="search">
					<SearchIcon />
				</IconButton>
			</span>
		</div>
	);
}
export default Search;
