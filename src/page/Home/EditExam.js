import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getExam , editExam } from '../../services/examService';

const EditExam = () => {
    const {id}= useParams();
    const [data, setData] = useState({
        exam_name: "",
        time_limit: 0,
      });
      const { exam_name, time_limit } = data;

    useEffect(() => {
        getExamById()
    }, []);
    const getExamById = async ()=>{
        try {
          const rep = await getExam(id)
          setData(rep.data)
        } catch (error) {
            console.log(error);
        }
    }

    const changeInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };

      const editNewExam = async () => {
        try {
          const rep = await editExam({
              id,
              exam_name,
              time_limit
          });
          alert("Sửa thành công");
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
              <h1 className="text-grey-darkest">Sửa Exam</h1>
            </div>
            <div className=" mt-4">
              <h1>Tên Kỳ thi</h1>
              <input
                name="exam_name"
                value={exam_name}
                onChange={changeInput}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="thêm kì thi"
              />
            </div>
          </div>
          <div>
            <h1>Thời gian thi</h1>
            <input
              type="number"
              name="time_limit"
              value={time_limit}
              onChange={changeInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="thêm thời gian"
            />
          </div>
          <button
            onClick={() => editNewExam()}
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
          >
            Sửa
          </button>
        </div>
      </div>
    </div>
    );
};

export default EditExam;