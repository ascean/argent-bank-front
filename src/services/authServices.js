import { API_URL } from "../config";
import axios from "axios";
import { my401InterceptorResponse } from "../interceptors/401Interceptor";
import {
    myInterceptorRequest,
    myInterceptorResponse,
} from "../interceptors/authInterceptor";

//interceptors
axios.interceptors.request.use(myInterceptorRequest);
axios.interceptors.response.use(my401InterceptorResponse);
axios.interceptors.response.use(myInterceptorResponse);

/**
 * API for signup
 * @param {Object} credentials { "email": "string", "password": "string", "firstName": "string", "lastName": "string"}
 * @return {Object}
 * {"email" : "string", "password": "string", "firstName" : "string", "lastName" : "string", "createAt" : date, "upadateAt" : date , "id" : "string"}
 * @example 
 * {
        "_id": "63972fa15aad700cfc33ecd8",
        "email": "tony@stark.com",
        "password": "$2b...",
        "firstName": "Tony",
        "lastName": "Stark",
        "createdAt": "2022-12-12T13:41:53.406Z",
        "updatedAt": "2022-12-12T13:41:53.406Z",
    }
*/
export async function registerAPI (credentials) {
    try {
        const url = `${API_URL}/user/signup/`;
        const response = await axios.post(url, credentials);
        return response;
    } catch (error) {
        return error.response.status;
    }
}

/**
 * API for Login
 * @param {Object} credentials { "firstName": "string", "lastName": "string"}
 * @return {Object} {"token":token} ou {"error":error}
 */
export async function loginAPI (credentials) {
    try {
        const url = `${API_URL}/user/login/`;
        const response = await axios.post(url, credentials);
        return response
    } catch (error) {
        return error.request.status
    }
}

/**
 * API for fetching a user profile
 * @return {Object} 
 * {"email" : "string", "firstName" : "string", "lastName" : "string", "createAt" : date, "upadateAt" : date , "id" : "string"}
 * @example 
 * {
 * "email": "tony@stark.com",
    "firstName": "Tony",
    "lastName": "Stark",
    "createdAt": "2022-12-12T14:47:59.726Z",
    "updatedAt": "2022-12-12T14:47:59.726Z",
    "id": "63973f1f5aad700cfc33ecdb"
    * }
    */
export async function fetchProfileAPI(token) {
    try {
        const url = `${API_URL}/user/profile`;
        const response = await axios.post(url);
        return response;
    } catch (error) {
        return error.response.status;
    }
}

/**
 * API for updating an user profile
 * @param {Object} credentials { "firstName": "string", "lastName": "string"}
 * @returns {Object} 
 * {"email" : "string", "firstName" : "string", "lastName" : "string", "createAt" : date, "upadateAt" : date , "id" : "string"}
 * @example 
 * {
 * "email": "tony@stark.com",
"firstName": "Tony",
"lastName": "Stark",
    "createdAt": "2022-12-12T14:47:59.726Z",
    "updatedAt": "2022-12-12T14:47:59.726Z",
    "id": "63973f1f5aad700cfc33ecdb"
    * }
    */
export async function updateProfileAPI (credentials) {
    try {
        const url = `${API_URL}/user/profile`;
        const response = await axios.put(url, credentials);
        return response;
    } catch (error) {
        return error.response.status;
    }
}

const authService = {
    registerAPI,
    loginAPI,
    fetchProfileAPI,
    updateProfileAPI,
};

export default authService;
