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

  const updateFieldChanged = (index) => (e) => {
    let newArr = [...answers];
    newArr[index] = { ...newArr[index], content: e.target.value };
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
            className="w-40 h-40 object-cover shadow"
            type="img"
            src={file}
            key={file}
          />
          <div
            className="fas fa-times w-4 h-4 absolute z-10 top-2 right-2  rounded-full text-center flex items-center justify-center cursor-pointer opacity-30 bg-red-500 hover:opacity-100 hover:bg-gray-200 text-2xl"
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
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
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
            <div className=" mt-4">
              <h1>Câu hỏi</h1>
              <input
                name="text"
                onChange={changeQuestion}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker hidden"
                placeholder="Add Todo"
              />
              <label
                htmlFor="file"
                className="flex justify-center items-center bg-indigo-600 text-white w-36 h-10 rounded-lg"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 mr-4 text-grey-darker"
                  placeholder={index + 1}
                  onChange={updateFieldChanged(index)}
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
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              onClick={() =>
                setAnswers([...answers, { content: "", isright: false }])
              }
            >
              Thêm đáp án
            </button>
          </div>
          <button
            onClick={_addQuestion}
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal w-full"
          >
            Thêm Câu hỏi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
