import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addQuestion } from "../../services/questionService";

const Add = () => {
  const { idExam } = useParams();
  const [answers, setAnswers] = useState([]);
  const [type, setType] = useState(1);
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
      examDto: { id: parseInt(idExam) },
      mark: 10,
    });
  };
  return (
    <div>
      <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <div className="flex justify-center">
              <h1 className="text-grey-darkest font-bold text-xl">Add question</h1>
            </div>
            <select className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setType(e.target.value)}>
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
                onChange={changeQuestion}
                className="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                placeholder="add question"
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
                className="flex items-center justify-center  cursor-pointer h-10 text-white bg-indigo-600 rounded-lg w-36"
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
                  placeholder= {`Answer${index+1}` }
                  onChange={updateAnswerChanged(index)}
                />
                <div  className="flex justify-start mb-2 items-center">
                  <input
                    type="radio"
                    name={`check-${index}`}
                    onChange={changeAnswer(index)}
                    value="true"
                    className="form-checkbox h-5 w-5 text-green-600"
                  />
                  true
                  <input
                    type="radio"
                    name={`check-${index}`}
                    onChange={changeAnswer(index)}
                    value=""
                    className="form-checkbox h-5 w-5 text-red-600"
                  />
                  false
                </div>
              </div>
            ))}

           <div>
           <button
              className="h-10 mb-2 text-white bg-indigo-600 rounded-lg w-36"
              onClick={() =>
                setAnswers([...answers, { answer_content: "", isright: false }])
              }
            >
              Next question
            </button>
          </div>
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
