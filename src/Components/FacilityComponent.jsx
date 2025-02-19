import AddStadiumOverlay from "./AddStadiumOverlay.jsx";

import {Icon} from "@iconify/react";
import {useState} from "react";




export default function FacilityComponent() {

    const [ isOpenOverlay, setIsOpenOverlay ] = useState(false)


    const money = 2000;
    let date = new Date();

    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    const handleAddStadium = (event) => {
        console.log("Add Stadium is Clicked\n")
        setIsOpenOverlay(true)
    }


    return (
        <div className="grid grid-rows-10 h-full">
            <div className="row-span-1">
                <div className="flex flex-col gap-3 ">
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
                            <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4" onClick={handleAddStadium}>Add Stadium
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-span-9 bg-white">
                <div className="flex justify-center items-center  h-full w-full">
                    {isOpenOverlay && <AddStadiumOverlay setIsOpenOverlay={setIsOpenOverlay}/>}
                </div>
            </div>
        </div>
    )
}