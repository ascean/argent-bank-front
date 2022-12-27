import axios from "axios";

// 
/**
 *  Response interceptor for 401 error -> remove token from local storage
 */
export const my401InterceptorResponse = axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        console.log(err);
        if (err.response.status === 401) localStorage.removeItem("token");
        return Promise.reject(err);
    }
);
