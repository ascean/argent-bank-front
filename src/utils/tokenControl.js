import jwt from "jwt-decode";

/**
 * Control existence of a valid token
 * @returns boolean
 */
export const isValidToken = () => {
    const token = localStorage.getItem("token")
    if (!token) return false

    const decoded = jwt(token);
    if (!decoded.exp || Date.now() > decoded.exp * 1000) {
        localStorage.removeItem("token")
        return false
    }

    return true;
};