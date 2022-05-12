import {Axios} from './Axios';

function getQuestions(uid) {
    return Axios.get(``);
}

function deleteQuestion(uid, nid) {
    return Axios.del(``)
}

export const questionService = {
    getQuestions,
    deleteQuestion
};