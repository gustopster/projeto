import axios from 'axios';

const api = axios.create({
  baseURL: window.location.href === 'http://localhost:5173/projeto/'
    ? 'http://localhost:5284'
    : 'https://backendprojeto-dtehecguhwdufucw.brazilsouth-01.azurewebsites.net',
  timeout: 10000,
});

export default api;