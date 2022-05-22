    import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getAllQuestions, deleteQuestion} from "../../services/questionService";

function Question(props) {
    const {id} = useParams();
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
        console.log(id)
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
                        <button
                            className="text-white bg-blue-700 w-28 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3">
                            Add
                        </button>
                    </Link>
                </div>
                <div>
                    {(showQuestion || []).map((item, index) => {
                        return (
                            <div className="md:flex items-center md:justify-between mb-4" key={index}>
                               
                                <div className="flex flex-wrap justify-start items-center">
                                <div className="md:w-20 md:h-20 overflow-hidden w-44 h-20 ">
                               {item.image_url &&                       
                                <img className="w-full h-full rounded object-cover" src={process.env.REACT_APP_BASE_API+"/images/"+item.image_url} alt="photoQuestion"/>                        
                                }

                               </div>
                                  
                                   <div className=" md:ml-3 md:w-auto w-full text-center mt-2 mb-2 text-grey-darkest">
                                       {item.question_content}
                                   </div>
                                   
                                </div>

                                <div className="flex justify-center">
                                    <Link to={`/edit-question/${id}/${item.id}`}>
                                        <button
                                            className="p-1 ml-2 border-2 rounded  flex-no-shrink text-red border-red hover:text-white hover:bg-blue-500"
                                        >
                                            Edit
                                        </button>
                                    </Link>

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
