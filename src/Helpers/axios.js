import axios from 'axios';
const baseUrl = "http://localhost:2000/api";
const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: token ? `${token}` : ''
    }
});

export default axiosIntance;