import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { questionService } from "../../services/questionService";

function Home(props) {
  const [showQuestion, setShowQuestion] = useState([]);

  useEffect(() => {
    try {
      questionService.getQuestions();
    } catch (e) {
      console.log(e);
    }
    setShowQuestion();
  }, []);
  const deleteNote = async (uid, id) => {
    await questionService.deleteQuestion(uid, id);
  };
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 flex justify-between">
          <h1 className="text-grey-darkest">Danh sách câu hỏi</h1>
          <Link to="/add">
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (
              <div className="flex mb-4 items-center" key={index}>
                <Link to={``}>
                  <p className="w-full text-grey-darkest">
                    Add another component to Tailwind Components
                  </p>
                </Link>
                <button
                  onClick={() => deleteNote(item.uid, item.id)}
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

export default Home;
