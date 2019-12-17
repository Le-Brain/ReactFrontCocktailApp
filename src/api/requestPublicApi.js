import axios from 'axios';

const requestPublicApi = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/search.php'
});

export default requestPublicApi;