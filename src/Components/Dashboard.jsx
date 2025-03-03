import React, {useEffect, useState} from 'react'
import { Icon } from '@iconify/react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Local
import DashboardComponent from './DashboardComponent'
import BookingComponent from "./BookingComponent.jsx";
import FacilityComponent from "./FacilityComponent.jsx";
import TransactionComponent from "./TransactionComponent.jsx";
import FacilityDetails from "./FacilityDetails.jsx";


export default function Dashboard() {
    const [ isDashboardOpen, setIsDashboardOpen] = useState(true)
    const [ isBookingOpen, setIsBookingOpen] = useState(false)
    const [ isFacilityOpen, setIsFacilityOpen] = useState(false)
    const [ isTransactionOpen, setIsTransactionOpen] = useState(false)
    const [ isFacility, setIsFacility ] = useState(false);
    const [ stadiumSelect, setStadiumSelect ] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            // console.log(token)
            const decoded = jwtDecode(token);
            // console.log(decoded.exp);
            const currentTime = Date.now() / 1000
            // console.log(currentTime)
            // console.log("Current Time (Local):", new Date().toLocaleString());
            // const expDate = new Date(decoded.exp * 1000);  // Convert UNIX timestamp to Date
            // console.log("EXP Time (Local):", expDate.toLocaleString());
            if(decoded.exp < currentTime){
                localStorage.removeItem("token");
                navigate("/login");
            }
        }else{
            navigate("/login");
        }

        if (isFacility) {
            setIsFacilityOpen(false);
            // console.log(stadiumSelect)
        }

    })


    const handleNavClick = (event, param) => {
        event.preventDefault()

        if(param == "Dashboard"){
            setIsDashboardOpen(true)
            setIsFacilityOpen(false)
            setIsBookingOpen(false)
            setIsTransactionOpen(false)
            setIsFacility(false)
        }
        else if (param == "Booking"){
            setIsDashboardOpen(false)
            setIsFacilityOpen(false)
            setIsBookingOpen(true)
            setIsTransactionOpen(false)
            setIsFacility(false)
        }
        else if (param == "Facility"){
            setIsDashboardOpen(false)
            setIsFacilityOpen(true)
            setIsBookingOpen(false)
            setIsTransactionOpen(false)
            setIsFacility(false)
        }
        else if (param == "Transaction"){
            setIsDashboardOpen(false)
            setIsFacilityOpen(false)
            setIsBookingOpen(false)
            setIsTransactionOpen(true)
            setIsFacility(false)
            console.log("Transaction")
        }
        else if(isFacility){
            setIsFacilityOpen(false);
        }
    }

    // setIsFacility(true)
    // console.log(isFacility, "From Dashboard");


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
                        <button onClick={event => handleNavClick(event, "Facility")} className={`rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white ${isFacilityOpen === true || isFacility === true ? "bg-black text-white"  : "bg-white text-black"}`}>
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
                {isFacilityOpen && <FacilityComponent setIsFacility={setIsFacility} setStadiumSelect={setStadiumSelect}/>}
                {isTransactionOpen && <TransactionComponent/>}
                {isFacility && <FacilityDetails stadiumSelect={stadiumSelect}/>}
            </div>
        </div>
    )
}