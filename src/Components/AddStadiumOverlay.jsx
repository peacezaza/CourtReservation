import {useState} from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from 'axios';


export default function AddStadiumOverlay({setIsOpenOverlay}){


    const typeOptions = ["Badminton", "Soccer", "Football", "Table Tennis"];
    const facilityOptions = ["Parking", "Bathroom"]

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

    const token = localStorage.getItem("token")

    // Handle file upload
    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    // Handle basic input change
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Handle multi-select dropdown
    const handleTypeChange = (selectedList) => {
        setFormData((prev) => ({
            ...prev,
            selectedTypes: selectedList.map((item) => item.name),
        }));
    };

    // Handle court & cost input changes
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
            selectedFacilities: selectedList.map((item) => item.name), // Store selected facility names
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
            } else {
                data.append(key, formData[key]);
            }
        });
        // Append files (assuming `files` is an array of File objects)
        files.forEach((file, index) => {
            data.append(`files`, file); // If multiple files, backend should handle array
        });

        try {
            const response = await axios.post("http://localhost:3000/addStadium", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
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
    }

    const resetForm = () => {
        setFormData({
            country: "",
            province: "",
            district: "",
            subDistrict: "",
            zipCode: "",
            addressLink: "",
            photo: null, // Reset photo
        });
        setFiles([]); // Clear files state
    };



    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* Main Modal */}
        <div
            className="bg-white w-full max-w-2xl h-fit max-h-screen rounded-xl px-3 py-3 border-[1px] border-black overflow-auto">
            <div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-start items-center space-x-3 ">
                        <div className="w-14 h-14 bg-[#D0D3D9] rounded-full"></div>
                        <div>
                            <label className="cursor-pointer text-[#383E49]">
                                {files.length === 0 ? "Add Images" : `${files.length} Images Selected`}
                                <input type="file" accept="image/*" multiple onChange={handleFileChange}
                                       className="hidden"/>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Stadium</p>
                            <input type="text" placeholder="Enter Stadium Name" value={formData.stadium}
                                   onChange={(e) => handleInputChange("stadium", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Phone Number</p>
                            <input type="text" placeholder="Enter phone number" value={formData.phone}
                                   onChange={(e) => handleInputChange("phone", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Country</p>
                            <input type="text" placeholder="Select Country"
                                   value={formData.country}
                                   onChange={(e) => handleInputChange("country", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Province</p>
                            <input type="text" placeholder="Select Province"
                                   value={formData.province}
                                   onChange={(e) => handleInputChange("province", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">District</p>
                            <input type="text" placeholder="Select District"
                                   value={formData.district}
                                   onChange={(e) => handleInputChange("district", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Sub-District</p>
                            <input type="text" placeholder="Select Sub-District"
                                   value={formData.subDistrict}
                                   onChange={(e) => handleInputChange("subDistrict", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Zip Code</p>
                            <input type="text" placeholder="Select Zip Code"
                                   value={formData.zipCode}
                                   onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Address Link</p>
                            <input type="text" placeholder="Enter Address Link"
                                   value={formData.addressLink}
                                   onChange={(e) => handleInputChange("addressLink", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Open Hour</p>
                            <input type="text" placeholder="Select Open Hour"
                                   value={formData.openHour}
                                   onChange={(e) => handleInputChange("openHour", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Close Hour</p>
                            <input type="text" placeholder="Select Close Hour"
                                   value={formData.closeHour}
                                   onChange={(e) => handleInputChange("closeHour", e.target.value)}
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Facilities</p>
                            {/*<input type="text" placeholder="Select Facilities"*/}
                            {/*       value={formData.facilities}*/}
                            {/*       onChange={(e) => handleInputChange("facilities", e.target.value)}*/}
                            {/*       className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>*/}
                            <Multiselect
                                options={facilityOptions.map((facility) => ({ name: facility, id: facility }))} // Format options
                                selectedValues={formData.selectedFacilities.map((facility) => ({ name: facility, id: facility }))} // Format selected values
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
                            <div className=" z-10 bg-white border-[1px] rounded ">
                                <Multiselect
                                    options={typeOptions.map((type) => ({ name: type, id: type }))}
                                    selectedValues={formData.selectedTypes.map((type) => ({ name: type, id: type }))}
                                    onSelect={handleTypeChange}
                                    onRemove={handleTypeChange}
                                    displayValue="name"
                                    showCheckbox={true}
                                    closeOnSelect={false}
                                    placeholder="Select Types"
                                />
                            </div>


                        </div>
                    </div>
                    {formData.selectedTypes.length > 0 && (
                        <div className="flex flex-col gap-5">
                            {formData.selectedTypes.map((type) => (
                                <div key={type} className="flex flex-row w-full justify-between">
                                    {/* Court Input */}
                                    <div className="w-[45%]">
                                        <p className="font-semibold text-[#383E49]">{type} Court</p>
                                        <input
                                            type="number"
                                            placeholder={`Enter number of ${type} Courts`}
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
                        </div>
                    )}
                    <div className="flex flex-row gap-3 justify-end">
                        <button className="border-[1px] px-6 py-2 rounded-lg text-[#667085] border-[#858D9D]" onClick={handleCancel}>Cancel</button>
                        <button type="Submit" className="border-[1px] px-6 py-2 rounded-lg bg-[#0F53B3] text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}