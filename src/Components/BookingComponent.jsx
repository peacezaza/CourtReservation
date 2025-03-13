import CreateBookingOverlay from "./CreateBookingOverlay.jsx";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useEffect } from "react";
import BookingDetail from "./BookingDetail.jsx";
import axios from "axios";

import ReviewComponent from "./ReviewComponent.jsx";
import UserAccountComponent from "./UserAccountComponent.jsx"
import NotificationComponent from "./NotificationComponent.jsx";
import { useNavigate } from "react-router-dom";

export default function BookingComponent({ setIsFacility }) {
    const [isOpenOverlay, setIsOpenOverlay] = useState(false)
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // แสดง 10 รายการต่อหน้า
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isOpenMenuAccount, setIsOpenMenuAccount] = useState(false);
    const [isCancelOverlayOpen, setIsCancelOverlayOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    const [OpenReview, setOpenReview] = useState(null);
    const [OpenUserAccount, setOpenUserAccount] = useState(null);
    const [OpenNotification, setOpenNotification] = useState(null);

    const navigate = useNavigate();


    const handleOpenReview = () => {
        setOpenReview(prev => !prev); // Trigger state change on button click
    }

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

    const handleCreateBooking = () => {
        setIsFacility(true)
    }




    // const reservationsData = [
    //     { id: "6742", name: "Chris", contact: "(123) 456-395", stadium: "Olympic Court", facility: "Tennis", status: "Confirmed", amount: 150, courtnumber: "1", date: "2025-01-05", time: "10.00 AM - 12.00 PM" },
    //     { id: "4002", name: "John", contact: "(123) 456-207", stadium: "Sriracha Arena", facility: "Tennis", status: "Confirmed", amount: 300, courtnumber: "2", date: "2025-01-06", time: "12.00 PM - 2.00 PM" },
    //     { id: "3605", name: "Isabellaa", contact: "(123) 456-191", stadium: "Ryummit", facility: "Football", status: "Cancelled", amount: 150, courtnumber: "3", date: "2025-01-07", time: "2.00 PM - 4.00 PM" },
    //     { id: "1647", name: "Chris", contact: "(123) 456-996", stadium: "Grand Stadium", facility: "Football", status: "Cancelled", amount: 150, courtnumber: "4", date: "2025-01-08", time: "4.00 PM - 6.00 PM" },
    //     { id: "6918", name: "Emily", contact: "(123) 456-414", stadium: "Sriracha Arena", facility: "Football", status: "Cancelled", amount: 150, courtnumber: "5", date: "2025-01-09", time: "6.00 PM - 8.00 PM" },
    //     { id: "9063", name: "Lucas", contact: "(123) 456-662", stadium: "Olympic Court", facility: "Basketball", status: "Cancelled", amount: 150, courtnumber: "6", date: "2025-01-10", time: "8.00 AM - 10.00 AM" },
    //     { id: "5641", name: "Martin", contact: "(123) 456-974", stadium: "Olympic Court", facility: "Basketball", status: "Cancelled", amount: 150, courtnumber: "7", date: "2025-01-11", time: "10.00 AM - 12.00 PM" },
    //     { id: "6374", name: "Lily", contact: "(123) 456-909", stadium: "Grand Stadium", facility: "Basketball", status: "Confirmed", amount: 150, courtnumber: "8", date: "2025-01-12", time: "12.00 PM - 2.00 PM" },
    //     { id: "5307", name: "Pegasus", contact: "(123) 456-802", stadium: "Olympic Court", facility: "Football", status: "Confirmed", amount: 150, courtnumber: "9", date: "2025-01-13", time: "2.00 PM - 4.00 PM" },
    //     { id: "7253", name: "Sarah", contact: "(123) 456-535", stadium: "Ryummit", facility: "Basketball", status: "Cancelled", amount: 150, courtnumber: "10", date: "2025-01-14", time: "4.00 PM - 6.00 PM" },
    //     { id: "6395", name: "Mason", contact: "(123) 456-512", stadium: "Ryummit", facility: "Basketball", status: "Confirmed", amount: 150, courtnumber: "11", date: "2025-01-15", time: "6.00 PM - 8.00 PM" },
    //     { id: "5985", name: "Sarah", contact: "(123) 456-110", stadium: "Olympic Court", facility: "Tennis", status: "Confirmed", amount: 150, courtnumber: "12", date: "2025-01-16", time: "8.00 AM - 10.00 AM" },
    //     { id: "4312", name: "Alexander", contact: "(123) 456-157", stadium: "Grand Stadium", facility: "Football", status: "Confirmed", amount: 150, courtnumber: "13", date: "2025-01-17", time: "10.00 AM - 12.00 PM" },
    //     { id: "7550", name: "Cecil", contact: "(123) 456-855", stadium: "Olympic Court", facility: "Basketball", status: "Confirmed", amount: 150, courtnumber: "14", date: "2025-01-18", time: "12.00 PM - 2.00 PM" },
    //     { id: "2339", name: "Alexander", contact: "(123) 456-178", stadium: "Sriracha Arena", facility: "Badminton", status: "Cancelled", amount: 150, courtnumber: "15", date: "2025-01-19", time: "2.00 PM - 4.00 PM" },
    //     { id: "2639", name: "Alexander", contact: "(123) 456-413", stadium: "Olympic Court", facility: "Badminton", status: "Confirmed", amount: 150, courtnumber: "16", date: "2025-01-20", time: "4.00 PM - 6.00 PM" },
    //     { id: "7415", name: "Sophia", contact: "(123) 456-808", stadium: "Sriracha Arena", facility: "Tennis", status: "Cancelled", amount: 150, courtnumber: "17", date: "2025-01-21", time: "6.00 PM - 8.00 PM" },
    //     { id: "5922", name: "Sophia", contact: "(123) 456-271", stadium: "Olympic Court", facility: "Basketball", status: "Cancelled", amount: 150, courtnumber: "18", date: "2025-01-22", time: "8.00 AM - 10.00 AM" },
    //     { id: "7158", name: "Lucas", contact: "(123) 456-942", stadium: "Grand Stadium", facility: "Badminton", status: "Confirmed", amount: 150, courtnumber: "19", date: "2025-01-23", time: "10.00 AM - 12.00 PM" },
    //     { id: "6836", name: "Pegasus", contact: "(123) 456-566", stadium: "Sriracha Arena", facility: "Basketball", status: "Cancelled", amount: 150, courtnumber: "20", date: "2025-01-24", time: "12.00 PM - 2.00 PM" }
    // ];

    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/getReservationData", {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((response) => {
            const formattedReservations = response.data.data.map(res => {
                const reservationDate = new Date(res.date);  // Use res.date
                const localReservationDate = new Date(reservationDate.getTime() - reservationDate.getTimezoneOffset() * 60000);
                const reservationDatePart = localReservationDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

                return { ...res, date: reservationDatePart }; // Update date format
            });

            console.log(formattedReservations)

            setReservations(formattedReservations);

        }).catch((error) => {
            console.error("Error fetching stadium data:", error);
        });
    }, []);



    // ฟังก์ชันยกเลิกการจอง
    const handleCancelBooking = (bookingId) => {
        setReservations(prevReservations =>
            prevReservations.map(res =>
                res.id === bookingId ? { ...res, status: "cancelled" } : res
            )
        );

        setSelectedBooking(null); // Close popup
    };
    const handleCancelOverlayClose = () => {
        setIsCancelOverlayOpen(false);
        setBookingToCancel(null);
    };

    // Function to open cancel confirmation overlay
    const openCancelOverlay = (booking) => {
        setBookingToCancel(booking);
        setIsCancelOverlayOpen(true);
    };

    // Function to confirm cancellation
    const handleConfirmCancel = () => {
        let status = false;
        if (bookingToCancel) {
            console.log(bookingToCancel)
            setReservations(prev =>
                prev.map(res => {
                    return res.id === bookingToCancel.id ? { ...res, status: "cancelled" } : res
                })
            );
            setIsCancelOverlayOpen(false);
            setBookingToCancel(null);
            try {
                console.log("TEST")
                const token = localStorage.getItem("token")
                const date = new Date(bookingToCancel.date).toISOString().split('T')[0];
                const data = {
                    "court_id": bookingToCancel.court_id,
                    "reservation_id": bookingToCancel.id,
                    "amount": bookingToCancel.amount,
                    "owner_id": bookingToCancel.owner_id,
                    "user_id": bookingToCancel.user_id,
                    "date": date,
                    "start_time": bookingToCancel.start_time,
                    "end_time": bookingToCancel.end_time,
                    "status": "cancelled"
                }
                axios.put("http://localhost:3000/updateReservationStatus", data, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then((response) => {
                    console.log(response)
                })
            }
            catch (e) {
                console.log(e)
            }
        }



    };

    // Current date (automatically set to current system date and time)
    const currentDate = new Date();

    // Function to parse booking date and time in 24-hour format
    const parseBookingDateTime = (dateStr, timeStr) => {
        const [startTime] = timeStr.split(" - "); // Split if there's an end time
        const [hours, minutes] = startTime.split(":"); // Split hours and minutes
        const hourNum = parseInt(hours);
        return new Date(`${dateStr} ${hourNum}:${minutes}:00`);
    };
    const filteredReservations = reservations.filter(res => {
        const bookingDateTime = parseBookingDateTime(res.date, res.time);
        const matchesSearch =
            res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.id.includes(searchTerm);

        if (filterStatus === "All") {
            return matchesSearch;
        }

        if (filterStatus === "Ongoing") {
            return (
                res.status === "confirmed" &&
                bookingDateTime >= currentDate &&
                matchesSearch
            );
        }

        if (filterStatus === "Completed") {
            return (
                (res.status === "cancelled" || bookingDateTime < currentDate) &&
                matchesSearch
            );
        }

        if (filterStatus === "confirmed") {
            return res.status === "confirmed" && matchesSearch;
        }

        if (filterStatus === "cancelled") {
            return res.status === "cancelled" && matchesSearch;
        }

        return false;
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus, searchTerm]);


    // Pagination
    const totalPages = Math.max(1, Math.ceil(filteredReservations.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedReservations = filteredReservations.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const money = 2000;
    let date = new Date();

    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    const handleCreatebooking = (event) => {
        // console.log("Create Booking is Clicked\n")
        // setIsOpenOverlay(true)
        setIsFacility(true)
    }

    const handleSelectBooking = (booking) => {
        setSelectedBooking(booking);
    };




    return (
        <div className="grid grid-rows-10 h-full">
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
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
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
                                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
                                        </svg>
                                        <span className="font-semibold">Tanapat</span>
                                    </div>
                                    <hr />
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={() => handleOpenUserAccount(null)}>
                                        <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg"
                                             fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
                                        </svg>
                                        <span>My Account</span>
                                    </button>
                                    <hr />
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={handleLogout}>
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
                            <button className="rounded-xl border-2 py-1 bg-[#0F53B3] text-white px-4"
                                    onClick={handleCreateBooking}>Create Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-span-9 bg-white p-4 rounded-2xl shadow-md">
                <div className="flex justify-between mb-4">
                    <div className="space-x-2">
                        {['Ongoing', 'Completed'].map(status => (
                            <button
                                key={status}
                                className={`px-4 py-2 rounded-full ${filterStatus === status ? 'bg-blue-500 text-white' : 'bg-transparent border-2'}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status}
                            </button>

                        ))}
                    </div>
                    <div className="flex space-x-2">
                        {['All', 'confirmed', 'cancelled'].map(status => (
                            <button
                                key={status}
                                className={`px-4 py-2 rounded-full ${filterStatus === status ? 'bg-blue-500 text-white' : 'bg-transparent border-2'}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status}
                            </button>

                        ))}

                        <div className="relative flex items-center">
                            <Icon icon="mdi:magnify" className="absolute left-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or ID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64 border rounded-xl pl-10 py-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border rounded-lg ">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Reservation ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Contact</th>
                            <th className="px-4 py-2">Stadium Name</th>
                            <th className="px-4 py-2">Facility Type</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedReservations.map(res => (
                            <tr key={res.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-5 font-medium">#{res.id}</td>
                                <td className="px-4 py-5 text-blue-600 cursor-pointer">{res.name}</td>
                                <td className="px-4 py-5">Phone: {res.contact}</td>
                                <td className="px-4 py-5">{res.stadium}</td>
                                <td className="px-4 py-5">{res.facility}</td>
                                <td className={`px-4 py-5 ${res.status === 'cancelled' ? 'text-red-500' : 'text-green-500'}`}>{res.status}</td>
                                <td className="px-4 py-5">{res.amount}</td>
                                <td className="px-4 py-5 text-grey-100 cursor-pointer relative flex items-center space-x-3">
                                    <div className="flex items-center w-15 justify-between">
                                        {res.status === 'confirmed' ? (
                                            <button onClick={() => openCancelOverlay(res)}>
                                                <Icon icon="mdi:trash-can-outline"
                                                      className="w-5 h-5 text-red-500 cursor-pointer" />
                                            </button>
                                        ) : (
                                            <span className="w-5 h-5"></span> // Placeholder to maintain spacing
                                        )}
                                        <button onClick={() => handleSelectBooking(res)} className="ml-2">
                                            <Icon icon="mdi:dots-vertical" className="w-5 h-5" />
                                        </button>
                                    </div>

                                </td>
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

                {isOpenOverlay && <CreateBookingOverlay setIsOpenOverlay={setIsOpenOverlay} />}
                {selectedBooking && <BookingDetail booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}
                {selectedBooking && (
                    <BookingDetail
                        booking={selectedBooking}
                        onClose={() => setSelectedBooking(null)}
                        onCancel={handleCancelBooking}
                    />
                )}
            </div>
            {/* Cancel Confirmation Overlay */}
            {isCancelOverlayOpen && bookingToCancel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
                        <p>Are you sure you want to cancel booking #{bookingToCancel.id}?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button onClick={handleCancelOverlayClose} className="px-4 py-2 rounded bg-gray-300">
                                Cancel
                            </button>
                            <button onClick={handleConfirmCancel} className="px-4 py-2 rounded bg-red-500 text-white">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}