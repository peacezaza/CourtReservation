import { Icon } from "@iconify/react";
import {useEffect} from "react";

export default function StadiumDetailsModal({ stadium, onClose }) {
    if (!stadium) return null;

    useEffect(() => {
        console.log(stadium);
    }, []);

    const handleClose = () => {
        onClose(); // เรียกใช้งาน onClose ที่มาจาก prop
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
                {/* ปุ่มปิด Modal */}
                <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 z-50" onClick={() => {handleClose()}}>
                    <Icon icon="mdi:close" className="w-6 h-6" />
                </button>

                {/* เนื้อหา Modal */}
                <div className="flex flex-col items-center gap-4 p-4  ">
                    <img src={stadium.pictures[0]} alt={stadium.name} className="w-full h-46 object-cover rounded-lg" />
                    <h2 className="text-xl font-semibold mt-3">{stadium.name}</h2>
                    <p className="text-gray-500">{stadium.location}</p>
                    <div className="flex items-center mt-2">
                        <Icon icon="mdi:star" className="w-5 h-5 text-yellow-500" />
                        <span className="ml-1">{stadium.rating}</span>
                    </div>
                    {stadium.underMaintenance && (
                        <p className="text-red-500 mt-2">⚠️ Currently under maintenance</p>
                    )}
                </div>
            </div>
        </div>
    );
}