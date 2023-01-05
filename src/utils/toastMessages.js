import { toast } from "react-toastify";

export const generateErrorMessage = (error) => {
    switch (error) {
        case 400:
            return toast.error("Wrong username and/or password", {autoClose:2000});
            
        case 401:
            return toast.error("Unauthorized. Please log in", {autoClose:2000});
            
        case 500:
            return toast.error("Internal Server Error", {autoClose:2000});
        default:
            break;
    }
};

export const generateErrorMessageRegister = (error) => {
    switch (error) {

        case 400:
            return toast.error("Username already exists", {autoClose:2000});
            
        case 500:
            return toast.error("Internal Server Error", {autoClose:2000});
        default:
            break;
    }
};

export const generateSuccessMessage = (success) => {
        return toast.success(success, {autoClose:2000});
};

export const generateWarningMessage = (warning) => {
    return toast.warn(warning, {autoClose:2000});
};
