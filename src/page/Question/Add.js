import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addQuestion } from "../../services/questionService";

const Add = () => {
  const { idExam } = useParams();
  const navigate = useNavigate();
  const formData = new FormData();
  const [answers, setAnswers] = useState([]);
  const [type, setType] = useState(1);
  const [imageQuestion, setImageQuestion] = useState("");
  const [selectedImageQuestion, setSelectedImageQuestion] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let newArr = [...answers];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = { ...newArr[i], isright: false };
    }
    setAnswers(newArr);
  }, [type]);

  const updateAnswerChanged = (index) => (e) => {
    let newArr = [...answers];
    newArr[index] = { ...newArr[index], answer_content: e.target.value };
    setAnswers(newArr);
  };
  const changeAnswer = (index, isright) => (e) => {
    if (type != 1) {
      let newArr = [...answers];
      newArr[index] = { ...newArr[index], isright: !isright };
      setAnswers(newArr);
    } else {
      let newArr = [...answers];
      for (let i = 0; i < newArr.length; i++) {
        newArr[i] = { ...newArr[i], isright: false };
      }
      newArr[index] = { ...newArr[index], isright: true };
      setAnswers(newArr);
    }
  };

  const changeQuestionText = (e) => {
    setQuestionText(e.target.value);
  };
  const changeQuestionImg = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedImageQuestion(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      const urlImg = e.target.files[0];
      setImageQuestion(urlImg);
    }
  };

  const _addQuestion = async () => {
    const result = answers.filter((answer) => answer.isright);
    if (answers.length === 0) {
      setError("Điền đầy đủ thông tin rồi submit");
      return;
    } else if (result.length == 0) {
      setError("Chọn đáp án đúng");
      return;
    } else {
      for (let i = 0; i < answers.length; i++) {
        if (questionText === "" || answers[i].answer_content === "") {
          setError("Điền đầy đủ thông tin rồi submit");
          return;
        }
      }
    }
    formData.append("question_type", parseInt(type));
    formData.append("question_content", questionText);
    for (let i = 0; i < answers.length; i++) {
      formData.append(`answerDTOS[${i}].isright`, answers[i].isright);
      formData.append(
        `answerDTOS[${i}].answer_content`,
        answers[i].answer_content
      );
    }
    if (!!imageQuestion === true) {
      formData.append("file", imageQuestion);
    }
    formData.append("examDto.id", parseInt(idExam));
    formData.append("mark", 10);
    try {
      await addQuestion(formData);
      navigate(`/question/${idExam}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <Link className="text-sm text-blue-500" to={`/question/${idExam}`}>
            Back
          </Link>
          <div className="mb-4">
            <div className="flex justify-center">
              <h1 className="text-xl font-bold text-grey-darkest">
                Add question
              </h1>
            </div>
            <select
              className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="1" key="1">
                Single choice{" "}
              </option>
              <option value="2" key="2">
                Multiple choice
              </option>
              <option value="3  " key="3">
                Single select
              </option>
            </select>
            <div className="mt-4 ">
              <input
                name="text"
                onChange={(event) => changeQuestionText(event)}
                className="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                placeholder="add question"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {selectedImageQuestion.length > 0 && (
                <img
                  src={selectedImageQuestion}
                  alt=""
                  id="img"
                  className="img"
                />
              )}
            </div>
            <div className="flex mt-4">
              <input
                type="file"
                name="file"
                id="file"
                onChange={changeQuestionImg}
                className="hidden w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                placeholder="Add Todo"
              />
              <label
                htmlFor="file"
                className="flex items-center justify-center h-10 text-white bg-indigo-600 rounded-lg cursor-pointer w-36"
              >
                <i className="material-icons ">add file</i>
              </label>
            </div>
          </div>
          <div>
            {answers.map((item, index) => (
              <div key={index}>
                <input
                  className="w-full px-3 py-2 mb-4 mr-4 border rounded shadow appearance-none text-grey-darker"
                  placeholder={`Answer${index + 1}`}
                  onChange={updateAnswerChanged(index)}
                />
                <div className="flex items-center justify-start ">
                  <input
                    type={type == 1 ? "radio" : "checkbox"}
                    name={type == 1 ? "radioQuestion" : `check-${index}`}
                    onChange={changeAnswer(index, item.isright)}
                    checked={item.isright}
                    className="w-5 h-5 text-green-600 form-checkbox"
                  />
                  True
                </div>
              </div>
            ))}

            <div>
              <button
                className="h-10 mb-2 text-white bg-indigo-600 rounded-lg w-36"
                onClick={() =>
                  setAnswers([
                    ...answers,
                    { answer_content: "", isright: false },
                  ])
                }
              >
                Next question
              </button>
            </div>
            <div className="text-xl font-bold text-red-500">{error}</div>
            <div className="flex justify-center ">
              <button
                onClick={_addQuestion}
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:w-60 w-44 mr-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
