import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login';
import Signup from '../pages/auth/signUp';
import Home from '../pages/home';
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/home' element={<Home />} />


            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;