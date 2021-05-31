// import axios from 'axios';
import { httpService } from './HttpService'
import { DB_KEY } from '../constants';
// axios.defaults.headers.common['x-api-key'] = API_KEY;
// axios.defaults.baseURL = 'https://api.thedogapi.com/v1';
export const dogsService = {
    query,
    // filter
}

async function query(q = '') {
    console.log('arrived');
    if (localStorage.getItem(DB_KEY)) {
        const dogsDB = JSON.parse(localStorage.getItem(DB_KEY));
        return dogsDB
    } else {
        try {
            var dogsDB = await httpService.get('dogs')
        } catch (err) {
            console.log(err);
        } finally {
            localStorage.setItem(DB_KEY, JSON.stringify(dogsDB));
            return dogsDB;
        }
    }
    // try {
    //     console.log('axios');
    //     var response = await axios.get('/images/search', {
    //         params: { limit: 100, size: 'full', mime_types: 'jpg,png' }
    //     });
    // } catch (err) {
    //     console.log(err);
    // } finally {
    //     console.log('entered finally');
    //     let dogsDB = response.data
    //     dogsDB.map((dog) => {
    //         if (typeof (dog.breeds !== 'undefined') && dog.breeds[0]) {
    //             dog.bred_for = dog.breeds[0].bred_for || null
    //             dog.breed_height = dog.breeds[0].height || null
    //             dog.life_span = dog.breeds[0].life_span || null
    //             dog.breed_name = dog.breeds[0].name || null
    //             dog.temperament = dog.breeds[0].temperament || null
    //             dog.breed_weight = dog.breeds[0].weight || null
    //             dog.breed_group = dog.breeds[0].breed_group || null
    //             delete dog.breeds
    //         } else {
    //             dog = {}
    //         }
    //         dog.gender = _getRandomGender();
    //         dog.name = _getRandomName(dog.gender);
    //         dog.age = _getRandomAge();
    //         return dog;
    //     });
    //     const filter = dogsDB.filter((dog) => dog !== {})
    //     console.log(dogsDB);
    //     localStorage.setItem(DB_KEY, JSON.stringify(filter));
    //     return response.data
    // }
}
// }

// function filter() {
//     console.log('bla');
// }

    // function _getRandomAge() {
    //     return (Math.random() * 13).toFixed(0);
    // }

    // function _getRandomGender() {
    //     const randomNumber = _getRandomNumber();
    //     const gender = randomNumber > 25 ? 'male' : 'female';
    //     return gender;
    // }

    // function _getRandomNumber() {
    //     return (Math.random() * 50).toFixed(0);
    // }

    // function _getRandomName(gender) {
    //     const randomNumber = _getRandomNumber();
    //     const name = gender === 'male' ? DOG_NAMES_MALE[randomNumber] : DOG_NAMES_FEMALE[randomNumber];
    //     return name;
    // }