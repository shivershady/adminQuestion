import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delExam, getAllExam } from "../../services/examService";

function Home(props) {
  const [showQuestion, setShowQuestion] = useState([]);

  const getExam = async () => {
    try {
      const rep = await getAllExam();
      console.log(rep.data);
      setShowQuestion(rep.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  const deleteNote = async (id, index) => {
    try {
      await delExam(id);
      getExam()
      alert("Xoá thành công");
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 flex justify-between">
          <h1 className="text-grey-darkest">Danh sách Exam</h1>
          <Link to="/add-exam">
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (
              <div className="flex mb-4 items-center" key={index}>
                <Link to={`/edit-exam/${item.id}`}>
                  <p className="w-full text-grey-darkest">{item.exam_name}</p>
                </Link>
                <button
                  onClick={() => deleteNote(item.id, index)}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                >
                  Remove
                </button>
                <button
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                >
                    <Link to={`/question/${item.id}`}>Thông tin chi tiết</Link>
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
