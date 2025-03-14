import { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function EditStadiumOverlay({ setIsOpenEditOverlay, stadiumId, stadium }) {
    const typeOptions = ["Badminton", "Soccer", "Football", "Table Tennis"];
    const facilityOptions = ["Parking", "Bathroom"];

    console.log("From Edit", stadium);

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
        openHour: null, // Will store { value: "08:00:00", label: "08:00:00" }
        closeHour: null, // Will store { value: "23:00:00", label: "23:00:00" }
        selectedFacilities: [],
        selectedTypes: [],
        typeDetails: {},
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (stadium) {
            const locationParts = stadium.location.split(", ").map(part => part.trim());
            setFormData(prevFormData => ({
                ...prevFormData,
                stadium: stadium.name || "",           // "Arena"
                phone: stadium.phone_number || "",     // "0800536270"
                province: locationParts[0] || "",      // "Chachoengsao"
                district: locationParts[1] || "",      // "Khlong Khuean"
                openHour: stadium.open_hour ? { value: stadium.open_hour, label: stadium.open_hour } : null, // Format for Select
                closeHour: stadium.close_hour ? { value: stadium.close_hour, label: stadium.close_hour } : null, // Format for Select
                addressLink: stadium.location_link || "", // Not in object, so empty
            }));
            if (stadium.pictures && stadium.pictures.length > 0) {
                setFiles(stadium.pictures); // ["http://localhost:3000/uploads/imageNotFound.jpg"]
            }
        }
    }, [stadium]);

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
        console.log("Updated Form Data:", formData);

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "selectedTypes" || key === "typeDetails") {
                data.append(key, JSON.stringify(formData[key]));
            } else if (key === "openHour" && formData[key]?.value) {
                data.append(key, formData[key].value);
            } else if (key === "closeHour" && formData[key]?.value) {
                data.append(key, formData[key].value);
            } else {
                data.append(key, formData[key]);
            }
        });

        files.forEach((file) => {
            data.append("files", file);
        });

        try {
            const response = await axios.put(`http://localhost:3000/stadium/${stadiumId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Update Successful:", response.data);
            setIsOpenEditOverlay(false);
        } catch (error) {
            console.error("Error updating stadium:", error);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsOpenEditOverlay(false);
    };

    const hours = Array.from({ length: 24 }, (_, index) => {
        const hour = index.toString().padStart(2, "0") + ":00:00";
        return { value: hour, label: hour };
    });

    const handleHourChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
            ...(field === "openHour" ? { closeHour: null } : {}), // Reset closeHour if openHour changes
        }));
    };

    const getFilteredCloseHours = () => {
        if (!formData.openHour) return hours;
        return hours.filter((hour) => hour.value > formData.openHour.value);
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl min-h-[80vh] h-fit max-h-screen rounded-xl px-3 py-3 border-[1px] border-black overflow-auto z-50">
                <div>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {/* Image Upload */}
                        <div className="flex flex-row justify-start items-center space-x-3">
                            {files.length === 0 ? (
                                <div className="w-14 h-14 bg-[#D0D3D9] rounded-full flex justify-center items-center">
                                    <span className="text-[#383E49]">+</span>
                                </div>
                            ) : (
                                files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-14 h-14 bg-[#D0D3D9] rounded-full flex justify-center items-center overflow-hidden"
                                    >
                                        <img
                                            src={typeof file === "string" ? file : URL.createObjectURL(file)}
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

                        {/* Stadium and Phone (Read-only) */}
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Stadium</p>
                                <input
                                    type="text"
                                    value={formData.stadium}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Phone Number</p>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Address Fields (Read-only) */}
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Country</p>
                                <input
                                    type="text"
                                    value={formData.country}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Province</p>
                                <input
                                    type="text"
                                    value={formData.province}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">District</p>
                                <input
                                    type="text"
                                    value={formData.district}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Sub-District</p>
                                <input
                                    type="text"
                                    value={formData.subDistrict}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Zip Code</p>
                                <input
                                    type="text"
                                    value={formData.zipCode}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                            <div className="w-[45%]">
                                <p className="font-semibold text-[#383E49]">Address Link</p>
                                <input
                                    type="text"
                                    value={formData.addressLink}
                                    readOnly
                                    className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Open Hour and Close Hour (Editable) */}
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%] relative">
                                <p className="font-semibold text-[#383E49]">Open Hour</p>
                                <Select
                                    options={hours}
                                    value={formData.openHour}
                                    onChange={(value) => handleHourChange("openHour", value)}
                                    menuPlacement="auto"
                                    placeholder="Select Open Hour"
                                />
                                <Icon
                                    icon="ph:note-pencil-bold"
                                    className="absolute right-2 top-8 text-[#383E49]"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className="w-[45%] relative">
                                <p className="font-semibold text-[#383E49]">Close Hour</p>
                                <Select
                                    options={getFilteredCloseHours()}
                                    value={formData.closeHour}
                                    onChange={(value) => handleHourChange("closeHour", value)}
                                    placeholder="Select Close Hour"
                                />
                                <Icon
                                    icon="ph:note-pencil-bold"
                                    className="absolute right-2 top-8 text-[#383E49]"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>

                        {/* Facilities and Types (Editable) */}
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-[45%] relative">
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
                                <Icon
                                    icon="ph:note-pencil-bold"
                                    className="absolute right-2 top-8 text-[#383E49]"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className="w-[45%] relative">
                                <p className="font-semibold text-[#383E49]">Types</p>
                                <Multiselect
                                    options={typeOptions.map((type) => ({ name: type, id: type }))}
                                    selectedValues={formData.selectedTypes.map((type) => ({
                                        name: type,
                                        id: type,
                                    }))}
                                    onSelect={handleTypeChange}
                                    onRemove={handleTypeChange}
                                    displayValue="name"
                                    showCheckbox={true}
                                    closeOnSelect={false}
                                    placeholder="Select Types"
                                />
                                <Icon
                                    icon="ph:note-pencil-bold"
                                    className="absolute right-2 top-8 text-[#383E49]"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>

                        {/* Type Details (Court and Cost - Editable) */}
                        {formData.selectedTypes.map((type) => (
                            <div key={type} className="flex flex-row w-full justify-between">
                                <div className="w-[45%] relative">
                                    <p className="font-semibold text-[#383E49]">{type} Court</p>
                                    <input
                                        type="text"
                                        placeholder={`Enter ${type} Court`}
                                        value={formData.typeDetails[type]?.court || ""}
                                        onChange={(e) => handleTypeDetailChange(type, "court", e.target.value)}
                                        className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                    />
                                    <Icon
                                        icon="ph:note-pencil-bold"
                                        className="absolute right-2 top-8 text-[#383E49]"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div className="w-[45%] relative">
                                    <p className="font-semibold text-[#383E49]">{type} Cost / Hr</p>
                                    <input
                                        type="number"
                                        placeholder={`Enter ${type} Cost / Hr`}
                                        value={formData.typeDetails[type]?.cost || ""}
                                        onChange={(e) => handleTypeDetailChange(type, "cost", e.target.value)}
                                        className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                    />
                                    <Icon
                                        icon="ph:note-pencil-bold"
                                        className="absolute right-2 top-8 text-[#383E49]"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Buttons */}
                        <div className="flex flex-row gap-3 justify-end">
                            <button
                                className="border-[1px] px-6 py-2 rounded-lg text-[#667085] border-[#858D9D]"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="border-[1px] px-6 py-2 rounded-lg bg-[#0F53B3] text-white"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}