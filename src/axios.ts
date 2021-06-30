import axios from 'axios';

const $axios = axios;
$axios.defaults.baseURL = 'https://market-api2021.herokuapp.com/';

export default $axios;
