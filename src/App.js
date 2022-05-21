import * as React from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Home from "./page/Home/Home";
import AddExam from "./page/Home/AddExam";
import EditExam from "./page/Home/EditExam";
import Add from "./page/Question/Add";
import Edit from "./page/Question/Edit";
import Question from "./page/Question/Question";
import Login from './page/Auth/Login';
function App() {
    return (
        <div className="App">
            <div className="container mx-auto">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/add-exam" element={<AddExam/>}/>
                        <Route path="/edit-exam/:id" element={<EditExam/>}/>
                        <Route path="/question/:id" element={<Question/>}/>
                        <Route path="/add-question/:idExam" element = {<Add />}/>
                        <Route path = "/edit-question/:idExam/:idQuestion" element = {<Edit/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App