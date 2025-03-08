import {useEffect, useState} from "react";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import axios from "axios";

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
        openHour: null,
        closeHour: null,
        selectedFacilities: [],
        selectedTypes: [],
        typeDetails: {},
    });


    const token = localStorage.getItem("token");

    // Handle file upload
    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    // Handle basic input change
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Handle multi-select dropdown for types
    const handleTypeChange = (selectedList) => {
        setFormData((prev) => ({
            ...prev,
            selectedTypes: selectedList.map((item) => item.name),
        }));
    };

    // Handle court & cost input changes for each selected type
    const handleTypeDetailChange = (type, field, value) => {
        setFormData((prev) => ({
            ...prev,
            typeDetails: {
                ...prev.typeDetails,
                [type]: { ...prev.typeDetails[type], [field]: value },
            },
        }));
    };

    // Handle multi-select dropdown for facilities
    const handleFacilityChange = (selectedList) => {
        setFormData((prev) => ({
            ...prev,
            selectedFacilities: selectedList.map((item) => item.name),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        if (files.length > 0) {
            console.log("Selected Files:", files);
        } else {
            console.log("No files selected.");
        }

        const data = new FormData();

        // Append text fields
        Object.keys(formData).forEach((key) => {
            if (key === "selectedTypes" || key === "typeDetails") {
                data.append(key, JSON.stringify(formData[key])); // Convert arrays & objects to JSON
            } else if (key === "openHour" && formData[key]?.value) {
                // Append only the value of openHour as a string
                data.append(key, formData[key].value);
            } else if (key === "closeHour" && formData[key]?.value) {
                // Append only the value of closeHour as a string
                data.append(key, formData[key].value);
            } else {
                data.append(key, formData[key]); // For other fields, append as is
            }
        });

        // Append files (assuming `files` is an array of File objects)
        files.forEach((file) => {
            data.append("files", file); // If multiple files, backend should handle array
        });

        try {
            const response = await axios.post("http://localhost:3000/addStadium", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });

            console.log("Upload Successful:", response.data);
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsOpenOverlay(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            country: "",
            province: "",
            district: "",
            subDistrict: "",
            zipCode: "",
            addressLink: "",
            selectedFacilities: [],
            selectedTypes: [],
            typeDetails: {},
        });
        setFiles([]); // Clear files state
    };

    const hours = Array.from({ length: 24 }, (_, index) => {
        const hour = index.toString().padStart(2, "0") + ":00:00";
        return { value: hour, label: hour };
    });

    const handleHourChange = (field, value) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "openHour" ? { closeHour: null } : {}),
        }));
    };

    const getFilteredCloseHours = () => {
        if (!formData.openHour) return hours;
        return hours.filter((hour) => hour.value > formData.openHour.value);
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1); // Remove the image at the specified index
        setFiles(updatedFiles); // Update the state
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl min-h-[80vh] h-fit max-h-screen rounded-xl px-3 py-3 border-[1px] border-black overflow-auto z-50">
                <div>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-row justify-start items-center space-x-3">
                            {files.length === 0 ? (
                                // Show the "Add Images" option if no images are selected
                                <div className="w-14 h-14 bg-[#D0D3D9] rounded-full flex justify-center items-center">
                                    <span className="text-[#383E49]">+</span>
                                </div>
                            ) : (
                                // Show thumbnails of the selected images
                                files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-14 h-14 bg-[#D0D3D9] rounded-full flex justify-center items-center overflow-hidden"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)} // Convert file to image URL
                                            alt={`Selected Image ${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-0 right-0 bg-white rounded-full p-1 text-xs text-red-600"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))
                            )}
                            <div>
                                <label className="cursor-pointer text-[#383E49]">
                                    {files.length === 0 ? "Add Images" : `${files.length} Images Selected`}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Stadium</p>
                                <input
                                    type="text"
                                    placeholder="Enter Stadium Name"
                                    value={formData.stadium}
                                    onChange={(e) => handleInputChange("stadium", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Phone Number</p>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Country</p>
                                <input
                                    type="text"
                                    placeholder="Select Country"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange("country", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Province</p>
                                <input
                                    type="text"
                                    placeholder="Select Province"
                                    value={formData.province}
                                    onChange={(e) => handleInputChange("province", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">District</p>
                                <input
                                    type="text"
                                    placeholder="Select District"
                                    value={formData.district}
                                    onChange={(e) => handleInputChange("district", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Sub-District</p>
                                <input
                                    type="text"
                                    placeholder="Select Sub-District"
                                    value={formData.subDistrict}
                                    onChange={(e) => handleInputChange("subDistrict", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Zip Code</p>
                                <input
                                    type="text"
                                    placeholder="Select Zip Code"
                                    value={formData.zipCode}
                                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Address Link</p>
                                <input
                                    type="text"
                                    placeholder="Enter Address Link"
                                    value={formData.addressLink}
                                    onChange={(e) => handleInputChange("addressLink", e.target.value)}
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Open Hour</p>
                                <Select
                                    options={hours}
                                    value={formData.openHour}
                                    onChange={(value) => handleHourChange("openHour", value)}
                                    menuPlacement="auto" // Ensures the dropdown is positioned correctly
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Close Hour</p>
                                <Select
                                    options={getFilteredCloseHours()}
                                    value={formData.closeHour}
                                    onChange={(value) => handleHourChange("closeHour", value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Facilities</p>
                                <Multiselect
                                    options={facilityOptions.map((facility) => ({
                                        name: facility,
                                        id: facility,
                                    }))}
                                    selectedValues={formData.selectedFacilities.map((facility) => ({
                                        name: facility,
                                        id: facility,
                                    }))}
                                    onSelect={handleFacilityChange}
                                    onRemove={handleFacilityChange}
                                    displayValue="name"
                                    showCheckbox={true}
                                    closeOnSelect={false}
                                    placeholder="Select Facilities"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Types</p>
                                <Multiselect
                                    options={typeOptions.map((type) => ({name: type, id: type}))}
                                    selectedValues={formData.selectedTypes.map((type) => ({name: type, id: type}))}
                                    onSelect={handleTypeChange}
                                    onRemove={handleTypeChange}
                                    displayValue="name"
                                    showCheckbox={true}
                                    closeOnSelect={false}
                                    placeholder="Select Types"
                                />
                            </div>
                        </div>

                        {formData.selectedTypes.map((type) => (
                            <div key={type} className="flex flex-row w-full justify-between">
                                {/* Court Input */}
                                <div className="w-[45%]">
                                    <p className="font-semibold text-[#383E49]">{type} Court</p>
                                    <input
                                        type="text"
                                        placeholder={`Enter ${type} Court`}
                                        value={formData.typeDetails[type]?.court || ""}
                                        onChange={(e) => handleTypeDetailChange(type, "court", e.target.value)}
                                        className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                    />
                                </div>

                                {/* Cost Input */}
                                <div className="w-[45%]">
                                    <p className="font-semibold text-[#383E49]">{type} Cost / Hr</p>
                                    <input
                                        type="number"
                                        placeholder={`Enter ${type} Cost / Hr`}
                                        value={formData.typeDetails[type]?.cost || ""}
                                        onChange={(e) => handleTypeDetailChange(type, "cost", e.target.value)}
                                        className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                    />
                                </div>
                            </div>
                        ))}


                        <div className="flex flex-row gap-3 justify-end">
                            <button className="border-[1px] px-6 py-2 rounded-lg text-[#667085] border-[#858D9D]"
                                    onClick={handleCancel}>Cancel
                            </button>
                            <button type="Submit"
                                    className="border-[1px] px-6 py-2 rounded-lg bg-[#0F53B3] text-white">Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
