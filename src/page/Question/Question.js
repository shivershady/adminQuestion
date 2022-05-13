import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllQuestions , deleteQuestion } from "../../services/questionService";

function Question(props) {
  const { id } = useParams();
  const [showQuestion, setShowQuestion] = useState([]);

  const getQuestion = async () => {
    try {
      const rep = await getAllQuestions(id);
      setShowQuestion(rep.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const deleteNote = async (id, index) => {
    try {
      await deleteQuestion(id);
      getQuestion();
      alert("Xoá thành công");
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 flex justify-between">
          <h1 className="text-grey-darkest">Danh sách Câu hỏi</h1>
          <Link to={`/add-question/${id}`}>
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
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
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                  <Link to={`/question`}>Thông tin chi tiết</Link>
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
