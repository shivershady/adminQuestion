import * as React from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./page/Home/Home";
import AddQuestion from "./page/AddQuestion";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className="container mx-auto">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/add" element={ <AddQuestion/> }/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App