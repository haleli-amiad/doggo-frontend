
const INITIAL_STATE = {
    dogs: [],
    appointments: []
}

export function dogReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_DOGS':
            return {
                ...state,
                dogs: action.dogs
            }
        case 'REMOVE_APPOINTMENT':
            return {}
        case 'CHANGE_APPOINTMENT':
            return {}
        case 'SEARCH_DOGS':
            return {}
        case 'FILTER_DOGS':
            return {}
        default:
            return state
    }
}
