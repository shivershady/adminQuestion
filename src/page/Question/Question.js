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
    <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-grey-darkest">Danh sách Câu hỏi</h1>
          <Link to={`/add-question/${id}`}>
            <button className="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (
              <div className="flex items-center mb-4" key={index}>
                <Link to={`/edit-question/${id}/${item.id}`}>
                  <p className="w-full text-grey-darkest">{item.question_content}</p>
                </Link>
                <button
                  onClick={() => deleteNote(item.id, index)}
                  className="p-2 ml-2 border-2 rounded flex-no-shrink text-red border-red hover:text-white hover:bg-red"
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
