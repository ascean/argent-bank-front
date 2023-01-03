import jwt from "jwt-decode";

/**
 * Control token expiration date validity
 * @param {string} token 
 * @returns boolean
 */
export const isValidToken = (token) => {

    if (!token) return false

    const decoded = jwt(token);
    if (!decoded.exp || Date.now() > decoded.exp * 1000) {
        localStorage.removeItem("token")
        return false
    }

    return true;
};