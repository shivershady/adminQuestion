import React, { useState, useEffect } from "react";
import { addExam } from "../../services/examService";
import {Link, useNavigate} from "react-router-dom";

const AddExam = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    exam_name: "",
    time_limit: 0,
    error : ''
  });
  const { exam_name, time_limit , error } = data;

  const changeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const addNewExam = async () => {
    if(exam_name == ''|| !parseInt(time_limit) >=0){
      setData({...data,error: "Điền đầy đủ thông tin & time khác 0"});
      return
    }
    setData({...data,error: ''});
    try {
      const rep = await addExam(data);
      console.log(rep)
      alert("Thêm thành công");
      setData({
        exam_name: "",
        time_limit: 0,
      });
      navigate('/');
    } catch (error) {
      setData({...data,error:error});
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
          <Link className='text-sm text-blue-500' to={'/'}>Back</Link>
            <div className="mt-4 ">
              <h1 className="text-lg font-semibold">Exam name</h1>
              <input
                name="exam_name"
                value={exam_name}
                onChange={changeInput}
                className="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                placeholder="exam name"
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Time</h1>
            <input
              type="number"
              name="time_limit"
              value={time_limit}
              onChange={changeInput}
              className="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
              placeholder="thêm thời gian"
            />
          </div>
          <div className="w-full text-xl font-bold text-center text-red-500">{error}</div>
          <div className="flex justify-center mt-4">
         <button
            onClick={() => addNewExam()}
            className="p-2 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg w-44 focus:ring-4 focus:ring-blue-300 focus:outline-none"
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
