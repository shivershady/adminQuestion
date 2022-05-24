import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delExam, getAllExam } from "../../services/examService";
import { useNavigate } from "react-router";
function Home(props) {
  const [showQuestion, setShowQuestion] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();
  const getExam = async () => {
    try {
      const rep = await getAllExam();
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
      getExam();
      alert("Xoá thành công");
    } catch (error) {
      console.log();
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 md:mx-10 ">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center md:order-2">
            {user && (
              <button className="mr-2 hover:text-violet-700" onClick={logout}>
                Logout
              </button>
            )}
            <div className="mr-3">
              {user ? (
                user
              ) : (
                <Link to="/login">
                  {" "}
                  <button>Login</button>{" "}
                </Link>
              )}{" "}
            </div>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://daotaonoibo.vn/wp-content/uploads/elementor/thumbs/icon-user-1-oyx1kegfbiykagz2yacgmv71c7xjmassz5tvm0se2e.png"
                alt="user photo"
              />
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>

      <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="mb-4 text-center md:flex md:justify-between">
            <h1 className="text-xl font-bold text-grey-darkest">
              List of exam questions
            </h1>
            <Link to="/add-exam">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add Exam
              </button>
            </Link>
          </div>
          <div>
            {(showQuestion || []).map((item, index) => {
              return (
                <div
                  className="flex-wrap items-center mb-4 md:flex md:justify-between"
                  key={index}
                >
                  {/* {item.exam_name}  */}
                  <div className="flex justify-center mb-2 text-lg font-bold">
                    {item.exam_name}{" "}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => deleteNote(item.id, index)}
                      class="text-white bg-red-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                    >
                      Remove
                    </button>
                    <Link to={`/edit-exam/${item.id}`}>
                      <button class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3">
                        Edit
                      </button>
                    </Link>

                    <button class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3">
                      <Link to={`/question/${item.id}`}>Details</Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
