import jwt from "jwt-decode";

/**
 * Control token expiration date validity
 * @param {string} token 
 * @returns boolean
 */
export const isValidToken = (token) => {
    
    if (!token) return false

    const decoded = jwt(token);
    if (!decoded.exp) return false
    
    if (Date.now() <= decoded.exp * 1000) {
        return true;
    }
    localStorage.removeItem("token")
    return false;
};