import React, { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import axios from 'axios';


const SearchableTable = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 7;
    const [selectedItem, setSelectedItem] = useState(null);
    const [customLink, setCustomLink] = useState("");



    const fetchData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:3000/getExchange_point?search=${searchTerm}`);
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })

        };
    };

    const formatDateMedium = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setCustomLink("");
        setSelectedItem(null);
    };



    const handleSendLink = async () => {
        console.log(selectedItem.owner_phone_number);
        if (!selectedItem) {
            alert("เกิดข้อผิดพลาด: ไม่พบข้อมูลผู้ใช้");
            return;
        }

        if (customLink.trim() === "" || !customLink.startsWith("https://")) {
            alert("กรุณากรอกลิงก์ที่ถูกต้อง");
            return;
        }

        try {
            // เรียก API แลกเปลี่ยน Voucher
            const response = await axios.post("http://localhost:3000/redeem_voucher", {
                voucher: customLink,
                phone: selectedItem.owner_phone_number,
            });

            if (response.data.success) {
                const amount = response.data.amount; // ดึงจำนวนเงินที่ได้รับ
                const user_id = selectedItem.user_id;



                await axios.post("http://localhost:3000/addNotifications", {
                    user_id,
                    date: new Date().toISOString().split('T')[0],
                    time: new Date().toLocaleTimeString(),
                    notification: `You have received ${amount} THB for the exchange transaction. Thank you very much for using our service.`,
                });

                alert("Voucher redeemed successfully!");
                await axios.delete("http://localhost:3000/deleteExchange_point", {
                    data: { user_id }
                });

                closeModal();
                fetchData();
            } else {
                alert(`Failed: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error redeeming voucher:", error);
            alert("An error occurred while redeeming the voucher");
        }
    };




    return (
        <div className="w-full max-w-10xl mx-auto">
            {/* Date Header */}
            <div className="text-center p-4 mt-16" >
                <p className="text-sm text-gray-600">{formatDateTime(new Date()).date}</p>
            </div>

            {/* Main Content Container with increased spacing */}
            <div className="mt-20 px-4">
                {/* Search Bar */}
                <div className="flex mb-6">
                    <div className="relative flex-grow mr-2">
                        <input
                            type="text"
                            placeholder="Search Name / Number"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-4">Loading...</div>
                )}

                {/* Table */}
                <div className="bg-white rounded-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-sm text-gray-500">Number</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-500">Owner</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-500">Point</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-500">Date</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-500">Time</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-500"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {paginatedData.map((item, index) => {

                            return (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">{startIndex + index + 1}</td>
                                    <td className="px-6 py-4 text-sm">{item.owner_name}</td>
                                    <td className="px-6 py-4 text-sm">{item.point}</td>
                                    <td className="px-6 py-4 text-sm">{formatDateMedium(item.date)}</td>
                                    <td className="px-6 py-4 text-sm">{item.time}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => openModal(item)} className="p-2 hover:bg-gray-100 rounded-full">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <div className="flex space-x-1">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`w-8 h-8 text-sm rounded ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
            {selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-120">
                        <div className="flex justify-between items-center">

                            <h1
                                className="text-xl font-semibold">{selectedItem.owner_first_name} {selectedItem.owner_last_name} |  {selectedItem.owner_phone_number ? selectedItem.owner_phone_number.replace(/\d(?=\d{4})/g, "*") : "N/A"}

                            </h1>





                            <button onClick={closeModal} className="text-gray-500">✖</button>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* รูปภาพอยู่ด้านซ้าย */}

                            <img src="/truemoney_logo.jpg" alt="home" className="w-50 h-32" />

                            {/* ส่วนด้านขวา (Point + Input + Button) */}
                            <div className="flex flex-col space-y-2 flex-grow ">
                                {/* Point อยู่ด้านบน */}
                                <p className="text-red-500 font-bold text-left">Point: {selectedItem.point} P</p>

                                {/* Input และ Button */}
                                <div className="flex items-center space-x-2 w-full">
                                    <input
                                        type="text"
                                        value={customLink}
                                        onChange={(e) => setCustomLink(e.target.value)}
                                        placeholder="https://gift.truemoney.com/campaign/?"
                                        className="w-full min-w-[400px] px-4 py-1 border rounded"
                                    />
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSendLink}>SEND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableTable;