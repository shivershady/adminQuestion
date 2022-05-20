import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addQuestion } from "../../services/questionService";

const Add = () => {
  const { idExam } = useParams();
  const [answers, setAnswers] = useState([]);
  const [type, setType] = useState(0);
  const [file_name, setFile_name] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [questionText, setQuestionText] = useState("");

  const updateAnswerChanged = (index) => (e) => {
    let newArr = [...answers];
    newArr[index] = { ...newArr[index], answer_content: e.target.value };
    setAnswers(newArr);
  };
  const changeAnswer = (index) => (e) => {
    let newArr = [...answers];
    newArr[index] = { ...newArr[index], isright: !!e.target.value };
    setAnswers(newArr);
  };

  const changeQuestion = (e) => {
    if (e.target.value) {
      setQuestionText(e.target.value);
    }
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      const file_names = Array.from(e.target.files).map((file) => file);
      setFile_name([...file_name, ...file_names]);
    }
  };

  const renderPhotos = (source) => {
    return source.map((file, index) => {
      return (
        <div className="relative mx-auto" key={index}>
          <img
            className="object-cover w-40 h-40 shadow"
            type="img"
            src={file}
            key={file}
          />
          <div
            className="absolute z-10 flex items-center justify-center w-4 h-4 text-2xl text-center bg-red-500 rounded-full cursor-pointer fas fa-times top-2 right-2 opacity-30 hover:opacity-100 hover:bg-gray-200"
            onClick={removeSelectedImage.bind(this, index)}
          >
            X
          </div>
        </div>
      );
    });
  };

  const removeSelectedImage = (index) => {
    const arr = [...selectedFiles];
    arr.splice(index, 1);
    setSelectedFiles(arr);
    const arr2 = [...file_name];
    arr2.splice(index, 1);
    setFile_name(arr2);
  };

  const _addQuestion = () => {
    addQuestion({
      question_type: parseInt(type),
      question_content: questionText,
      answerDTOS: answers,
      examDto: { id: parseInt(idExam)},
      mark: 10,
    });
  };
  return (
    <div>
      <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <div className="flex justify-between">
              <h1 className="text-grey-darkest">Thêm câu hỏi</h1>
            </div>
            <select className="w-48" onChange={(e) => setType(e.target.value)}>
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
              <h1>Câu hỏi</h1>
              <input
                name="text"
                onChange={changeQuestion}
                className="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                placeholder="thêm câu hỏi"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {renderPhotos(selectedFiles)}
            </div>
            <div className="flex mt-4">
              <input
                type="file"
                name="file"
                id="file"
                onChange={changeQuestion}
                className="hidden w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                placeholder="Add Todo"
              />
              <label
                htmlFor="file"
                className="flex items-center justify-center h-10 text-white bg-indigo-600 rounded-lg w-36"
              >
                <i className="material-icons">Thêm file</i>
              </label>
            </div>
          </div>
          <div>
            <h1>Câu trả lời</h1>
            {answers.map((item, index) => (
              <div key={index}>
                <input
                  className="w-full px-3 py-2 mb-4 mr-4 border rounded shadow appearance-none text-grey-darker"
                  placeholder={index + 1}
                  onChange={updateAnswerChanged(index)}
                />
                <div>
                  <input
                    type="radio"
                    name={`check-${index}`}
                    onChange={changeAnswer(index)}
                    value="true"
                  />
                  Đúng
                  <input
                    type="radio"
                    name={`check-${index}`}
                    onChange={changeAnswer(index)}
                    value="" 
                  />
                  Sai
                </div>
              </div>
            ))}
            <button
              className="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal"
              onClick={() =>
                setAnswers([...answers, { answer_content: "", isright: false }])
              }
            >
              Thêm đáp án
            </button>
          </div>
          <button
            onClick={_addQuestion}
            className="w-full p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal"
          >
            Thêm Câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
