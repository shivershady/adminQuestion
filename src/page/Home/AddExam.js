import React, { useState, useEffect } from "react";
import { addExam } from "../../services/examService";

const AddExam = () => {
  const [data, setData] = useState({
    exam_name: "",
    time_limit: 0,
  });
  const { exam_name, time_limit } = data;

  const changeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addNewExam = async () => {
    try {
      const rep = await addExam(data);
      alert("Thêm thành công");
      setData({
        exam_name: "",
        time_limit: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <div className="flex justify-between">
            </div>
            <div className=" mt-4">
              <h1 className="font-semibold text-lg">Exam name</h1>
              <input
                name="exam_name"
                value={exam_name}
                onChange={changeInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="exam name"
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-lg">Time</h1>
            <input
              type="number"
              name="time_limit"
              value={time_limit}
              onChange={changeInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="thêm thời gian"
            />
          </div>
         <div className="flex justify-center mt-4">
         <button
            onClick={() => addNewExam()}
            class="text-white bg-blue-700 w-44 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
          >
            Add exam
          </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default AddExam;
