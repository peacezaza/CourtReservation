import { useState } from "react";


export default function CreateBookingOverlay({ setIsOpenOverlay }) {

    const typeOptions = ["Badminton", "Soccer", "Football", "Table Tennis"];


    // กำหนดช่วงเวลา แบ่งเป็นช่วง ช่วงละ 1 ชม.
    const timeSlots = Array.from({ length: 9 }, (_, i) => {
        const startHour = 9 + i;
        const endHour = startHour + 1;
        return `${startHour.toString().padStart(2, '0')}:00 - ${endHour.toString().padStart(2, '0')}:00`;
    });

    const [files, setFiles] = useState([]);

    const [formData, setFormData] = useState({
        clientName: "",
        phoneNumber: "",
        stadium: "",
        facilityType: "",
        selectedTimeSlot: "",
        timePeriod: "",
    });



    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl p-6 border border-gray-300 shadow-lg">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-semibold">Client Name</label>
                            <input type="text" placeholder="Enter client name" value={formData.clientName}
                                   onChange={(e) => handleInputChange("clientName", e.target.value)}
                                   className="w-full p-2 border rounded" />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-semibold">Phone Number</label>
                            <input type="text" placeholder="Enter phone number" value={formData.phoneNumber}
                                   onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                   className="w-full p-2 border rounded" />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-semibold">Stadium</label>
                            <select value={formData.stadium}
                                    onChange={(e) => handleInputChange("stadium", e.target.value)}
                                    className="w-full p-2 border rounded">
                                <option value="">Select stadium</option>
                                <option value="All">All</option>
                                <option value="Arena">Arena</option>
                                <option value="Ryummit">Ryummit</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <p className="font-semibold text-[#383E49]">Sport Type</p>
                            <select value={formData.selectedSport} onChange={(e) => handleInputChange("selectedSport", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]">
                                <option value="">Select Sport</option>
                                {typeOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-semibold">Date</label>
                            <input type="date" value={formData.date}
                                   onChange={(e) => handleInputChange("date", e.target.value)}
                                   className="w-full p-2 border rounded" />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-semibold">Select Period</label>
                            <select value={formData.selectedTimeSlot} onChange={(e) => handleInputChange("selectedTimeSlot", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]">
                                <option value="">Select Time Period</option>
                                {timeSlots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" className="px-4 py-2 border rounded text-gray-700"
                                onClick={() => setIsOpenOverlay(false)}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Check Availability</button>
                    </div>
                </form>
            </div>
        </div>
    );
}