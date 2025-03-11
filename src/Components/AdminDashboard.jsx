import React, {useEffect, useState} from 'react'

import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Local
import AdminDashboardComponent from './AdminDashboardComponent';
import AdminSearchTransaction from "./AdminSearchTransaction";
// import AdminVerifyStadium from "./AdminVerifyStadium";


export default function Admin_Dashboard() {
    const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(true)
    const [isAdminSearchTransactionOpen, setIsAdminSearchTransaction] = useState(false)
    // const [isAdminVerifyStadiumOpen, setIsAdminVerifyStadium] = useState(false)

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })

        };
    };




    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000
            if(decoded.exp < currentTime){
                localStorage.removeItem("token");
                navigate("/login");
            }
        }else{
            navigate("/login");
        }

    })


    const handleNavClick = (event, param) => {
        event.preventDefault()

        if(param == "AdminDashboard"){
            setIsAdminDashboardOpen(true)
            setIsAdminSearchTransaction(false)
            // setIsAdminVerifyStadium(false)
        }
        else if (param == "Transaction"){
            setIsAdminDashboardOpen(false)
            setIsAdminSearchTransaction(true)
            // setIsAdminVerifyStadium(false)

        }
        // else if (param == "Verify"){
        //     setIsAdminDashboardOpen(false)
        //     setIsAdminSearchTransaction(false)
        //     setIsAdminVerifyStadium(true)

        // }

    }


    return (

        <div className="flex flex-row h-screen">

            {/* Left Side*/}
            <div className="w-[15%]">
                <div className="flex flex-col justify-start items-center  space-y-5">
                    <img src="/logo.png" alt="logo" className="w-[25%] h-[10%]"/>



                    <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "AdminDashboard")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600  hover:bg-black hover:text-white ${isAdminDashboardOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            <img src="/exchange.png" alt="home" className="w-11 h-10"/>
                            <p className="text-xl">Exchange</p>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "Transaction")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white ${isAdminSearchTransactionOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            <img src="/transaction.png" alt="booking" className="w-10 h-10"/>
                            <p className="text-xl">Transaction</p>
                        </button>
                    </div>

                    {/* <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "Verify")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white ${isAdminVerifyStadiumOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            <img src="/booking.png" alt="booking" className="w-10 h-10"/>
                            <p className="text-xl">Verify</p>
                        </button>
                    </div> */}





                </div>
            </div>
            {/*Right Side*/}
            <div className="w-[85%]">
                {isAdminDashboardOpen &&<AdminDashboardComponent/>}
                {isAdminSearchTransactionOpen && <AdminSearchTransaction/>}
                {/* {isAdminVerifyStadiumOpen && <AdminVerifyStadium/>} */}

            </div>
        </div>
    )
}