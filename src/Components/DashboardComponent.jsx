import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom';
import 'react-dropdown/style.css';
import Chart from 'react-apexcharts'
import { jwtDecode } from "jwt-decode";
import ReviewComponent from "./ReviewComponent.jsx";
import UserAccountComponent from "./UserAccountComponent.jsx"
import NotificationComponent from "./NotificationComponent.jsx";
import axios from "axios";

export default function DashboardComponent({setIsFacility}) {
    const [money, setMoney] = useState(0)
    const [ firstName, setFirstName] = useState("")


    const dataOptions = ["Weekly", "Monthly", "Yearly"];
    const defaultDataOption = dataOptions[0];
    const [selectedOption, setSelectedOption] = useState(defaultDataOption);
    const [ overview, setOverview ] = useState(0)
    const [ locationDetails, setStadiumOverview ] = useState([])
    const [ statisticData, setStatisticData ] = useState()
    const [options, setOptions] = useState(null); // Use state for options
    const [series, setSeries] = useState(null);
    const [ review, setReview ] = useState([])
    const [ fullReview, setFullReview ] = useState([])


    let date = new Date();
    const navigate = useNavigate();

    // const overview =
    //     {total_amount : 2000, total_reservations : 13, active_location : 2, utilizationRate : "22%"}


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Early return if no token

        const decoded = jwtDecode(token);
        // console.log(decoded);
        setFirstName(decoded.userData.first_name);
        setMoney(decoded.userData.point);

        axios
            .get("http://localhost:3000/owner/getDashboard", {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { period: "weekly" }
            })
            .then((response) => {
                setOverview(response.data.data || {});
                setStadiumOverview(response.data.stadiumdata || []);
                setReview(response.data.review || []);
                setFullReview(response.data.fullReview|| []);
                const stats = response.data.statistics || []; // Use response data directly
                setStatisticData(stats); // Set for later use if needed

                // Process statistics data
                const data = new Array(7).fill(0);
                if (stats && Array.isArray(stats)) {
                    stats.forEach(entry => {
                        const localDate = new Date(entry.date);
                        const dayIndex = localDate.getDay(); // 0 = SUN, 1 = MON, ..., 6 = SAT
                        data[dayIndex] = entry.total_reservations || 0; // Default to 0 if undefined
                    });
                }

                // Set chart options and series
                setOptions({
                    chart: {
                        type: 'bar',
                    },
                    colors: ['#57534E'],
                    xaxis: {
                        categories: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%',
                        },
                    },
                });

                setSeries([
                    {
                        name: 'Occupancy',
                        data: data,
                    },
                ]);
            })
            .catch((error) => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);


    const [isOpenMenuAccount, setIsOpenMenuAccount] = useState(false);

    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    const [OpenReview, setOpenReview] = useState(null);
    const [OpenUserAccount, setOpenUserAccount] = useState(null);
    const [OpenNotification, setOpenNotification] = useState(null);

    const handleOpenReview = () => {
        setOpenReview(prev => !prev); // Trigger state change on button click
    }

    const handleOpenNotification = () => {
        setOpenNotification(prev => !prev); // Trigger state change on button click
    }

    const handleOpenUserAccount = () => {
        setOpenUserAccount(prev => !prev); // Trigger state change on button click
    }



    const tableHeader = locationDetails && locationDetails.length > 0 ? Object.keys(locationDetails[0]) : []


    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logout");
        navigate("/")

    }

    const handleCreateBooking = () => {
        setIsFacility(true)
    }

    const handleSelect = (option) => {
        setSelectedOption(option.value);
        // Add any additional logic you need when a selection changes
        console.log(`Selected: ${option.value}`);
        const token = localStorage.getItem("token")
        if (option.value === "Weekly") {
            axios.get("http://localhost:3000/owner/getDashboard", {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { period: "weekly" }

            }).then((response) => {
                // console.log(response.data.data);
                // console.log(response.data.statistics)
                setOverview(response.data.data);
                setStadiumOverview(response.data.stadiumdata || []);
                const stats = response.data.statistics || [];
                setStatisticData(stats);

                const data = new Array(7).fill(0);
                if (stats && Array.isArray(stats)) {
                    stats.forEach(entry => {
                        const localDate = new Date(entry.date);
                        const dayIndex = localDate.getDay();
                        data[dayIndex] = entry.total_reservations || 0;
                    });
                }

                // Set chart options and series
                setOptions({
                    chart: {
                        type: 'bar',
                    },
                    colors: ['#57534E'],
                    xaxis: {
                        categories: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%',
                        },
                    },
                });

                setSeries([
                    {
                        name: 'Occupancy',
                        data: data,
                    },
                ]);
            })
        } else if (option.value === "Monthly") {
            axios.get("http://localhost:3000/owner/getDashboard", {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { period: "monthly" }

            }).then((response) => {
                console.log(response.data.data);
                console.log(response.data.statistics)
                setOverview(response.data.data);
                setStadiumOverview(response.data.stadiumdata || []);
                setStatisticData(response.data.statistics || []);

                const stats = response.data.statistics || [];
                setStatisticData(stats);

                const weeklyData = new Array(4).fill(0);

                if (stats && typeof stats === 'object') {
                    weeklyData[0] = stats.week1 || 0;
                    weeklyData[1] = stats.week2 || 0;
                    weeklyData[2] = stats.week3 || 0;
                    weeklyData[3] = stats.week4 || 0;
                }
                setOptions({
                    chart: {
                        type: 'bar', // This is what the chart library needs
                    },
                    colors: ['#57534E'],
                    xaxis: {
                        categories: [
                            "Week1", "Week2", "Week3", "Week4"
                        ],
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%',
                        },
                    },
                });

                setSeries([
                    {
                        name: 'Occupancy',
                        data: weeklyData,
                    },
                ]);
            })
        } else if (option.value === "Yearly") {
            axios.get("http://localhost:3000/owner/getDashboard", {
                headers: { 'Authorization': `Bearer ${token}` },
                params: { period: "yearly" }

            }).then((response) => {
                console.log(response.data.data);
                console.log(response.data.statistics)
                setOverview(response.data.data);
                setStadiumOverview(response.data.stadiumdata || []);
                const stats = response.data.statistics || [];
                setStatisticData(stats);

// Initialize an array for 12 months
                const monthlyData = new Array(12).fill(0);

                if (stats && typeof stats === 'object') {
                    monthlyData[0] = stats.Jan || 0;
                    monthlyData[1] = stats.Feb || 0;
                    monthlyData[2] = stats.Mar || 0;
                    monthlyData[3] = stats.Apr || 0;
                    monthlyData[4] = stats.May || 0;
                    monthlyData[5] = stats.Jun || 0;
                    monthlyData[6] = stats.Jul || 0;
                    monthlyData[7] = stats.Aug || 0;
                    monthlyData[8] = stats.Sep || 0;
                    monthlyData[9] = stats.Oct || 0;
                    monthlyData[10] = stats.Nov || 0;
                    monthlyData[11] = stats.Dec || 0;
                }

                setOptions({
                    chart: {
                        type: 'bar', // Chart type
                    },
                    colors: ['#57534E'],
                    xaxis: {
                        categories: [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ],
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '50%',
                        },
                    },
                });

                setSeries([
                    {
                        name: 'Occupancy',
                        data: monthlyData, // Use dynamic monthly data from statistics
                    },
                ]);
            })
        }
    };
    return (
        <div className="grid grid-rows-10 h-full overflow-x-auto overflow-y-hidden">
            <div className="bg-white row-span-1 ">
                <div className="flex flex-col gap-3">
                    <div className=" flex flex-row items-center justify-end space-x-5 mr-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <div>
                                <Icon icon="noto:coin" className="w-9 h-9" />
                            </div>

                            <div>{money}</div>
                        </div>
                        <div>
                            <button onClick={() => handleOpenNotification(null)}
                                    className=" rounded-full  hover:bg-gray-300 "
                            >

                                <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                                </svg>
                            </button>
                        </div>

                        {/* MenuUser */}
                        <div className="relative" >
                            <button
                                onClick={() => setIsOpenMenuAccount(!isOpenMenuAccount)}
                                className=" rounded-full  hover:bg-gray-300 "
                            >
                                <svg
                                    className="w-8 h-8 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="black"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {isOpenMenuAccount && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <div className="px-4 py-2 flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
                                        </svg>
                                        <span className="font-semibold">{firstName}</span>
                                    </div>
                                    <hr />
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2" onClick={() => handleOpenUserAccount(null)}>
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
                                        </svg>
                                        <span>My Account</span>
                                    </button>
                                    <hr />
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2" onClick={handleLogout}>
                                        <Icon icon="material-symbols:logout" className="w-5 h-5 text-gray-600" />
                                        <span>Logout</span>
                                    </button>

                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <div></div>
                        <div>{formettedDate.toString()}</div>
                        <div className="">
                            <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4" onClick={handleCreateBooking}>Create Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#D1D5DB] row-span-9 grid grid-rows-8 gap-6 h-full py-6">
                <div className="row-span-2 bg-white w-[90%] h-full place-self-center rounded-xl">
                    <div
                        className="row-span-1 w-full h-[50%] bg-white rounded-t-xl flex flex-row justify-between px-3 items-center">
                        <div className="font-semibold text-3xl">Overview</div>
                        <div className="relative w-40">
                            <Dropdown
                                className="border border-gray-300 rounded-lg shadow-sm bg-white"
                                controlClassName="py-2 px-4 text-gray-700 w-full flex justify-between items-center cursor-pointer"
                                menuClassName="bg-white mt-1 rounded-lg shadow-md border border-gray-200 py-1 z-50"
                                arrowClassName="text-gray-500"
                                arrowClosed={<span className="ml-2">▼</span>}
                                arrowOpen={<span className="ml-2">▲</span>}
                                options={dataOptions}
                                value={selectedOption}
                                onChange={handleSelect}
                                placeholder="Select an option"
                            />
                        </div>
                    </div>
                    <div className="row-span-1 w-full h-[50%] rounded-b-xl flex flex-row justify-around">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Total</p>
                                <p className="text-[#5D6679]">Revenue</p>
                            </div>
                            <div className="flex flex-row gap-3 items-start">
                                <Icon icon="noto:coin" className="w-9 h-9" />
                                <p className="font-semibold text-2xl">{overview.total_amount ?? 0}</p>
                            </div>
                        </div>

                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Total</p>
                                <p className="text-[#5D6679]">Booking</p>
                            </div>

                            <div className="font-semibold text-2xl items-center">
                                {overview.total_reservations}
                            </div>

                        </div>

                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Active</p>
                                <p className="text-[#5D6679]">Location</p>
                            </div>

                            <div className="font-semibold text-2xl items-center">
                                {overview.active_location}
                            </div>

                        </div>

                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Average</p>
                                <p className="text-[#5D6679]">Utilization rate</p>
                            </div>

                            <div className="font-semibold text-2xl items-center">
                                {overview.utilizationRate}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row-span-3 bg-white w-[90%] h-full place-self-center rounded-xl">
                    <div
                        className="w-full h-full overflow-y-auto overflow-x-auto bg-gray-50 p-2  rounded-lg shadow-sm scrollbar-thin"
                        style={{
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#94a3b8 #e2e8f0'
                        }}
                    >
                        <table className="w-full table-auto border-collapse">
                            <thead className="border-b-2 sticky top-0 z-10 bg-white">
                            {tableHeader.map((key, index) => (
                                <th
                                    className="text-gray-600 font-semibold text-xl py-4 px-6 text-left border-b-2 border-gray-400"
                                    key={index}
                                >
                                    {key}
                                </th>
                            ))}
                            </thead>
                            <tbody className="text-gray-700 text-lg">
                            {locationDetails.length === 0 ? (
                                <tr>
                                    <td colSpan="100%" className="py-4 px-6 text-center text-xl font-bold">
                                        No Stadium
                                    </td>
                                </tr>
                            ) : (
                                locationDetails.map((row, rowIndex) => (
                                    <tr
                                        className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                                        key={rowIndex}
                                    >
                                        {Object.keys(row).map((key, index) => (
                                            <td
                                                className="py-4 px-6 text-left"
                                                key={index}
                                            >
                                                {row[key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row-span-3 w-[90%] h-full place-self-center rounded-xl grid grid-cols-5 gap-6">
                    <div className="col-span-3 bg-white rounded-xl flex flex-col px-4">
                        <div className="text-2xl"><p>Occupancy Statistics</p></div>
                        <div>
                            {options && series ? (
                                <Chart
                                    options={options}
                                    series={series}
                                    type="bar"
                                    height={250}
                                    width="95%"
                                />
                            ) : (
                                <p>Loading chart...</p>
                            )}
                        </div>
                    </div>
                    <div className="col-span-2 bg-white rounded-xl flex-col">
                        <div className="text-xl flex items-center px-4 flex-row justify-between py-3">
                            <div>Customers feedback</div>
                            <button onClick={() => handleOpenReview(null)}>
                                <Icon icon="ph:dots-three-vertical-bold"/>
                            </button>

                        </div>
                        <div>
                            {review.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="flex flex-row justify-between items-center border-b-2 border-gray-200 h-[6rem] px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                                >
                                    {/* Left Section: User and Review Comment */}
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-lg font-semibold text-gray-800">
                                            {(row.Name) ? row.Name : "Anonymous"}
                                        </p>
                                        <p className="text-sm text-gray-600 italic">{row.Review}</p>
                                    </div>

                                    {/* Right Section: Stadium Name */}
                                    <div className="text-right">
                                        <p className="text-md font-medium text-blue-600">{row.name}</p>
                                        <p className="text-xs text-gray-500">{row.Stadium}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {OpenReview && <ReviewComponent onClose={() => setOpenReview(null)} fullReview={fullReview} />}
                {OpenNotification && <NotificationComponent onClose={() => setOpenNotification(null)} />}
                {OpenUserAccount && <UserAccountComponent onClose={() => setOpenUserAccount(null)} />}
            </div>
        </div>
    )
}