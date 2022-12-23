import axios from 'axios'
import jwt from "jwt-decode";

/**
 * Control token validity
 * @param {string} token 
 * @returns boolean
 */
export const isValidToken = (token) => {
    
    if (!token) return false

    const decoded = jwt(token);
    if (Date.now() <= decoded.exp * 1000) {
        return true;
    }
    
    return false;
};

/**
 * Request interceptor : collect & control & add token from localStorage to axios headers
 */
export const myInterceptorRequest = axios.interceptors.request.use(
    function (config) {
        
        const token = localStorage.getItem("token");
        if ((config.url !== "http://localhost:3001/api/v1/user/login/" || config.url !== "http://localhost:3001/api/v1/user/signup") && isValidToken(token)) {
            config.headers[ "Authorization" ] = "Bearer " + token;
        }
        return config;
        
    },
    function (error) {
        return Promise.reject(error);
    }
);

