import {useState} from "react";
import Multiselect from "multiselect-react-dropdown";


export default function AddStadiumOverlay(){
    const [files, setFiles] = useState([]);
    const [ selectType, setSelectedType ] =useState([]);
    const [typeDetails, setTypeDetails] = useState({});
    const [ isTypeOpen, setIsTypeOpen ] = useState(false);

    const typeOptions = ["badminton", "soccer", "football", "table tennis"]

    const handleInputChange = (type, field, value) => {
        setTypeDetails((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value,
            },
        }));
    };



    return(
        <div
            className="bg-white w-full max-w-2xl h-fit max-h-screen rounded-xl px-3 py-3 border-[1px] border-black overflow-auto">

            <div>
                <form className="flex flex-col gap-5">
                    <div className="flex flex-row justify-start items-center space-x-3 ">
                        <div className="w-14 h-14 bg-[#D0D3D9] rounded-full"></div>
                        <div>
                            <label className=" cursor-pointer text-[#383E49]">
                                {files.length === 0 ? "Add Images" : `${files.length} Images Selected`}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    // onChange={handleFileChange}
                                    className="hidden" // Hide the default input
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Stadium</p>
                            <input type="text" placeholder="Enter Stadium Name"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Phone Number</p>
                            <input type="text" placeholder="Enter phone number"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Country</p>
                            <input type="text" placeholder="Select Country"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Province</p>
                            <input type="text" placeholder="Select Province"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">District</p>
                            <input type="text" placeholder="Select District"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Sub-District</p>
                            <input type="text" placeholder="Select Sub-District"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Zip Code</p>
                            <input type="text" placeholder="Select Zip Code"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Address Link</p>
                            <input type="text" placeholder="Enter Address Link"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Open Hour</p>
                            <input type="text" placeholder="Select Open Hour"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Close Hour</p>
                            <input type="text" placeholder="Select Close Hour"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Facilities</p>
                            <input type="text" placeholder="Select Facilities"
                                   className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"/>
                        </div>
                        <div className="w-[45%]">
                            <p className="font-semibold text-[#383E49]">Types</p>
                            {/*<input type="text"*/}
                            {/*       placeholder="Select Types"*/}
                            {/*       // value={typeOptions}*/}
                            {/*       className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"*/}
                            {/*/>*/}

                            {/*<div className="text-[#383E49] flex flex-row justify-between  items-center px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7] " onClick={() => setIsTypeOpen(!isTypeOpen)}>*/}
                            {/*    <span className="">{selectType.length > 0 ? selectType.join(",") : "Select options"}</span>*/}
                            {/*    <span>{isTypeOpen ? "▲" : "▼"}</span>*/}
                            {/*</div>*/}

                            {/*{isTypeOpen && (*/}
                            <div className=" z-10 bg-white border-[1px] rounded ">
                                <Multiselect
                                    options={typeOptions.map(type => ({
                                        name: type,
                                        id: type
                                    }))} // Convert array to objects
                                    selectedValues={selectType.map(type => ({name: type, id: type}))}
                                    onSelect={(selectedList) => setSelectedType(selectedList.map(item => item.name))}
                                    onRemove={(selectedList) => setSelectedType(selectedList.map(item => item.name))}
                                    displayValue="name"
                                    showCheckbox={true}
                                    closeOnSelect={false} // Keep dropdown open when selecting items
                                    placeholder="Select Types"
                                />
                            </div>
                            {/*)}*/}

                            {/*<Dropdown className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]" options={typeOptions} value={typeOptions[0]}*/}
                            {/*          placeholder="Select an option"/>*/}

                        </div>
                    </div>
                    {selectType.length > 0 && (
                        <div className="flex flex-col gap-5">
                            {selectType.map((type) => (
                                <div key={type} className="flex flex-row w-full justify-between">
                                    {/* Court Input */}
                                    <div className="w-[45%]">
                                        <p className="font-semibold text-[#383E49]">{type} Court</p>
                                        <input
                                            type="number"
                                            placeholder={`Enter number of ${type} Courts`}
                                            value={typeDetails[type]?.court || ""}
                                            onChange={(e) => handleInputChange(type, "court", e.target.value)}
                                            className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                        />
                                    </div>

                                    {/* Cost Input */}
                                    <div className="w-[45%]">
                                        <p className="font-semibold text-[#383E49]">{type} Cost / Hr</p>
                                        <input
                                            type="number"
                                            placeholder={`Enter ${type} Cost / Hr`}
                                            value={typeDetails[type]?.cost || ""}
                                            onChange={(e) => handleInputChange(type, "cost", e.target.value)}
                                            className="px-2 w-full h-10 border-[1px] rounded-md border-[#B9BDC7]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-row gap-3 justify-end">
                        <button className="border-[1px] px-6 py-2 rounded-lg text-[#667085] border-[#858D9D]">Cancle</button>
                        <button className="border-[1px] px-6 py-2 rounded-lg bg-[#0F53B3] text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
