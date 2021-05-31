
import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/api/' :
    '//localhost:3030/api/'


export const httpService = {
    get(endpoint, data) {
        console.log('entered httpservice get', endpoint, data);
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint, method = 'get', data = null) {
    try {
      const res = await axios({
        url: `${BASE_URL}${endpoint}`,
        method,
        data
      });
      console.log(endpoint, method, data);
      return res.data;
    } catch (err) {
      console.log('ERROR FROM HTTPSERVICE');
      throw err;
    }
  }
  