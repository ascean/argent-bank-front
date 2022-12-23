import axios from 'axios'

// Response interceptor
export const myInterceptorResponse = axios.interceptors.response.use(
    response => {

        //add token database on localStorage
        if (response.request.responseURL === "http://localhost:3001/api/v1/user/login/" && response.data.body.token) {
            localStorage.setItem("token", response.data.body.token);
        }
        return response;
    },
    err => {
        return Promise.reject(err);
    }
);