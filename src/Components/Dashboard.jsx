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
import Schedule from "./Schedule.jsx";


export default function Dashboard() {
    const [ isDashboardOpen, setIsDashboardOpen] = useState(true)
    const [ isBookingOpen, setIsBookingOpen] = useState(false)
    const [ isFacilityOpen, setIsFacilityOpen] = useState(false)
    const [ isTransactionOpen, setIsTransactionOpen] = useState(false)
    const [ isFacility, setIsFacility ] = useState(false);
    const [ stadiumSelect, setStadiumSelect ] = useState();
    const [ isSchedule, setSchedule ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }

        // console.log("isSchedule before updates:", isSchedule);
        // console.log(isFacility)
        if (isFacility) {
            setIsFacilityOpen(false);
            setIsDashboardOpen(false);
            setIsBookingOpen(false);
            // setSchedule(false);
        }
        if (isSchedule) {
            setIsFacilityOpen(false);
            setIsDashboardOpen(false);
            setIsBookingOpen(false);
            setIsFacility(false);
        }

        console.log("isSchedule after updates:", isSchedule);
        console.log("Facility Detail is: ", isFacility)

    }); // ✅ Now it runs ONLY when these states change



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
            setSchedule(false)
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
            setIsDashboardOpen(false)
            setIsFacilityOpen(false)
            setIsBookingOpen(false)
        }else if(isSchedule){
            setIsFacilityOpen(false);
            setIsDashboardOpen(false)
            setIsFacilityOpen(false)
            setIsBookingOpen(false)
        }

    }

    // setIsFacility(true)
    // console.log(isFacility, "From Dashboard");


    return (
        <div className="flex flex-row h-screen">
            {/* Left Side*/}
            <div className="w-[15%] min-w-[180px] lg:w-[12%] xl:w-[15%]">
                <div className="grid grid-cols-1 gap-3 lg:gap-5 justify-items-center">
                    <img src="/logo.png" alt="logo" className="w-[25%] lg:w-[25%] xl:w-[25%] my-2"/>

                    <div className="w-full grid justify-items-center">
                        <button
                            onClick={event => handleNavClick(event, "Dashboard")}
                            className={`rounded-xl py-1 lg:py-2 grid grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center w-[85%] lg:w-[80%] xl:w-[70%] text-gray-600 hover:bg-black hover:text-white ${isDashboardOpen === true ? "bg-black text-white" : "bg-white text-black"}`}
                        >
                            <img src="/homeBlack.png" alt="home" className="w-8 h-8 lg:w-10 lg:h-10 ml-2"/>
                            <p className="text-base lg:text-xl">Dashboard</p>
                        </button>
                    </div>

                    <div className="w-full grid justify-items-center">
                        <button
                            onClick={event => handleNavClick(event, "Booking")}
                            className={`rounded-xl py-1 lg:py-2 grid grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center w-[85%] lg:w-[80%] xl:w-[70%] text-gray-600 hover:bg-black hover:text-white ${isBookingOpen === true ? "bg-black text-white" : "bg-white text-black"}`}
                        >
                            <img src="/booking.png" alt="booking" className="w-8 h-8 lg:w-10 lg:h-10 ml-2"/>
                            <p className="text-base lg:text-xl">Booking</p>
                        </button>
                    </div>

                    <div className="w-full grid justify-items-center">
                        <button
                            onClick={event => handleNavClick(event, "Facility")}
                            className={`rounded-xl py-1 lg:py-2 grid grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center w-[85%] lg:w-[80%] xl:w-[70%] text-gray-600 hover:bg-black hover:text-white ${isFacilityOpen === true || isFacility === true ? "bg-black text-white" : "bg-white text-black"}`}
                        >
                            <Icon icon="guidance:stadium" className="w-8 h-8 lg:w-9 lg:h-9 ml-2"/>
                            <p className="text-base lg:text-xl">Facilities</p>
                        </button>
                    </div>

                    <div className="w-full grid justify-items-center">
                        <button
                            onClick={event => handleNavClick(event, "Transaction")}
                            className={`rounded-xl py-1 lg:py-2 grid grid-cols-[auto_1fr] gap-2 lg:gap-4 items-center w-[85%] lg:w-[80%] xl:w-[70%] text-gray-600 hover:bg-black hover:text-white ${isTransactionOpen === true ? "bg-black text-white" : "bg-white text-black"}`}
                        >
                            <Icon icon="icon-park-solid:transaction" className="w-8 h-8 lg:w-9 lg:h-9 ml-2"/>
                            <p className="text-base lg:text-xl">Transaction</p>
                        </button>
                    </div>
                </div>
            </div>
            {/*Right Side*/}
            <div className="w-[85%]">
                {isDashboardOpen && <DashboardComponent setIsFacility={setIsFacility}/>}
                {isBookingOpen && <BookingComponent setIsFacility={setIsFacility}/>}
                {isFacilityOpen &&
                    <FacilityComponent setIsFacility={setIsFacility} setStadiumSelect={setStadiumSelect}/>}
                {isTransactionOpen && <TransactionComponent/>}
                {isFacility && <FacilityDetails stadiumSelect={stadiumSelect} setSchedule={setSchedule}/>}
                {isSchedule && <Schedule />}
            </div>
        </div>
    )
}