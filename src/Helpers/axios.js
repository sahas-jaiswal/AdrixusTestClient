import axios from 'axios';
const baseUrl = "http://3.108.193.247:2000/api";
const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: token ? `${token}` : ''
    }
});

export default axiosIntance;