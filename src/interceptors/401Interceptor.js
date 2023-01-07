import axios from "axios";
import { generateErrorMessage } from "../utils/toastMessages";

//
/**
 *  Response interceptor for 401 error -> remove token from local storage
 *  redirect towards login page if action autorized only for authenticated user
 */
export const my401InterceptorResponse = axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response.status === 401) {
            localStorage.removeItem("token");
            //user could access to home page even if not authentified
            if (window.location.href === "http://localhost:3000/") {
                window.location.href = "http://localhost:3000/";
            } else {
                generateErrorMessage(err.response.status);
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/login";
                }, 2000);
            }
        }
        return Promise.reject(err);
    }
);
