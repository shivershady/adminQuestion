import {Axios} from "./Axios";

export function addQuestion(payload) {
    const url = "";
    return Axios.post(url,payload)
}

export function editQuestion(payload) {
    const url = "";
    return Axios.post(url,payload)
}

export function deleteQuestion(payload) {
    const url = "";
    return Axios.post(url,payload)
}

export const authService = {
    addQuestion,
    editQuestion,
    deleteQuestion
};