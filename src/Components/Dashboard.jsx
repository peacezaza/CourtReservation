import React, {useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Local
import DashboardComponent from './DashboardComponent'
import BookingComponent from "./BookingComponent.jsx";
import FacilityComponent from "./FacilityComponent.jsx";
import TransactionComponent from "./TransactionComponent.jsx";


export default function Dashboard() {
    const [isDashboardOpen, setIsDashboardOpen] = useState(true)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [isFacilityOpen, setIsFacilityOpen] = useState(false)
    const [isTransactionOpen, setIsTransactionOpen] = useState(false)

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

        if(param == "Dashboard"){
            setIsDashboardOpen(true)
            setIsFacilityOpen(false)
            setIsBookingOpen(false)
            setIsTransactionOpen(false)
        }
        else if (param == "Booking"){
            setIsDashboardOpen(false)
            setIsFacilityOpen(false)
            setIsBookingOpen(true)
            setIsTransactionOpen(false)
        }
        else if (param == "Facility"){
            setIsDashboardOpen(false)
            setIsFacilityOpen(true)
            setIsBookingOpen(false)
            setIsTransactionOpen(false)
        }
        else if (param == "Transaction"){
            setIsDashboardOpen(false)
            setIsFacilityOpen(false)
            setIsBookingOpen(false)
            setIsTransactionOpen(true)
            console.log("Transaction")
        }
    }


    return (
        <div className="flex flex-row h-screen">
            {/* Left Side*/}
            <div className="w-[15%]">
                <div className="flex flex-col justify-start items-center  space-y-5">
                    <img src="/logo.png" alt="logo" className="w-[25%] h-[10%]"/>
                    <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "Dashboard")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600  hover:bg-black hover:text-white ${isDashboardOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            <img src="/homeBlack.png" alt="home" className="w-10 h-10"/>
                            <p className="text-xl">Dashboard</p>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "Booking")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white ${isBookingOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            <img src="/booking.png" alt="booking" className="w-10 h-10"/>
                            <p className="text-xl">Booking</p>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "Facility")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white ${isFacilityOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            {/*<img src="/facility.png" alt="facility" className="w-10 h-10" />*/}
                            <Icon icon="guidance:stadium" style={{ width : '34px' , height : '36px'}} />
                            <p className="text-xl">Facilities</p>
                        </button>
                    </div>

                    <div className="w-full flex justify-center">
                        <button onClick={event => handleNavClick(event, "Transaction")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white ${isTransactionOpen === true ? "bg-black text-white"  : "bg-white text-black"}`}>
                            {/*<img src="/transaction.png" alt="Transaction" className="w-10 h-10"/>*/}
                            <Icon icon="icon-park-solid:transaction" style={{ fontSize: '36px' }}/>
                            <p className="text-xl">Transaction</p>
                        </button>
                    </div>

                </div>
            </div>
            {/*Right Side*/}
            <div className="w-[85%]">
                {isDashboardOpen &&<DashboardComponent/>}
                {isBookingOpen && <BookingComponent/>}
                {isFacilityOpen && <FacilityComponent/>}
                {isTransactionOpen && <TransactionComponent/>}
            </div>
        </div>
    )
}