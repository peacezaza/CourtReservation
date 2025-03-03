import {Icon} from "@iconify/react";
import Dropdown from "react-dropdown";
import {useEffect, useState, useRef} from "react";
import DatePicker from "react-datepicker";
import 'react-dropdown/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";

export default function FacilityDetails({stadiumSelect}) {

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
    const [ reservationData, setReservationData] = useState([])
    const itemsPerPage = 9;

    const isDataFetched = useRef(false);

    useEffect(() => {
        if (!isDataFetched.current) {
            const token = localStorage.getItem("token");
            axios.get("http://localhost:3000/getCourtDetails", {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then((response) => {
                setStadiumPeriods(response.data.stadiumData);
                setCourtsData(response.data.stadiumCourtData);
                setReservationData(response.data.reservationData)
                // console.log(response.data.reservationData)

                isDataFetched.current = true;
            }).catch((error) => {
                console.error("Error fetching stadium data:", error);
            });
        }
    }, []);

    useEffect(() => {
        if (stadiumPeriods.length === 0 || courtsData.length === 0 || reservationData.length === 0) {
            return;
        }

        setStadiumOptions([
            "ALL",
            ...new Set(courtsData.map(court => (court.stadium ?? '').toUpperCase()))
        ]);

        setFacilityOptions([
            "ALL",
            ...new Set(courtsData.map(court => (court.Facility_Type ?? '').toUpperCase()))
        ]);

        updatePeriodOptions(selectedStadium);


        // console.log(courtsData)
        // console.log(selectedPeriod)
    }, [stadiumPeriods, selectedStadium, courtsData,selectedPeriod]);

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
                setPeriodOptions(["ALL", ...generateTimePeriods(earliestOpen, latestClose)]);
                // console.log(periodOptions)
            } else {
                setPeriodOptions([]);
            }
        } else {
            const matchingStadium = stadiumPeriods.find(period => period.stadium.toUpperCase() === stadium.toUpperCase());
            if (matchingStadium) {
                const openHour = parseInt(matchingStadium.openHour.split(":")[0]);
                const closeHour = parseInt(matchingStadium.closeHour.split(":")[0]);
                setPeriodOptions(["ALL", ...generateTimePeriods(openHour, closeHour)]);
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
            periods.push(`${hour}:00 - ${hour + 1}:00`);
        }
        return periods;
    };

    const filteredCourts = courtsData.filter(court => {
        const matchStadium = selectedStadium === "ALL" || court.stadium?.toUpperCase() === selectedStadium;
        const matchSport = selectedSport === "" || selectedSport === "ALL" || court.Facility_Type?.toUpperCase() === selectedSport;

        return matchStadium && matchSport;
    });

    const pageCount = Math.ceil(filteredCourts.length / itemsPerPage);
    const paginatedCourts = filteredCourts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // console.log(paginatedCourts)

    const updatedCourts = paginatedCourts.map(court => {
        // console.log("🔎 Checking Court:", court.court_id);

        const reservation = reservationData.find(res => {
            // console.log("  📅 Checking Reservation:", {
            //     reservation_court_id: res.court_id,
            //     reservation_date: res.reservation_date,
            //     reservation_start_time: res.start_time,
            //     reservation_end_time: res.end_time,
            // });


            const [startTime, endTime] = selectedPeriod.split(' - ');
            const startTimeWithSeconds = `${startTime}:00`;  // "14:00:00"
            const endTimeWithSeconds = `${endTime}:00`;
            const datePart = selectDate.toISOString().split('T')[0];
            const reservationDate = new Date(res.reservation_date);  // Create a Date object from UTC time
            const localReservationDate = new Date(reservationDate.getTime() - reservationDate.getTimezoneOffset() * 60000);  // Convert UTC to local time
            const reservationDatePart = localReservationDate.toISOString().split('T')[0];
            const dateMatch = reservationDatePart.startsWith(datePart);
            const startTimeMatch = res.start_time === startTimeWithSeconds
            const endTimeMatch = res.end_time === endTimeWithSeconds
            const courtMatch = res.court_id === court.court_id;

            // if(courtMatch){
            //     console.log("  📅 Checking Reservation:", {
            //         reservation_court_id: res.court_id,
            //         reservation_date: reservationDatePart,
            //         reservation_start_time: res.start_time,
            //         reservation_end_time: res.end_time,
            //     });
            //
            //     console.log(`  🧩 Match Breakdown:`);
            //     console.log(`    - res.court_id is ${res.court_id} AND court.court_id is ${court.court_id}`)
            //     console.log(`    - Court ID Match: ${courtMatch}`);
            //     console.log(`    - Date Match: ${dateMatch} (${reservationDatePart} vs ${datePart})`);
            //     console.log(`    - Start Time Match: ${startTimeMatch} (${res.start_time} vs ${startTimeWithSeconds})`);
            //     console.log(`    - End Time Match: ${endTimeMatch} (${res.end_time} vs ${endTimeWithSeconds})`);
            // }
            return courtMatch && dateMatch && startTimeMatch && endTimeMatch;
        });

        // console.log(`✅ Final Status for Court ${court.court_id}:`, reservation ? reservation.reservation_status : "available");
        // console.log("-----------------------------------------------------");

        return {
            ...court,
            Status: reservation ? reservation.reservation_status : "available"
        };
    });


    // console.log(paginatedCourts);



    return(
        <div className="grid grid-rows-10 h-full overflow-x-auto">
            <div className="bg-white row-span-1">
                <div className="flex flex-col gap-3">
                    <div className=" flex flex-row items-center justify-end space-x-5 mr-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <div>
                                <Icon icon="noto:coin" className="w-9 h-9"/>
                            </div>

                            <div>{point}</div>
                        </div>
                        <div>
                            <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                            </svg>
                        </div>

                        <div>
                            <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div></div>
                        <div>{formettedDate.toString()}</div>
                        <div className="">
                            <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4">Check Schedule
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
                        <div className="flex flex-col w-[20%]">
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
                                    <td className="px-6 py-3">#{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="px-6 py-3">{court.stadium}</td>
                                    <td className="px-6 py-3">{court.Facility_Type}</td>
                                    <td className="px-6 py-3 text-[#448DF2]">{court.Status}</td>
                                    <td>
                                        <button
                                            className="ml-2">
                                            <Icon icon="mdi:dots-vertical" className="w-5 h-5"/>
                                        </button>
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
                            {Array.from({length: pageCount}, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    style={{margin: "5px", padding: "5px", cursor: "pointer"}}
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
            </div>
        </div>
    );
}