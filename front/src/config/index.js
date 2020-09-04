import axios from 'axios';
import SessionService from "../services/SessionService";

const sessionService = SessionService;

const SERVER_URL = `http://localhost:8080/api/v1`;

const axiosInstance = axios.create({
    baseURL: SERVER_URL
});

axiosInstance.interceptors.request.use(
    config => {
        const token = sessionService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
});

export default {
    axiosInstance,
    SERVER_URL
}