import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, createBrowserRouter, RouterProvider, Routes} from "react-router-dom";
import './index.css'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import HomePage from './Components/HomePage.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: (<HomePage/>),
    },
    {
        path: "login",
        element: (<Login/>),
    },
    {
        path: "signup",
        element: (<Signup/>),
    }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

