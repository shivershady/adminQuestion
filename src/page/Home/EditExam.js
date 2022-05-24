import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getExam, editExam} from '../../services/examService';

const EditExam = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        exam_name: "",
        time_limit: 0,
        error:''
    });
    const {exam_name, time_limit,error} = data;

    useEffect(() => {
        getExamById()
    }, []);

    const getExamById = async () => {
        try {
            const rep = await getExam(id)
            setData(rep.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const editNewExam = async () => {
        if(exam_name == ''||time_limit==0){
            setData({...data,error: "Điền đầy đủ thông tin & time khác 0"});
            return
        }
        setData({...data,error: ''});
        try {
            const rep = await editExam({
                id,
                exam_name,
                time_limit
            });
            alert("Sửa thành công");
            navigate('/')
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
                <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                <Link className='text-sm text-blue-500' to={'/'}>Back</Link>
                    <div className="mb-4">
                        <div className="text-center">
                            <h1 className="font-bold text-grey-darkest ">Edit exam</h1>
                        </div>
                        <div className="mt-4 ">
                            <input
                                name="exam_name"
                                value={exam_name}
                                onChange={changeInput}
                                className="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-darker"
                                placeholder="thêm kì thi"
                            />
                        </div>
                    </div>
                    <div>
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
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={() => editNewExam()}
                            className="p-2 ml-3 text-sm font-medium text-white bg-blue-700 rounded-lg w-44 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditExam;