
import { Icon } from "@iconify/react";
import Dropdown from "react-dropdown";
import { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment } from "react";
import CreateBookingOverlay from "./CreateBookingOverlay.jsx";


function StatusDropdown({ court, updateCourtStatus, setIsOpenOverlay, selectedPeriod}) {


    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700">
                    <Icon icon="mdi:dots-vertical" className="w-5 h-5" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="bg-grey-800 absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                    {court.Status === "available" && selectedPeriod &&  (
                        <>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-blue-500 text-white" : "text-blue-900"
                                        } group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => updateCourtStatus(court, "confirmed")}
                                    >
                                        Create Booking
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-yellow-500 text-white" : "text-gray-900"
                                        } group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => updateCourtStatus(court, "maintenance")}
                                    >
                                        Maintenance
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-gray-300" : "text-gray-900"} group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => setIsOpenOverlay(true)}>
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>

                        </>
                    )}
                    {court.Status === "confirmed" && selectedPeriod && (
                        <>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-red-500 text-white" : "text-gray-900"
                                        } group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => updateCourtStatus(court, "cancelled")}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-yellow-500 text-white" : "text-gray-900"
                                        } group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => updateCourtStatus(court, "maintenance")}
                                    >
                                        Maintenance
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-gray-300" : "text-gray-900"} group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => setIsOpenOverlay(true)}>
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                        </>
                    )}
                    {court.Status === "maintenance" && (
                        <>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-yellow-500 text-white" : "text-gray-900"
                                        } group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => updateCourtStatus(court, "available")}
                                    >
                                        available
                                    </button>
                                )}
                            </Menu.Item>
                        </>
                    )}
                    {court.Status === "available" && !selectedPeriod &&  (
                        <>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-yellow-500 text-white" : "text-gray-900"
                                        } group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => updateCourtStatus(court, "maintenance")}
                                    >
                                        Maintenance
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? "bg-gray-300" : "text-gray-900"} group flex w-full px-4 py-2 text-sm`}
                                        onClick={() => setIsOpenOverlay(true)}>
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>

                        </>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default function FacilityDetails({ stadiumSelect, setSchedule }) {

    const [isOpenOverlay, setIsOpenOverlay] = useState(false)
    const [point, setPoint] = useState(0)
    const [selectDate, setSelectDate] = useState(new Date());
    const [selectedStadium, setSelectedStadium] = useState(stadiumSelect?.name.toUpperCase() ?? 'ALL');
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const [periodOptions, setPeriodOptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [stadiumPeriods, setStadiumPeriods] = useState([]);
    const [courtsData, setCourtsData] = useState([]);
    const [stadiumOptions, setStadiumOptions] = useState([]);
    const [facilityOptions, setFacilityOptions] = useState([]);
    const [reservationData, setReservationData] = useState([])
    // const [updatedCour ts, setUpdatedCourts] = useState([]);
    const itemsPerPage = 9;

    const isDataFetched = useRef(false);
    useEffect(() => {
        if (!isDataFetched.current) {
            const token = localStorage.getItem("token");
            axios.get("http://localhost:3000/getCourtDetails", {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then((response) => {
                setStadiumPeriods(response.data.stadiumData || []);
                setCourtsData(response.data.stadiumCourtData || []);
                const filteredReservations = (response.data.reservationData || []).filter(
                    reservation => reservation.reservation_status !== 'cancelled'
                );
                setReservationData(filteredReservations);
                isDataFetched.current = true;
            }).catch((error) => {
                console.error("Error fetching stadium data:", error);
            });
        }
    }, []);  // Initial data fetching

    useEffect(() => {
        if (!selectedPeriod) {
            return;
        }

        // Fetch the data when selectedPeriod changes
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/getCourtDetails", {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            setStadiumPeriods(response.data.stadiumData || []);
            setCourtsData(response.data.stadiumCourtData || []);
            const filteredReservations = (response.data.reservationData || []).filter(
                reservation => reservation.reservation_status !== 'cancelled'
            );
            setReservationData(filteredReservations);
            console.log("query")
        }).catch((error) => {
            console.error("Error fetching stadium data:", error);
        });
    }, [selectedPeriod, selectDate, selectedStadium]);  // Dependency on selectedPeriod for triggering the API call

    useEffect(() => {
        setStadiumOptions([
            "ALL",
            ...new Set(courtsData.map(court => (court.stadium ?? '').toUpperCase()))
        ]);

        setFacilityOptions([
            "ALL",
            ...new Set(courtsData.map(court => (court.Facility_Type ?? '').toUpperCase()))
        ]);

        updatePeriodOptions(selectedStadium);
    }, [stadiumPeriods, selectedStadium, courtsData, selectedPeriod]);  // Watch for changes to stadiumPeriods, selectedStadium, courtsData, selectedPeriod


    let date = new Date();
    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    const updatePeriodOptions = (stadium) => {
        if (stadium.toUpperCase() === "ALL") {
            const allOpenTimes = stadiumPeriods.map(period => period.openHour);
            const allCloseTimes = stadiumPeriods.map(period => period.closeHour);
            if (allOpenTimes.length && allCloseTimes.length) {
                const earliestOpen = Math.min(...allOpenTimes.map(t => parseInt(t.split(":")[0])));
                const latestClose = Math.max(...allCloseTimes.map(t => parseInt(t.split(":")[0])));
                setPeriodOptions([...generateTimePeriods(earliestOpen, latestClose)]);
                // console.log(periodOptions)
            } else {
                setPeriodOptions([]);
            }
        } else {
            const matchingStadium = stadiumPeriods.find(period => period.stadium.toUpperCase() === stadium.toUpperCase());
            if (matchingStadium) {
                const openHour = parseInt(matchingStadium.openHour.split(":")[0]);
                const closeHour = parseInt(matchingStadium.closeHour.split(":")[0]);
                setPeriodOptions([...generateTimePeriods(openHour, closeHour)]);
                // console.log(periodOptions)
            } else {
                setPeriodOptions([]);
            }
        }
        // console.log(periodOptions)
    };


    const generateTimePeriods = (startHour, endHour) => {
        const periods = [];
        for (let hour = startHour; hour < endHour; hour++) {
            if(hour < 9){
                periods.push(`0${hour}:00 - 0${hour + 1}:00`);
            }else if(hour === 9){
                periods.push(`0${hour}:00 - ${hour + 1}:00`);
            }
            else{
                periods.push(`${hour}:00 - ${hour + 1}:00`);
            }
        }
        return periods;
    };

    const filteredCourts = (courtsData ?? []).filter(court => {
        const matchStadium = selectedStadium === "ALL" || court.stadium?.toUpperCase() === selectedStadium;
        const matchSport = selectedSport === "" || selectedSport === "ALL" || court.Facility_Type?.toUpperCase() === selectedSport;

        return matchStadium && matchSport;
    });

    const updateCourtStatus = (court, newStatus) => {
        // setCourtsData(prevData => prevData.map(c =>
        //     c.court_id === court.court_id ? { ...c, Status: newStatus } : c
        // ));
    //     Fetch Data Here
        const [startTime, endTime] = selectedPeriod.split(' - ');
        const startTimeWithSeconds = `${startTime}:00`;  // "14:00:00"
        const endTimeWithSeconds = `${endTime}:00`;
        const datePart = selectDate.toISOString().split('T')[0];

        console.log('new status is: ', newStatus)

        const token = localStorage.getItem("token")
        if(newStatus === "confirmed") {
            const data = {
                "court_id" : court.court_id,
                "stadium_id" : court.stadium_id,
                "date" : datePart,
                "start_time" : startTimeWithSeconds,
                "end_time" : endTimeWithSeconds,
                "status" : newStatus
            }
            try{
                axios.post("http://localhost:3000/addReservation", data, {
                    headers: {'Authorization': `Bearer ${token}`}
                }).then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        setCourtsData(prevData => prevData.map(c =>
                            c.court_id === court.court_id ? { ...c, Status: newStatus } : c
                        ));
                    }
                })
            }
            catch (e){
                console.log(e)
            }
        }
        else if(newStatus === "maintenance"){
            try{
                const now = new Date()
                const localDate = now.toISOString().split('T')[0];
                const localTime = now.toTimeString().split(' ')[0];

                const token = localStorage.getItem("token")
                const data = {
                    "court_id" : court.court_id,
                    "status": newStatus,
                }
                axios.put("http://localhost:3000/updateCourtStatus", data, {
                    headers: {'Authorization': `Bearer ${token}`}
                }).then((response) => {
                    console.log(response)
                    if(response.status === 200){

                        setCourtsData(prevData => prevData.map(c =>
                            c.court_id === court.court_id ? { ...c, Status: newStatus } : c
                        ));
                    }
                })
            }
            catch (e){
                console.log(e)
            }
        }else if(newStatus === "available"){
            try{
                const token = localStorage.getItem("token")
                const data = {
                    "court_id" : court.court_id,
                    "status": newStatus,
                }
                axios.put("http://localhost:3000/updateCourtStatus", data, {
                    headers: {'Authorization': `Bearer ${token}`}
                }).then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        console.log(200);
                        setCourtsData(prevData => prevData.map(c =>
                            c.court_id === court.court_id ? { ...c, Status: newStatus } : c
                        ));
                    }
                })
            }
            catch (e){
                console.log(e)
            }
        }
        else if(newStatus === "cancelled"){
            // console.log("TAP")
            try{
                const token = localStorage.getItem("token")
                const data = {
                    "court_id" : court.court_id,
                    "date" : datePart,
                    "start_time" : startTimeWithSeconds,
                    "end_time" : endTimeWithSeconds,
                    "status" : newStatus
                }
                axios.put("http://localhost:3000/updateReservationStatus", data, {
                    headers: {'Authorization': `Bearer ${token}`}
                }).then((response) => {
                    console.log(response)
                    if(response.status === 200){
                        const token = localStorage.getItem("token");
                        axios.get("http://localhost:3000/getCourtDetails", {
                            headers: { 'Authorization': `Bearer ${token}` }
                        }).then((response) => {
                            setStadiumPeriods(response.data.stadiumData || []);
                            setCourtsData(response.data.stadiumCourtData || []);
                            const filteredReservations = (response.data.reservationData || []).filter(
                                reservation => reservation.reservation_status !== 'cancelled'
                            );
                            setReservationData(filteredReservations);
                            console.log("query")
                        }).catch((error) => {
                            console.error("Error fetching stadium data:", error);
                        });
                        setCourtsData(prevData => prevData.map(c =>
                            c.court_id === court.court_id ? { ...c, Status: newStatus } : c
                        ));
                    }
                })
            }
            catch (e){
                console.log(e)
            }
        }
    };

    const pageCount = Math.ceil(filteredCourts.length / itemsPerPage);
    const paginatedCourts = filteredCourts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCreatebooking = (event) => {
        console.log("Create Booking is Clicked\n")
        setIsOpenOverlay(true)
    }


    // console.log(paginatedCourts)

    const updatedCourts = paginatedCourts.map(court => {
        // console.log("\n--- Processing Court ---");
        // console.log("Court ID:", court.court_id);
        // console.log("Initial Court Status:", court.Status);

        const reservation = reservationData.find(res => {
            // console.log("\nChecking Reservation:", res);

            const [startTime, endTime] = selectedPeriod.split(' - ');
            const startTimeWithSeconds = `${startTime}:00`;
            const endTimeWithSeconds = `${endTime}:00`;

            // console.log("Start Time with Seconds:", startTimeWithSeconds);
            // console.log("End Time with Seconds:", endTimeWithSeconds);

            const datePart = selectDate.toISOString().split('T')[0];
            // console.log("Selected Date (Local):", datePart);

            const reservationDate = new Date(res.reservation_date);
            const localReservationDate = new Date(reservationDate.getTime() - reservationDate.getTimezoneOffset() * 60000);
            const reservationDatePart = localReservationDate.toISOString().split('T')[0];

            // console.log("Reservation Date (Original UTC):", res.reservation_date);
            // console.log("Reservation Date (Converted Local):", reservationDatePart);

            const dateMatch = reservationDatePart.startsWith(datePart);
            const startTimeMatch = res.start_time === startTimeWithSeconds;
            const endTimeMatch = res.end_time === endTimeWithSeconds;
            const courtMatch = res.court_id === court.court_id;

            // console.log(`Date Match: ${dateMatch}, Start Time Match: ${startTimeMatch}, End Time Match: ${endTimeMatch}, Court Match: ${courtMatch}`);

            return courtMatch && dateMatch && startTimeMatch && endTimeMatch;
        });

        // if (reservation) {
        //     console.log("✅ Found Matching Reservation:", reservation);
        // } else {
        //     console.log("❌ No Matching Reservation Found for Court:", court.court_id);
        // }

        let status = court.Status || "available";
        // console.log("Initial Derived Status:", status);

        if (reservation) {
            if (reservation.reservation_status === "cancelled") {
                status = "available";
                // console.log("Reservation is cancelled, setting status to 'cancelled'");
            } else if (court.Status === "maintenance") {
                status = "maintenance";
                // console.log("Court already in maintenance, keeping status as 'maintenance'");
            } else {
                status = reservation.reservation_status;
                // console.log("Reservation exists, setting status to reservation status:", reservation.reservation_status);
            }
        }

        // console.log("✅ Final Status for Court", court.court_id, "is:", status);

        return {
            ...court,
            Status: status
        };
    });

    // console.log("\n✅ Final Updated Courts Array:", updatedCourts);



    // console.log(paginatedCourts);


    const handleCheckSchedule = () =>{
        setSchedule(true)
        console.log("CLICK SCHEDULE")
    }


    return (
        <div className="grid grid-rows-10 h-full overflow-x-auto">
            <div className="bg-white row-span-1">
                <div className="flex flex-col gap-3">
                    <div className=" flex flex-row items-center justify-end space-x-5 mr-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <div>
                                <Icon icon="noto:coin" className="w-9 h-9" />
                            </div>

                            <div>{point}</div>
                        </div>
                        <div>
                            <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                            </svg>
                        </div>

                        <div>
                            <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                      clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div></div>
                        <div>{formettedDate.toString()}</div>
                        <div className="">
                            <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4" onClick={handleCheckSchedule}>Check Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-span-9 grid grid-rows-4">
                <div className="row-span-1 shadow-lg grid grid-rows-3 pl-5">
                    <div className="row-span-1 flex flex-row gap-7 items-center">
                        <div className="flex flex-col w-[20%]">
                            <div>Stadium</div>
                            <Dropdown
                                options={stadiumOptions}
                                onChange={(e) => setSelectedStadium(e.value)}
                                value={selectedStadium}
                                placeholder="Select Stadium"
                            />
                        </div>
                        <div className="flex flex-col w-[20%] ">
                            <div>Date</div>
                            <DatePicker
                                selected={selectDate}
                                onChange={(date) => setSelectDate(date)}
                                className="border p-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="row-span-1">
                        <div className="row-span-1 flex flex-row gap-7 items-center">
                            <div className="flex flex-col w-[20%]">
                                <div>Facility Type</div>
                                <Dropdown
                                    options={facilityOptions}
                                    onChange={(e) => setSelectedSport(e.value)}
                                    value={selectedSport}
                                    placeholder="Select Facility"
                                />
                            </div>
                            <div className="flex flex-col w-[20%]">
                                <div>Period</div>
                                <Dropdown
                                    options={periodOptions}
                                    onChange={(e) => setSelectedPeriod(e.value)}
                                    value={selectedPeriod}
                                    placeholder="Select Period"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white items-center flex flex-row justify-end">
                        {/*<button className="bg-[#0F53B3] px-4 py-2 text-white rounded-xl" onClick={checkAvailability}>Check availability</button>*/}
                    </div>
                </div>

                <div className="row-span-3 grid grid-rows-10">
                    <div className="row-span-9 flex justify-center items-start pl-5 pr-5 pt-5">
                        <table className="w-full">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3">Court Number</th>
                                <th className="px-6 py-3">Stadium</th>
                                <th className="px-6 py-3">Facility Type</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3"></th>
                            </tr>
                            </thead>
                            <tbody className="border-2 text-center text-gray-500">
                            {updatedCourts.map((court, index) => (
                                <tr key={index}>
                                    {/*<td className="px-6 py-3">#{(currentPage - 1) * itemsPerPage + index + 1}</td>*/}
                                    <td>{court.court_id}</td>
                                    <td className="px-6 py-3">{court.stadium}</td>
                                    <td className="px-6 py-3">{court.Facility_Type}</td>
                                    <td className="px-6 py-3 text-[#448DF2]">{court.Status}</td>
                                    <td>
                                        <StatusDropdown
                                            court={court}
                                            updateCourtStatus={updateCourtStatus}
                                            setIsOpenOverlay={setIsOpenOverlay}
                                            selectedPeriod= {selectedPeriod}
                                        />


                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row-span-1 flex flex-row justify-between">
                        <button
                            className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}>
                            Previous
                        </button>

                        {/* Pagination Buttons */}
                        <div>
                            {Array.from({ length: pageCount }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    style={{ margin: "5px", padding: "5px", cursor: "pointer" }}
                                    className={currentPage === index + 1 ? 'bg-blue-500 text-white' : 'border'}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            className={`px-4 py-2 rounded-lg border ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'} mr-4`}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                            disabled={currentPage === pageCount}>
                            Next
                        </button>
                    </div>

                </div>
                {isOpenOverlay && <CreateBookingOverlay setIsOpenOverlay={setIsOpenOverlay} />}

            </div>
        </div>
    );
}
