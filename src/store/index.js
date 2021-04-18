import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
// const store = createStore(rootReducer, composeWithDevTools())
import {dogReducer} from './Dogs/dogsReducer';

const rootReducer = combineReducers({
    dogReducer,
    // userReducer,

});
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);