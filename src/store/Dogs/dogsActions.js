import { dogsService } from '../../services/dogs-service'

export function getDogs(q) {
    return async (dispatch) => {
        try {
            const dogs = await dogsService.query(q)
            dispatch({ type: 'SET_DOGS', dogs })
        } catch (err) {
            console.error('ERROR: CANNOT LOAD DOGS');
            throw err;
        }
    }
}
