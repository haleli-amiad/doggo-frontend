import axios from 'axios';
import { DB_KEY, API_KEY, DOG_NAMES_MALE, DOG_NAMES_FEMALE } from '../constants';
axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
export const dogsService = {
    query,
    filter
}

async function query(q = '') {
    console.log('arrived');
    if (localStorage.getItem(DB_KEY)) {
        console.log('local');
        const dogsDB = JSON.parse(localStorage.getItem(DB_KEY));
        return dogsDB
    } else {
        console.log('axios');
        try {
            var response = await axios.get('/images/search', {
                params: { limit: 80, size: 'full', mime_types: 'jpg,png' }
            });
        } catch (err) {
            console.log(err);
        } finally {
            let dogsDB = response.data.map((dog) => {
                dog.gender = _getRandomGender();
                dog.name = _getRandomName(dog.gender);
                dog.age = _getRandomAge();
                return dog;
            });
            localStorage.setItem(DB_KEY, JSON.stringify(dogsDB));
            return response.data
        }
    }
}

function filter() {
    console.log('bla');
}

function _getRandomAge() {
    return (Math.random() * 13).toFixed(0);
}

function _getRandomGender() {
    const randomNumber = _getRandomNumber();
    const gender = randomNumber > 25 ? 'male' : 'female';
    return gender;
}

function _getRandomNumber() {
    return (Math.random() * 50).toFixed(0);
}

function _getRandomName(gender) {
    const randomNumber = _getRandomNumber();
    const name = gender === 'male' ? DOG_NAMES_MALE[randomNumber] : DOG_NAMES_FEMALE[randomNumber];
    return name;
}