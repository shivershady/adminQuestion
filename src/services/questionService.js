import {Axios} from './Axios';

export function getAllQuestions(examId) {
    const url = `/api/question/getQuestionByExamId/${examId}`;
    return Axios.get(url)
}

export function getQuestion(id) {
    const url = `/api/question/${id}`;
    return Axios.get(url)
}

export function addQuestion(payload) {
    const url = "/api/question/add";
    return Axios.post(url,payload)
}

export function editQuestion(payload) {
    const url = "/api/question/add";
    return Axios.post(url,payload)
}

export function deleteQuestion(payload) {
    const url = "";
    return Axios.post(url,payload)
}

export const questionService = {
    getAllQuestions,
    getQuestion,
    addQuestion,
    editQuestion,
    deleteQuestion
};