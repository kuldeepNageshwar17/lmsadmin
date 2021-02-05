import axios from "axios";


export const LOGIN_URL = "/api/auth/login";
export const REGISTER_URL = "api/auth/user";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/auth/me";
// export const LOGOUT_USER = "api/auth/logout";

export function login(email, password) {
    return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname,  password,mobile,institute) {
    return axios.post(REGISTER_URL, { email,name:fullname, password,mobile,institute });
}

export function requestPassword(email) {
    return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken(authToken) {
    // Authorization head should be fulfilled in interceptor.
    return axios.get(`api/auth/me/${authToken}`);
}

// export async function logoutUser() {
//     // Authorization head should be fulfilled in interceptor.
//     return axios.post(LOGOUT_USER);
// }