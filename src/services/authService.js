import {Axios} from "./Axios";

export function login(payload) {
    return Axios.post(`login`,payload)
}

export const authService = {
    login
};