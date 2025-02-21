import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import StadiumDetailsModal from "./StadiumDetailsModal";

export default function StadiumCard({ name, location, rating, image, underMaintenance }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const stadium = { name, location, rating, image, underMaintenance };

    // ปิดเมนูเมื่อคลิกข้างนอก
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClose = () => {
        setIsModalOpen(false); // ทำการปิด modal
    };

    return (
        <div
            className="relative rounded-2xl shadow-lg overflow-hidden w-80 cursor-pointer"

        >
            <div className="h-48 w-full relative"
                 onClick={() => setIsModalOpen(true)}
            >
                <img src={image} alt={name} className="w-full h-full object-cover" />
                {underMaintenance && (
                    <div className="absolute inset-0 bg-yellow-300 bg-opacity-70 flex justify-center items-center">
                        <Icon icon="mdi:tools" className="w-20 h-20 text-yellow-700" />
                    </div>
                )}
            </div>

            <div className="p-4"
                 onClick={() => setIsModalOpen(true)}>
                <p className="text-gray-500 text-sm">Entire Stadium · 4 courts</p>
                <h3 className="font-semibold text-lg">{name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Icon icon="mdi:map-marker" className="w-5 h-5 mr-1" />
                    {location}
                </div>
                <div className="flex items-center mt-2">
                    <Icon icon="mdi:star" className="w-5 h-5 text-yellow-500" />
                    <span className={`ml-1 ${underMaintenance ? "text-red-500" : ""}`}>{rating}</span>
                    <span className="text-gray-400 ml-1">(122)</span>
                </div>
            </div>

            {/* จุดสามจุด */}
            <div className="absolute bottom-4 right-4" ref={menuRef}>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <Icon icon="mdi:dots-vertical" className="w-6 h-6 text-gray-600" />
                </button>

                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-10">
                        <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => alert("Maintenance clicked")}
                        >
                            Maintenance
                        </button>
                        <button
                            className="w-full text-left px-4 py-2 text-orange-600 hover:bg-gray-100"
                            onClick={() => alert("Edit clicked")}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
            {isModalOpen && <StadiumDetailsModal stadium={stadium} onClose={handleClose} />}
        </div>
    );
}