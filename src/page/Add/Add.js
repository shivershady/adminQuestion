import React from "react";

const Add = () => {
  return (
    <div>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
              <div className = "flex justify-between">
              <h1 className="text-grey-darkest">Thêm câu hỏi</h1>
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Add
            </button>
              </div>
            
            <select className="w-48">
              <option>...</option>
              <option>Single choice </option>
              <option>Multiple choice</option>
              <option>Single select</option>
            </select>
            <div className=" mt-4">
              <h1>Câu hỏi</h1>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="thêm câu hỏi"
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
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 mr-4 text-grey-darker"
              placeholder="1"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 mr-4 text-grey-darker"
              placeholder="2"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 mr-4 text-grey-darker"
              placeholder="3"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 mr-4 text-grey-darker"
              placeholder="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
