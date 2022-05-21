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

  const deleteNote = async (id) => {
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-grey-darkest">Question list</h1>
          <Link to={`/add-question/${id}`}>
            <button class="text-white bg-blue-700 w-28 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3" >
              Add
            </button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (
              <div className="flex items-center justify-between mb-4" key={index}>
               <div>
               <Link to={`/edit-question/${id}/${item.id}`}>
                  <p className="w-full text-grey-darkest">{item.question_content}</p>
                </Link>
               </div>

               <div>
               <button
                  onClick={() => deleteNote(item.id)}
                  className="p-1 ml-2 border-2 rounded  flex-no-shrink text-red border-red hover:text-white hover:bg-red-500"
                >
                  Remove
                </button>
               </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Question;
