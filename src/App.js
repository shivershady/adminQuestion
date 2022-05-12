import * as React from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./page/Home/Home";
import Category from "./page/Category/Category";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className="container mx-auto">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/category" element={<Category/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App