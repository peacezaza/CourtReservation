import { Icon } from "@iconify/react";
import { useState, useEffect, useRef } from "react";
import StadiumDetailsModal from "./StadiumDetailsModal";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import EditStadiumOverlay from "./EditStadiumOverlay";

export default function StadiumCard({ id, name, location, rating, pictures, availability, setIsFacility, setStadiumSelect }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isUnderMaintenance, setIsUnderMaintenance] = useState(!availability);
    const menuRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenEditOverlay, setIsOpenEditOverlay] = useState(false)
    const stadium = { id, name, location, rating, pictures, availability: isUnderMaintenance };

    // ปิดเมนูเมื่อคลิกข้างนอก
    useEffect(() => {
        // console.log(stadium.pictures[0]);
        console.log("isUnderMaintenance", isUnderMaintenance)
        console.log("availability", availability)
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClose = () => {
        setIsFacility(false); // ทำการปิด modal
    };

    const handleClick = () => {
        setIsFacility(true)
        setStadiumSelect(stadium)
        console.log("Click")
    }

    const toggleMaintenance = (id) => {
        setIsUnderMaintenance((prev) => {
            const updatedStatus = !prev; // Get the new toggled value
            console.log(!updatedStatus);  // Log the correct value

            const data = {
                stadium_id: id,
                status: !updatedStatus, // Use the correct toggled value
            };

            const token = localStorage.getItem("token");
            axios.put("http://localhost:3000/updateStadiumStatus", data, {
                headers: { 'Authorization': `Bearer ${token}` }
            }).then((response) => {
                console.log(response);
            });

            return updatedStatus; // Update the state
        });
    };
    const handleEditStadium = (event) => {
        console.log("Edit Stadium is Clicked\n")
        setIsOpenEditOverlay(true)
    }


    return (
        <div className="relative rounded-2xl shadow-lg overflow-hidden w-80 cursor-pointer">
            <div className="h-48 w-full relative" onClick={handleClick}>
                <img src={stadium.pictures[0]} alt={name} className="w-full h-full object-cover" />
                {isUnderMaintenance && (
                    <div className="absolute inset-0 bg-yellow-300 bg-opacity-70 flex justify-center items-center">
                        <Icon icon="mdi:tools" className="w-20 h-20 text-yellow-700" />
                    </div>
                )}
            </div>

            <div className="p-4" onClick={handleClick}>
                <p className="text-gray-500 text-sm">Entire Stadium · 4 courts</p>
                <h3 className="font-semibold text-lg">{name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Icon icon="mdi:map-marker" className="w-5 h-5 mr-1" />
                    {location}
                </div>
                <div className="flex items-center mt-2">
                    <Icon icon="mdi:star" className="w-5 h-5 text-yellow-500" />
                    <span className={`ml-1 ${availability ? "text-red-500" : ""}`}>{rating}</span>
                    <span className="text-gray-400 ml-1">(122)</span>
                </div>
            </div>




            <div className="absolute bottom-4 right-4">
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="cursor-pointer">
                        <Icon icon="mdi:dots-vertical" className="w-6 h-6 text-gray-600" />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 bottom-8 z-30 w-40 rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-yellow-100 text-yellow-700" : "text-yellow-700"}`}
                                            onClick={() => toggleMaintenance(stadium.id)}  // Call the function with the stadium.id when clicked
                                        >
                                            {isUnderMaintenance ? "Available" : "Set Maintenance"}
                                        </button>

                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`block w-full text-left px-4 py-2 text-sm ${active ? "bg-orange-100 text-orange-600" : "text-orange-600"
                                            }`}
                                            onClick={handleEditStadium}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            {isModalOpen && <StadiumDetailsModal stadium={stadium} onClose={handleClose} />}
            {isOpenEditOverlay && <div className="flex justify-center items-center h-full w-full">
                <EditStadiumOverlay setIsOpenEditOverlay={setIsOpenEditOverlay} />
            </div>}
        </div>
    );
}