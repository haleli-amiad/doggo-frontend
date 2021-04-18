import DogDetails from './pages/DogDetails';
import Home from './pages/Home'
import {Dogs} from './pages/Dogs';

const Routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/dog/:dogId',
        component: DogDetails
    },
    {
        path: '/dogs',
        component: Dogs
    }
]

export default Routes