import {Navigate} from "react-router-dom";


export default function protectedRoute({child}) {
    const token = localStorage.getItem("token");


    if(!token) {
        return <Navigate to="/login" replace />
    }

    return child


}