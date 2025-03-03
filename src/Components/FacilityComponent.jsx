import AddStadiumOverlay from "./AddStadiumOverlay.jsx";
import StadiumCard from "./StadiumCard.jsx";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import axios from "axios";




export default function FacilityComponent({ setIsFacility, setStadiumSelect }) {

    const [ isOpenOverlay, setIsOpenOverlay ] = useState(false)
    const [stadiums, setStadiums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 6;

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            setLoading(true); // Start loading
            setTimeout(() => { // Simulate delay
                axios.get("http://localhost:3000/getStadiumInfo", {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then((response) => {
                    if (response.data.status === true) {
                        const formattedData = response.data.data.map((stadium) => ({
                            ...stadium,
                            location: stadium.location.split(",")[1] + ", " + stadium.location.split(",")[2]
                        }));
                        setStadiums(formattedData);
                    }
                    setLoading(false); // Stop loading
                }).catch((error) => {
                    console.error(error);
                    setLoading(false); // Stop loading even if there's an error
                });
            }, 200); // 2-second delay
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    // Calculate the total number of pages
    const totalPage = Math.ceil(stadiums.length / itemsPerPage);

    // Get the data for the current page
    const paginatedData = stadiums.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



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


    //
    // const stadiums = [
    //     { name: "Ruammitr court", location: "Chon buri, Sriracha", rating: 4.9, image: "https://canaltenis.com/wp-content/uploads/2024/10/WTA-Finals-punto-mira-tenis-femenino-990x554.jpg" },
    //     { name: "Ruammitr court", location: "Chon buri, Sriracha", rating: 4.9, image: "https://canaltenis.com/wp-content/uploads/2024/10/WTA-Finals-punto-mira-tenis-femenino-990x554.jpg" },
    //     { name: "Ruammitr court", location: "Chon buri, Sriracha", rating: 4.9, image: "https://canaltenis.com/wp-content/uploads/2024/10/WTA-Finals-punto-mira-tenis-femenino-990x554.jpg" },
    //     { name: "Ruammitr court", location: "Chon buri, Sriracha", rating: 4.9, image: "https://canaltenis.com/wp-content/uploads/2024/10/WTA-Finals-punto-mira-tenis-femenino-990x554.jpg" },
    //     { name: "Ruammitr court", location: "Chon buri, Sriracha", rating: 4.9, image: "https://canaltenis.com/wp-content/uploads/2024/10/WTA-Finals-punto-mira-tenis-femenino-990x554.jpg" },
    //     { name: "Ruammitr court", location: "Chon buri, Sriracha", rating: 4.9, image: "https://canaltenis.com/wp-content/uploads/2024/10/WTA-Finals-punto-mira-tenis-femenino-990x554.jpg", underMaintenance: true },
    // ];

    return (
        <div className="grid grid-rows-10 h-full overflow-y-hidden">
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
            {(loading)
                ?
                <div role="status" className="row-span-9 bg-white h-full flex justify-center items-center">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

                : <div className="row-span-9 bg-white">
                    {isOpenOverlay && <div className="flex justify-center items-center h-full w-full">
                        <AddStadiumOverlay setIsOpenOverlay={setIsOpenOverlay}/>
                    </div>}
                    <div className="grid grid-rows-8">
                        <div className=" row-span-7 grid grid-cols-3 gap-7 place-self-center">
                            {paginatedData.map((stadium, index) => (
                                <StadiumCard key={index} {...stadium} setIsFacility={setIsFacility} setStadiumSelect={setStadiumSelect}/>
                            ))}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                            <button
                                className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}>
                                Previous
                            </button>

                            {/*<span> Page {currentPage} of {totalPage} </span>*/}
                            <div>
                                {Array.from({length: totalPage}, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        style={{margin: "5px", padding: "5px", cursor: "pointer"}}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                            </div>

                            <button
                                className={`px-4 py-2 rounded-lg border ${currentPage === totalPage ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'} mr-4`}
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPage))}
                                disabled={currentPage === totalPage}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

