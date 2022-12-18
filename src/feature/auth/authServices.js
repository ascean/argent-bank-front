import { API_URL } from "../../config";
import axios from "axios";
import jwt from "jwt-decode";

export const isValidToken = (token) => {
    const decoded = jwt(token);
    if (Date.now() <= decoded.exp * 1000) {
        return true;
    } else {
        return false;
    }
};

// AXIOS INTERCEPTORS
// Request interceptor
axios.interceptors.request.use(
    function (config) {
        // collect the token from localStorage and in axios headers
        const token = window.localStorage.getItem("token");
        if (token) {
            if (config.url === "http://localhost:3001/api/v1/user/login/") {
                config.headers["Authorization"] = "";
            } else {
                if (isValidToken(token)) {
                    //ajout test token valide
                    config.headers[ "Authorization" ] = "Bearer " + token;
                } else {
                    config.headers["Authorization"] = "";
                }
            }
        } else {
            config.headers["Authorization"] = "";
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    function (response) {
        //login request : collect the token from database add on localStorage and in axios headers
        const token = response.data.body.token;
        if (token) {
                window.localStorage.setItem("token", token);
                //config.headers[ "Authorization" ] = "Bearer " + token;
        }
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

/**
 * API for signup
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @param {string} credentials.firstName
 * @param {string} credentials.lastName
 * @return
 * {
    "status": 200,
    "message": "User successfully created",
    "body": {
        "_id": "63972fa15aad700cfc33ecd8",
        "email": "solant57@gmail.com",
        "password": "$2b...",
        "firstName": "Sandrine",
        "lastName": "Jenot",
        "createdAt": "2022-12-12T13:41:53.406Z",
        "updatedAt": "2022-12-12T13:41:53.406Z",
        "__v": 0
    }
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
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @return
 * {
    "status": 200,
    "message": "User successfully logged in",
    "body": {
        "token": "eyJhb..."
    }
}
*/
export async function login(credentials) {
    try {
        const url = `${API_URL}/user/login/`;
        const response = await axios.post(url, credentials);
        return response.data.body.token;
    } catch (error) {
        return error.request.status ;
    }
}

const logout = () => {
    localStorage.removeItem("token");
};

/**
 * API for fetching a user profile
 * @return
 * {
    "status": 200,
    "message": "Successfully got user profile data",
    "body": {
        "email": "solant57@gmail.com",
        "firstName": "Sandrine",
        "lastName": "Jenot",
        "createdAt": "2022-12-12T14:47:59.726Z",
        "updatedAt": "2022-12-12T14:47:59.726Z",
        "id": "63973f1f5aad700cfc33ecdb"
    }
}
*/
export async function fetchProfile() {
    try {
        const url = `${API_URL}/user/profile`;
        //const token = window.localStorage.getItem("token");
        //axios.defaults.headers[ "Authorization" ] = "Bearer " + token;
        const response = await axios.post(url);
        return response.data.body;
    } catch (error) {
        return { error: error.response.status };
    }
}

export async function updateProfile(credentials) {
    try {
        const url = `${API_URL}/user/profile`;
        const token = window.localStorage.getItem("token");
        const response = await axios.put(url, credentials, token);
        return response.data.body;
    } catch (error) {
        return { error: error.response.status };
    }
}

const authService = {
    register,
    login,
    fetchProfile,
    logout,
    updateProfile,
};

export default authService;
