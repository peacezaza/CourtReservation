import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState('all');
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // 🆕 ใช้เก็บสถานะการเรียง
    const itemsPerPage = 10;

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:3000/getTransactions?search=${searchTerm}`);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchTransactions();
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return {
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
    };

    const FullformatDateTime = (dateTime) => {
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

    // ฟังก์ชันจัดเรียงข้อมูล 🔽
    const sortedTransactions = [...transactions].sort((a, b) => {
        if (!sortConfig.key) return 0; // ถ้ายังไม่มีการเลือกคอลัมน์ให้ไม่ต้องเรียง

        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'time') {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
        } else if (sortConfig.key === 'point') {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // ฟังก์ชันเปลี่ยนทิศทางการเรียงเมื่อกดหัวตาราง
    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // ฟังก์ชันกรองข้อมูล
    const filteredTransactions = sortedTransactions.filter(transaction =>
        filterType === 'all' || transaction.user_type.toLowerCase() === filterType.toLowerCase()
    );

    // คำนวณหน้าที่ถูกต้อง
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full max-w-10xl mx-auto">
            {/* Date Header */}
            <div className="text-center p-4 mt-16" >
                <p className="text-sm text-gray-600">{FullformatDateTime(new Date()).date}</p>
            </div>

            <div className="flex space-x-2 mb-4 mt-10">
                {['all', 'owner', 'admin'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 rounded-lg ${filterType === type ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder="Search Transactions"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 mb-4 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="bg-white rounded-lg overflow-hidden">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                        <tr className="border-b bg-gray-100">
                            <th onClick={() => handleSort('id')} className="cursor-pointer px-4 py-3 text-left text-sm">
                                Transaction ID
                                {sortConfig.key === 'id' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort('username')} className="cursor-pointer px-20 py-3 text-left text-sm">
                                Username
                                {sortConfig.key === 'username' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort('point')} className="cursor-pointer px-20 py-3 text-left text-sm">
                                Point
                                {sortConfig.key === 'point' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th onClick={() => handleSort('time')} className="cursor-pointer px-20 py-3 text-left text-sm">
                                Date
                                {sortConfig.key === 'time' && (
                                    <span>{sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}</span>
                                )}
                            </th>
                            <th className="px-20 py-3 text-left text-sm">Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedTransactions.map((transaction, index) => {
                            const { date, time } = formatDateTime(transaction.time);
                            return (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-4 text-sm">{transaction.id}</td>
                                    <td className="px-20 py-3 text-sm">{transaction.username}</td>
                                    <td
                                        className={`px-20 py-3 text-sm font-semibold ${
                                            transaction.transaction_type === 'withdrawal' ? 'text-green-500' :
                                                transaction.transaction_type === 'deposit' ? 'text-red-500' : ''
                                        }`}
                                    >
                                        {transaction.transaction_type === 'withdrawal' ? `+${transaction.point}` :
                                            transaction.transaction_type === 'deposit' ? `-${transaction.point}` :
                                                transaction.point}
                                    </td>
                                    <td className="px-20 py-3 text-sm">{date}</td>
                                    <td className="px-20 py-3 text-sm">{time}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex items-center justify-between mt-4">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                    Previous
                </button>
                <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => (
                        <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-8 h-8 text-sm rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchTransaction;