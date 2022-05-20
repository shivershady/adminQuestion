import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllQuestions , deleteQuestion } from "../../services/questionService";

function Question(props) {
  const { id } = useParams();
  const [showQuestion, setShowQuestion] = useState([]);

  const getQuestions = async () => {
    try {
      const rep = await getAllQuestions(id);
      setShowQuestion(rep.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const deleteNote = async (id, index) => {
    try {
      await deleteQuestion(id);
      getQuestions();
      alert("Xoá thành công");
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-grey-darkest font-bold">Question list</h1>
          <Link to={`/add-question/${id}`}>
            <button class="text-white bg-blue-700 w-28 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3" >
              Add
            </button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (
              <div className="flex mb-4 items-center" key={index}>
                <Link to={`/edit-question/${item.id}`}>
                  <p className="w-full text-grey-darkest">{item.question_content}</p>
                </Link>
                <button
                  onClick={() => deleteNote(item.id, index)}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Question;
