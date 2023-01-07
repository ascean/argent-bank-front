import axios from 'axios'
import { API_URL } from '../config';
import { isValidToken } from '../utils/tokenControl';

/**
 * Request interceptor : collect & control & get token in localStorage 
 * Add token in axios headers for login and signup request
 */
export const myInterceptorRequest = axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token")
        if ((config.url !== `${API_URL}/user/login/`
            || config.url !== `${API_URL}/user/signup/`)
            && isValidToken()) {
            config.headers[ "Authorization" ] = "Bearer " + token;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);

    }
);

/**
 * Response interceptor : add API token in local storage if login request
 */
export const myInterceptorResponse = axios.interceptors.response.use(
    response => {
        if (response.request.responseURL === `${API_URL}/user/login/` && response.data.body.token) {
            localStorage.setItem("token", response.data.body.token);
            return {"token":response.data.body.token}
        }
        return response.data.body
    },
    err => {
        return { "error": err.response.status}
    }
);

