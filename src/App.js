import * as React from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./page/Home/Home";
import Category from "./page/Category/Category";
import Add from "./page/Add/Add";
import Edit from "./page/Edit/Edit";

function App() {
    return (
        <div className="App">
            <div className="container mx-auto">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/add" element = {<Add />}/>
                        <Route path = "/edit" element = {<Edit/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App