import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backendprojeto-dtehecguhwdufucw.brazilsouth-01.azurewebsites.net',
    /* baseURL: 'http://localhost:5284' */
    timeout: 10000,
});

export default api;