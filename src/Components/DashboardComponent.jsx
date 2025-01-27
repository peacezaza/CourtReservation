import {useEffect} from "react";
import { Icon } from '@iconify/react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function DashboardComponent() {
    let date = new Date();

    const formettedDate = new Intl.DateTimeFormat('en-US',{
        weekday: 'long',
        day : "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    useEffect( () => {

    })

    const dataOptions = ["Weekly", "Monthly", "Yearly"];
    const defaultDataOption = dataOptions[0];




    return (
        <div className="w-full h-screen flex flex-col">
        {/*    Top Part*/}
            <div className="h-[7%] flex flex-row items-center justify-end space-x-5 mr-3">
                <div className="flex flex-row space-x-2 items-center">
                    <div>
                        <Icon icon="noto:coin" className="w-9 h-9"/>
                    </div>

                    <div>2000</div>
                </div>
                <div>
                    <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
            {/*    Middle Part*/}
            <div className="flex flex-row items-center justify-between h-[6%]">
                <div></div>
                <div>{formettedDate.toString()}</div>
                <div className="">
                    <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4">Create Booking</button>
                </div>
            </div>
            {/*    Bottom Part*/}
            <div className="bg-[#D1D5DB] h-full w-[100%] grid grid-rows-8 gap-5 py-5 ">
                <div className="bg-white row-span-2 w-[95%] h-full place-self-center rounded-xl grid-rows-2">
                    <div className="row-span-1 w-full h-[50%] bg-white rounded-t-xl flex flex-row justify-between px-3 items-center">
                        <div className="font-semibold text-3xl">Overview</div>
                        <div className="">
                            <Dropdown className="border-2 " options={dataOptions} value={defaultDataOption} placeholder="Select an option" />
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
                <div className="bg-blue-400 row-span-3 w-[95%] h-full place-self-center rounded-xl">aas</div>
                <div className="bg-cyan-100 row-span-3 w-[95%] h-full place-self-center rounded-xl"></div>
            </div>
        </div>
    )
}