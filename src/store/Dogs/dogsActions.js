// import * as actionTypes from './dogsTypes'
import { dogsService } from '../../services/dogs-service'
// export const addAppointment = (dogId) => {
//     return {
//         type: actionTypes.ADD_APPOINTMENT,
//         payload: {
//             id: dogId
//         }
//     }
// }

// export const removeAppointment = (dogId) => {
//     return {
//         type: actionTypes.REMOVE_APPOINTMENT,
//         payload: {
//             id: dogId
//         }
//     }
// }

// export const removeAppointment = (appointmentId, value) => {
//     return {
//         type: actionTypes.REMOVE_APPOINTMENT,
//         payload: {
//             id: appointmentId,
//             date: value,
//         }
//     }
// }

// export const searchDogs = (q) => {
//     return {
//         type: actionTypes.SEARCH_DOGS,
//         payload: {
//             term: q,
//         }
//     }
// }

// export function filterDogs(breeds) {
//     return async (dispatch) => {
//         try {
//             const filteredDogs = await dogsService.filter(breeds)
//             dispatch({ type: 'FILTER_DOGS', filteredDogs })
//         } catch (err) {
//             console.error('ERROR: CANNOT FILTER DOGS');
//             throw err;
//         }
//     }
// }

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
