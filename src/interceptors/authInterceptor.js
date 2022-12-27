import axios from 'axios'
import { isValidToken } from '../utils/tokenControl';


/**
 * Request interceptor : collect & control & get token from localStorage and add it in axios headers
 */
export const myInterceptorRequest = axios.interceptors.request.use(
    function (config) {

        const token = localStorage.getItem("token")
        if ((config.url !== "http://localhost:3001/api/v1/user/login/"
            || config.url !== "http://localhost:3001/api/v1/user/signup")
            && isValidToken(token)) {
            config.headers[ "Authorization" ] = "Bearer " + token;
        }
        return config;
        
    },
    function (error) {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor : add API token in local storage
 */
export const myInterceptorResponse = axios.interceptors.response.use(
    response => {

        if (response.request.responseURL === "http://localhost:3001/api/v1/user/login/" && response.data.body.token) {
            localStorage.setItem("token", response.data.body.token);
        }
        return response;
    },
    err => {
        return Promise.reject(err);
    }
);
