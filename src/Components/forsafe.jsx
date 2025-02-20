import { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from 'axios';

export default function AddStadiumOverlay({ setIsOpenOverlay }) {
    const typeOptions = ["Badminton", "Soccer", "Football", "Table Tennis"];
    const facilityOptions = ["Parking", "Bathroom"];

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        stadium: "",
        phone: "",
        country: "",
        province: "",
        district: "",
        subDistrict: "",
        zipCode: "",
        addressLink: "",
        openHour: "",
        closeHour: "",
        selectedFacilities: [],
        selectedTypes: [],
        typeDetails: {},
    });

    const token = localStorage.getItem("token");

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleTypeChange = (selectedList) => {
        setFormData((prev) => ({
            ...prev,
            selectedTypes: selectedList.map((item) => item.name),
        }));
    };

    const handleTypeDetailChange = (type, field, value) => {
        setFormData((prev) => ({
            ...prev,
            typeDetails: {
                ...prev.typeDetails,
                [type]: { ...prev.typeDetails[type], [field]: value },
            },
        }));
    };

    const handleFacilityChange = (selectedList) => {
        setFormData((prev) => ({
            ...prev,
            selectedFacilities: selectedList.map((item) => item.name),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        if (files.length > 0) {
            console.log("Selected Files:", files);
        } else {
            console.log("No files selected.");
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "selectedTypes" || key === "typeDetails") {
                data.append(key, JSON.stringify(formData[key]));
            } else {
                data.append(key, formData[key]);
            }
        });

        files.forEach((file) => {
            data.append(`files`, file);
        });

        try {
            const response = await axios.post("http://localhost:3000/addStadium", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            console.log("Upload Successful:", response.data);
            setIsOpenOverlay(false);
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsOpenOverlay(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Main Modal */}
            <div className="bg-white w-full max-w-2xl h-fit max-h-screen rounded-xl px-5 py-5 border border-black shadow-lg relative">
                
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={() => setIsOpenOverlay(false)}
                >
                    ✖
                </button>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold text-center text-[#383E49]">Add New Stadium</h2>

                    {/* File Upload */}
                    <div className="flex flex-row justify-start items-center space-x-3">
                        <div className="w-14 h-14 bg-[#D0D3D9] rounded-full"></div>
                        <label className="cursor-pointer text-[#383E49]">
                            {files.length === 0 ? "Add Images" : `${files.length} Images Selected`}
                            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden"/>
                        </label>
                    </div>

                    {/* Stadium Name & Phone */}
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[48%]">
                            <p className="font-semibold text-[#383E49]">Stadium</p>
                            <input type="text" placeholder="Enter Stadium Name" value={formData.stadium}
                                onChange={(e) => handleInputChange("stadium", e.target.value)}
                                className="px-3 w-full h-10 border border-[#B9BDC7] rounded-md"/>
                        </div>
                        <div className="w-[48%]">
                            <p className="font-semibold text-[#383E49]">Phone Number</p>
                            <input type="text" placeholder="Enter phone number" value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                className="px-3 w-full h-10 border border-[#B9BDC7] rounded-md"/>
                        </div>
                    </div>

                    {/* Country & Province */}
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[48%]">
                            <p className="font-semibold text-[#383E49]">Country</p>
                            <input type="text" placeholder="Enter Country" value={formData.country}
                                onChange={(e) => handleInputChange("country", e.target.value)}
                                className="px-3 w-full h-10 border border-[#B9BDC7] rounded-md"/>
                        </div>
                        <div className="w-[48%]">
                            <p className="font-semibold text-[#383E49]">Province</p>
                            <input type="text" placeholder="Enter Province" value={formData.province}
                                onChange={(e) => handleInputChange("province", e.target.value)}
                                className="px-3 w-full h-10 border border-[#B9BDC7] rounded-md"/>
                        </div>
                    </div>

                    {/* Facilities & Types */}
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[48%]">
                            <p className="font-semibold text-[#383E49]">Facilities</p>
                            <Multiselect options={facilityOptions.map((facility) => ({ name: facility, id: facility }))}
                                selectedValues={formData.selectedFacilities.map((facility) => ({ name: facility, id: facility }))}
                                onSelect={handleFacilityChange} onRemove={handleFacilityChange}
                                displayValue="name" showCheckbox={true} closeOnSelect={false} placeholder="Select Facilities"/>
                        </div>
                        <div className="w-[48%]">
                            <p className="font-semibold text-[#383E49]">Types</p>
                            <Multiselect options={typeOptions.map((type) => ({ name: type, id: type }))}
                                selectedValues={formData.selectedTypes.map((type) => ({ name: type, id: type }))}
                                onSelect={handleTypeChange} onRemove={handleTypeChange}
                                displayValue="name" showCheckbox={true} closeOnSelect={false} placeholder="Select Types"/>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button className="border px-6 py-2 rounded-lg text-gray-700 border-gray-400" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
