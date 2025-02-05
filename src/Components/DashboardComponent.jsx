import {useEffect} from "react";
import {Icon} from '@iconify/react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Chart from 'react-apexcharts'


export default function DashboardComponent() {

    const money = 2000;
    let date = new Date();

    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    useEffect(() => {

    })

    const dataOptions = ["Weekly", "Monthly", "Yearly"];
    const defaultDataOption = dataOptions[0];

    const locationDetails = [{
        "Location": "Downtown Arena",
        "Revenue": 5000,
        "Booking": 120,
        "Utilization_Rate": 85
    },
        {
            "Location": "Downtown Arena",
            "Revenue": 5000,
            "Booking": 120,
            "Utilization_Rate": 85
        },
        {
            "Location": "Downtown Arena",
            "Revenue": 5000,
            "Booking": 120,
            "Utilization_Rate": 85
        }
    ]

    const tableHeader = Object.keys(locationDetails[0])

    const options = {
        chart: {
            type: "bar",
        },
        colors: ["#000"],
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        plotOptions: {
            bar: {
                columnWidth: "50%", // Adjust bar width (values: "10%" to "100%")
            },
        },
    };

    const series = [
        {
            name: "Occupancy",
            data: [30, 40, 55, 70, 91, 30, 55, 85, 63, 10, 40, 85],
        },
    ];

    const review = [
        {
            "Name" : "Mark",
            "Review" : "Food could be better",
            "Stadium" : "Areana"
        },
        {
            "Name" : "Christian",
            "Review" : "Facilities are not enough for amount paid.",
            "Stadium" : "Ryummit"
        },
        {
            "Name" : "Alexander",
            "Review" : "Good.",
            "Stadium" : "Areana"
        }
    ]

    return (
        <div className="grid grid-rows-10 h-full overflow-x-auto">
            <div className="bg-white row-span-1 ">
                <div className="flex flex-col gap-3 py-1">
                    <div className=" flex flex-row items-center justify-end space-x-5 mr-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <div>
                                <Icon icon="noto:coin" className="w-9 h-9"/>
                            </div>

                            <div>{money}</div>
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
                            <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4">Create Booking
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
                        <div className="">
                            <Dropdown className="border-2 " options={dataOptions} value={defaultDataOption}
                                      placeholder="Select an option"/>
                        </div>
                    </div>
                    <div className="row-span-1 w-full h-[50%] rounded-b-xl flex flex-row justify-around">
                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Total</p>
                                <p className="text-[#5D6679]">Revenue</p>
                            </div>
                            <div className="flex flex-row gap-3 items-start">
                                <Icon icon="noto:coin" className="w-9 h-9"/>
                                <p className="font-semibold text-2xl">2000</p>
                            </div>
                        </div>

                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Total</p>
                                <p className="text-[#5D6679]">Booking</p>
                            </div>

                            <div className="font-semibold text-2xl items-center">
                                13
                            </div>

                        </div>

                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Active</p>
                                <p className="text-[#5D6679]">Location</p>
                            </div>

                            <div className="font-semibold text-2xl items-center">
                                2
                            </div>

                        </div>

                        <div className="flex flex-row ">
                            <div className="flex flex-col justify-start">
                                <p className="text-[#9CA3AF]">Average</p>
                                <p className="text-[#5D6679]">Utilization rate</p>
                            </div>

                            <div className="font-semibold text-2xl items-center">
                                30%
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row-span-3 bg-white w-[90%] h-full place-self-center rounded-xl">
                    <div className="w-full h-full overflow-y-auto overflow-x-auto ">
                        <table className="w-full table-auto">
                            <thead className="border-b-2 sticky top-0 z-10 bg-white">
                            {tableHeader.map((key,index) =>(
                                <th className="text-[#9CA3AF] text-3xl py-3 px-5" key={index}>{key}</th>
                            ))}
                            </thead>
                            <tbody className="text-center text-xl">
                            {locationDetails.map((row, rowIndex) =>(
                                <tr className="h-[5rem] hover:bg-gray-200" key={rowIndex}>{Object.keys(row).map((key, index) => (
                                    <td key={index}>{row[key]}</td>
                                ))}</tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row-span-3 w-[90%] h-full place-self-center rounded-xl grid grid-cols-5 gap-6">
                    <div className="col-span-3 bg-white rounded-xl flex flex-col px-4">
                        <div className="text-2xl"><p>Occupancy Statistics</p></div>
                        <div><Chart options={options} series={series} type="bar" height={250} width="95%" className="" /></div>
                    </div>
                    <div className="col-span-2 bg-white rounded-xl flex-col">
                        <div className="text-xl flex items-center px-4 flex-row justify-between py-3">
                            <div>Customers feedback</div>
                            <button><Icon icon="ph:dots-three-vertical-bold" /></button>
                        </div>
                        <div>
                            {review.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex flex-row justify-between border-b-2 h-[5rem] px-4">
                                    <div className="flex flex-col"><p>{row.Name}</p><p>{row.Review}</p></div>
                                    <div>{row.Stadium}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}