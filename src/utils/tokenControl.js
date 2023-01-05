import jwt from "jwt-decode";

/**
 * Control token  + expiration date validity
 * @returns boolean
 */
export const isValidToken = () => {
    const token = localStorage.getItem("token")
    if (token === null) return null
    
    const decoded = jwt(token);
    if (!decoded.exp || Date.now() > decoded.exp * 1000) {
        localStorage.removeItem("token")
        return null
    }

    return token;
};