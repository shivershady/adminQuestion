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
        <div className="mb-4 md:flex md:justify-between text-center">
          <h1 className="text-grey-darkest font-bold  text-xl">List of exam questions</h1>
          <Link to="/add-exam">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Exam</button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (
              <div className="flex mb-4 justify-between  items-center" key={index}>
                
                {/* {item.exam_name}  */}
               <div>
               <p className="text-lg font-bold ">{item.exam_name} </p>
               </div>
                
                <div>

                <button
                  onClick={() => deleteNote(item.id, index)}
                  class="text-white bg-red-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                >
                  Remove
                </button>
                <Link to={`/edit-exam/${item.id}`}>
                <button
          
                  class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                >
                  Edit
                </button>
                </Link>

                <button
                  class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                >
                    <Link to={`/question/${item.id}`}>Details</Link>
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

export default Home;
