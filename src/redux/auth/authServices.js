import { API_URL } from "../../config";
import axios from "axios";
import {myInterceptorRequest} from "../../interceptors/authReqInterceptor";
import {myInterceptorResponse} from "../../interceptors/authRespInterceptor";

axios.interceptors.request.use(myInterceptorRequest)
axios.interceptors.response.use(myInterceptorResponse)

// authInterceptor()
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
export async function register(credentials) {
    try {
        const url = `${API_URL}/user/signup/`;
        const response = await axios.post(url, credentials);
        return response.body;
    } catch (error) {
        return error.response.status;
    }
}

/**
 * API for Login
 * @param {Object} credentials { "firstName": "string", "lastName": "string"}
 * @return {string} token
*/
export async function login (credentials) {
    console.log("login");
    try {
        const url = `${API_URL}/user/login/`;
        const response = await axios.post(url, credentials);
        return response.data.body.token;
    } catch (error) {
        return error.request.status ;
    }
}

/**
 * API for fetching a user profile
 * @return {Object || string} 
 * {"email" : "string", "firstName" : "string", "lastName" : "string", "createAt" : date, "upadateAt" : date , "id" : "string"}
 * or
 * "401"
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
   export async function fetchProfile() {
    try {
        const url = `${API_URL}/user/profile`;
        const response = await axios.post(url);
        return response.data.body;
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
   export async function updateProfile(credentials) {
       try {
        const url = `${API_URL}/user/profile`;
        const token = window.localStorage.getItem("token");
        const response = await axios.put(url, credentials, token);
        return response.data.body;
    } catch (error) {
        return error.response.status;
    }
}

/**
 * Remove token fromthe localStorage when log out
 */
const logout = () => {
    localStorage.removeItem("token");
};

const authService = {
    register,
    login,
    fetchProfile,
    logout,
    updateProfile,
};

export default authService;
