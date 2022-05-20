import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../services/questionService";

const Edit = () => {
  const { idQuestion } = useParams();
  const [question, setQuestion] = useState({});
  console.log(question);

  useEffect(() => {
    _getQuestion();
  }, []);

  const _getQuestion = async () => {
    try {
      const rep = await getQuestion(idQuestion);
      setQuestion(rep.data);
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
              <h1 className="text-grey-darkest">Chỉnh sửa câu hỏi</h1>
              <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
                Edit
              </button>
            </div>

            <select
              className="w-48"
              value={question.question_type}
              onChange={(e) =>
                setQuestion({ ...question, question_type: e.target.value })
              }
            >
              <option value="1" key="1">
                Single choice{" "}
              </option>
              <option value="2" key="2">
                Multiple choice
              </option>
              <option value="3  " key="3">
                Single select
              </option>
            </select>
            <div className=" mt-4">
              <h1>Câu hỏi</h1>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="thêm câu hỏi"
                value={question.question_content}
                onChange={(e)=>setQuestion({...question,question_content:e.target.value})}
              />
            </div>
            <div className="flex mt-4">
              <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />
            </div>
          </div>
          <div>
            <h1>Câu trả lời</h1>
            {(question.answerDTOS || []).map((item, index) => (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 mr-4 text-grey-darker"
                placeholder={index + 1}
                value={item.answer_content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
