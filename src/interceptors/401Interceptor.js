import axios from "axios";
import { generateErrorMessage } from "../utils/toastMessages";

// 
/**
 *  Response interceptor for 401 error -> remove token from local storage
 */
export const my401InterceptorResponse = axios.interceptors.response.use(
    response => {
        return response;
    },
    err => {
        if (err.response.status === 401) {
            generateErrorMessage(err.response.status)
            localStorage.removeItem("token");
            setTimeout(() => {
                window.location.href='http://localhost:3000/login'
            }, 2000)
            return err.response.status
        }
        return Promise.reject(err);
    }
);
