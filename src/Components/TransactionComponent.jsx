import { Icon } from "@iconify/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import NotificationComponent from "./NotificationComponent.jsx";
import * as response from "autoprefixer";


export default function TransactionComponent() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // แสดง 10 รายการต่อหน้า
    const [ Transaction, setTransactions ] = useState([]);
    const [money, setMoney] = useState(0)
    const [ firstName, setFirstName] = useState("")
    const [OpenUserAccount, setOpenUserAccount] = useState(null);
    const [OpenNotification, setOpenNotification] = useState(null);
    const [isOpenMenuAccount, setIsOpenMenuAccount] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return; // Early return if no token

        const decoded = jwtDecode(token);
        // console.log(decoded);
        setFirstName(decoded.userData.first_name);

    })

    // const Transaction = [
    //     { id: "#S001", date: "18/11/2022", time: "20:32", point: -15000, status: "Pending" },
    //     { id: "#S002", date: "18/11/2022", time: "19:20", point: -15000, status: "Confirmed" },
    //     { id: "#S003", date: "18/11/2022", time: "18:30", point: -15000, status: "Confirmed" },
    //     { id: "#S098", date: "18/11/2022", time: "16:28", point: -15000, status: "Confirmed" },
    //     { id: "#S097", date: "18/11/2022", time: "15:20", point: -15000, status: "Confirmed" },
    //     { id: "#S099", date: "18/11/2022", time: "15:19", point: -30000, status: "Confirmed" },
    //     { id: "#S100", date: "18/11/2022", time: "13:39", point: -15000, status: "Confirmed" },
    //     { id: "#S101", date: "18/11/2022", time: "11:50", point: -15000, status: "Confirmed" },
    //     { id: "#S004", date: "19/11/2022", time: "09:45", point: -20000, status: "Pending" },
    //     { id: "#S005", date: "19/11/2022", time: "14:10", point: -10000, status: "Confirmed" },
    //     { id: "#S006", date: "19/11/2022", time: "16:00", point: -18000, status: "Confirmed" },
    //     { id: "#S007", date: "20/11/2022", time: "10:15", point: -12000, status: "Pending" },
    //     { id: "#S008", date: "20/11/2022", time: "12:20", point: -25000, status: "Confirmed" },
    //     { id: "#S009", date: "21/11/2022", time: "08:50", point: -15000, status: "Confirmed" },
    //     { id: "#S010", date: "21/11/2022", time: "13:30", point: -22000, status: "Confirmed" },
    //     { id: "#S011", date: "21/11/2022", time: "15:45", point: -17000, status: "Pending" },
    //     { id: "#S012", date: "22/11/2022", time: "09:05", point: -20000, status: "Confirmed" },
    //     { id: "#S013", date: "22/11/2022", time: "11:45", point: -30000, status: "Confirmed" },
    //     { id: "#S014", date: "23/11/2022", time: "14:25", point: -15000, status: "Pending" },
    //     { id: "#S015", date: "23/11/2022", time: "17:30", point: -19000, status: "Confirmed" }
    // ];


    useEffect(() => {

        try{
            const token = localStorage.getItem("token");
            axios.get("http://localhost:3000/owner/getTransaction", {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then((response) =>{
                console.log(response.data.data)
                const filteredTransactions = response.data.data.filter(
                    transaction =>
                        transaction.status === "sale" ||
                        transaction.status === "withdrawal" ||
                        transaction.status === "refund"
                );

                setTransactions(filteredTransactions);
            })
        }
        catch (error) {
            console.log(error);
        }

        try {
            const token = localStorage.getItem("token");

            const decoded = jwtDecode(token);
            console.log(decoded.userData.id)
            axios.get(
                "http://localhost:3000/point", // Adjusted endpoint
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ).then((response) =>{
                console.log(response.data[0].point)
                setMoney(response.data[0].point)
            })

        } catch (error) {
            console.error("Error during withdrawal:", error.response ? error.response.data : error.message);
            // Optionally handle error (e.g., show error message to user)
        }
    }, []);

    const handleOpenNotification = () => {
        setOpenNotification(prev => !prev); // Trigger state change on button click
    }

    const handleOpenUserAccount = () => {
        setOpenUserAccount(prev => !prev); // Trigger state change on button click
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logout");
        navigate("/")

    }
    // const filteredTransaction = Transaction.filter(trans => filterStatus === "All" || trans.status === filterStatus);

    useEffect(() => {
        setCurrentPage(1);
    }, []);


    // Pagination
    const totalPages = Math.max(1, Math.ceil(Transaction.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransaction =  Transaction.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    let date = new Date();

    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    const handleWithdraw = async () => {
        if(money >0){
            const token = localStorage.getItem("token");
            try {

                const decoded = jwtDecode(token);
                console.log(decoded.userData.id)
                const response = await axios.put(
                    "http://localhost:3000/owner/withdraw", // Adjusted endpoint
                    {
                        user_id: decoded.userData.id,
                        amount: 0, // Adjust amount as needed
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

            } catch (error) {
                console.error("Error during withdrawal:", error.response ? error.response.data : error.message);
                // Optionally handle error (e.g., show error message to user)
            }
            setMoney(0)

            try {
                axios.post(
                    "http://localhost:3000/owner/addTransaction",
                    {
                        "amount": money,
                        "type": "withdrawal"
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error("Error in API call:", error);
                    });
            } catch (error) {
                console.error("Unexpected error:", error);
            }
        }
    };






    return (
        <div className="grid grid-rows-10 h-full">
            <div className="row-span-1">
                <div className="flex flex-col gap-3">
                    <div className=" flex flex-row items-center justify-end space-x-5 mr-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <div>
                                <Icon icon="noto:coin" className="w-9 h-9"/>
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
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                                </svg>
                            </button>
                        </div>

                        {/* MenuUser */}
                        <div className="relative">
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
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"/>
                                        </svg>
                                        <span className="font-semibold">{firstName}</span>
                                    </div>
                                    <hr/>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={() => handleOpenUserAccount(null)}>
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"/>
                                        </svg>
                                        <span>My Account</span>
                                    </button>
                                    <hr/>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={handleLogout}>
                                        <Icon icon="material-symbols:logout" className="w-5 h-5 text-gray-600"/>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-span-9 bg-white p-4 rounded-2xl shadow-md">
                <div className="flex justify-between mb-4">
                    <div className="space-x-2">
                        <div>
                            <button
                                onClick={handleWithdraw}
                                className={`px-4 py-2 rounded-full bg-transparent border-2 ${
                                    money <= 0 ? "opacity-50 cursor-not-allowed" : "hover:opacity-100"
                                }`}
                                disabled={money <= 0}
                            >
                                Withdraw
                            </button>
                        </div>

                    </div>

                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border rounded-lg ">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Point</th>
                            <th className="px-4 py-2">Status</th>


                        </tr>
                        </thead>
                        <tbody>
                        {paginatedTransaction.map(trans => (
                            <tr key={trans.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-5 font-medium">{trans.id}</td>
                                <td className="px-4 py-5 text-blue-600 cursor-pointer">{trans.date}</td>
                                <td className="px-4 py-5">{trans.time}</td>
                                <td className={`px-4 py-5 ${
                                    trans.status === "withdrawal" ? "text-green-400" :
                                        trans.status === "sale" ? "text-green-400" :
                                            trans.status === "refund" ? "text-red-500" : "text-gray-600"
                                }`}>
                                    {trans.point}
                                </td>
                                <td className="px-4 py-5 font-semibold">{trans.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-2 rounded-lg border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-transparent'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 text-white'} mr-4`}
                        >
                            Next
                        </button>
                    </div>
                )}

                {OpenNotification && <NotificationComponent onClose={() => setOpenNotification(null)} />}
            </div>
        </div>
    )
}