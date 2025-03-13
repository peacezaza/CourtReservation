import { Icon } from "@iconify/react";
import { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import UserAccountComponent from "./UserAccountComponent.jsx";
import NotificationComponent from "./NotificationComponent.jsx";




// ฟังก์ชันในการสุ่มสีที่ไม่ซ้ำกัน
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// ฟังก์ชันในการจัดการสีให้การจองใกล้กันมีสีต่างกัน
const getUniqueColorForBooking = (court, startTime, existingColors) => {
    let color;
    do {
        color = generateRandomColor();
    } while (existingColors.some(existingColor => existingColor.color === color && existingColor.court === court && existingColor.startTime === startTime));

    return color;
};

export default function Schedule() {
    const money = 2000;
    const [selectedDate, setSelectedDate] = useState(dayjs("2024-12-28")); // Default date
    const [selectedSport, setSelectedSport] = useState("Badminton"); // Default sport
    const [isOpenMenuAccount, setIsOpenMenuAccount] = useState(false);
    const [openUserAccount, setOpenUserAccount] = useState(null);
    const [openNotification, setOpenNotification] = useState(null);

    const [showCalendar, setShowCalendar] = useState(false);
    const typeOptions = ["Badminton", "Soccer", "Football", "Table Tennis"];

    let date = new Date();

    const formettedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)

    const startTime = "09:00";
    const endTime = "23:00";

    const getHour = (time) => parseInt(time.split(":")[0]);

    const totalSlots = getHour(endTime) - getHour(startTime);




    // Sample booking data (filtered by sport and date later)
    const bookingsData = {
        Badminton: {
            "2024-12-28": [
                { court: 1, name: "Andrew", startTime: "17:00", endTime: "20:00" },
                { court: 3, name: "Tate", startTime: "10:00", endTime: "14:00" },
                { court: 3, name: "Lewis", startTime: "17:00", endTime: "20:00" },
                { court: 6, name: "Bruce", startTime: "11:00", endTime: "15:00" },
                { court: 6, name: "Mave", startTime: "16:00", endTime: "20:00" },
                { court: 7, name: "Otis", startTime: "11:00", endTime: "15:00" },
                { court: 8, name: "Black", startTime: "11:00", endTime: "15:00" },
                { court: 8, name: "White", startTime: "16:00", endTime: "20:00" },
                { court: 9, name: "White", startTime: "11:00", endTime: "15:00" },
                { court: 9, name: "Whote", startTime: "11:00", endTime: "22:00" },
            ],
        },
        Soccer: {
            "2024-12-28": [
                { court: 1, name: "Soccer Team 1", startTime: "10:00", endTime: "12:00" },
                { court: 2, name: "Soccer Team 2", startTime: "13:00", endTime: "15:00" },
            ],
            "2024-12-27": [
                { court: 1, name: "Soccer Team 1", startTime: "10:00", endTime: "12:00" },
                { court: 2, name: "Soccer Team 2", startTime: "13:00", endTime: "15:00" },
            ],
        },
    };


    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(selectedDate);

    const handleOpenNotification = () => {
        setOpenNotification((prev) => !prev);
    };

    const handleOpenUserAccount = () => {
        setOpenUserAccount((prev) => !prev);
    };

    // Function to handle sport selection
    const handleSportChange = (sport) => {
        setSelectedSport(sport);
    };

    const formatDateForKey = (date) => {
        return date.format("YYYY-MM-DD"); // e.g., "2024-12-28"
    };

    // Get bookings based on selected sport and date
    const bookings = bookingsData[selectedSport]?.[formatDateForKey(selectedDate)] || [];



    const generateTimeSlots = (start, end) => {
        const slots = [];
        let current = dayjs(start, "HH:mm");
        const endTime = dayjs(end, "HH:mm").add(1, "hour"); // เพิ่ม 1 ชม. เช่น 23:00 → 00:00

        while (current.isBefore(endTime) || current.format("HH:mm") === "00:00") {
            slots.push(current.format("HH:mm"));
            current = current.add(1, "hour");
        }
        return slots;
    };

    const timeSlots = generateTimeSlots(startTime, endTime);

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: `100px repeat(${timeSlots.length}, 1fr)`, // คอลัมน์แรกเป็น label
        gap: "5px",
    };







    // Calculate the position and width of each booking based on startTime and endTime
    const getBookingStyle = (startTime, endTime) => {
        const startIndex = timeSlots.indexOf(startTime);
        const endIndex = timeSlots.indexOf(endTime);

        if (startIndex === -1 || endIndex === -1) return {}; // ป้องกัน error ถ้าเวลาไม่อยู่ใน list

        return {
            gridColumn: `${startIndex + 2} / ${endIndex + 2}`, // เพิ่ม offset 2 เพราะ column 1 เป็นเวลา
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5px",
            borderRadius: "4px",
            backgroundColor: "rgba(173, 216, 230, 0.5)", // สีอ่อนให้ดูง่าย
        };
    };

    let existingColors = [];



    return (
        <div className="grid grid-rows-10 h-screen overflow-x-auto">
            <div className="bg-white row-span-1">
                <div className="flex flex-col gap-3 py-1">
                    <div className="flex flex-row items-center justify-end space-x-5 mr-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <div>
                                <Icon icon="noto:coin" className="w-9 h-9" />
                            </div>
                            <div>{money}</div>
                        </div>
                        <div>
                            <button
                                onClick={() => handleOpenNotification(null)}
                                className="p-1 rounded-full hover:bg-gray-300"
                            >
                                <svg
                                    className="w-[32px] h-[32px] text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="black"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* MenuUser */}
                        <div className="relative">
                            <button
                                onClick={() => setIsOpenMenuAccount(!isOpenMenuAccount)}
                                className="p-2 rounded-full hover:bg-gray-300"
                            >
                                <svg
                                    className="w-8 h-8 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="black"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {isOpenMenuAccount && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">

                                    <div className="px-4 py-2 flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5 text-gray-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
                                        </svg>
                                        <span className="font-semibold">Tanapat</span>
                                    </div>
                                    <hr />
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2"
                                        onClick={() => handleOpenUserAccount(null)}
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
                                        </svg>
                                        <span>My Account</span>
                                    </button>
                                    <hr />
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2">
                                        <Icon
                                            icon="material-symbols:logout"
                                            className="w-5 h-5 text-gray-600"
                                        />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-3">
                        <div className="flex flex-row items-center">{formettedDate.toString()}</div>
                    </div>



                    {/* Sport Selection and Date Picker */}
                    <div className="flex flex-row items-center justify-start px-4">
                        {/* Sport Selection */}
                        <div className="flex space-x-2">
                            {typeOptions.map((sport) => (
                                <button
                                    key={sport}
                                    onClick={() => handleSportChange(sport)}
                                    className={`rounded-full border-2 py-1 px-4 ${selectedSport === sport ? "bg-[#0F53B3] text-white" : "bg-white text-black"}`}
                                >
                                    {sport}
                                </button>
                            ))}
                        </div>


                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* Date Picker */}
                            <div className="flex flex-row px-2">
                                <button
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    className="rounded-full border-2 py-1 px-4 bg-white text-gray-500 flex items-center"
                                >
                                    <Icon icon="mdi:calendar" className="w-6 h-6 text-gray-500" />
                                </button>

                                {/* Calendar - Only show when 'showCalendar' is true */}
                                {showCalendar && (
                                    <div className="absolute top-50 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-50 ">
                                        <DateCalendar
                                            value={selectedDate}
                                            onChange={(newDate) => {
                                                setSelectedDate(newDate);
                                                setShowCalendar(false); // Close calendar after selecting a date
                                            }}
                                        />
                                    </div>
                                )}

                                {/* <div className="absolute top-full left-0 z-50 bg-white shadow-lg p-2">
                                    <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
                                </div> */}
                            </div>


                        </LocalizationProvider>

                    </div>
                </div>
            </div>

            {/* Schedule Grid */}
            <div className="relative row-span-8 grid grid-cols-13 grid-rows-10 gap-1 p-2 bg-white mt-20">

                {/* Time Slots Header */}
                {["Court", ...timeSlots].map((time, index) => (
                    <div
                        key={index}
                        className="text-start font-medium text-gray-600 "
                        style={{
                            gridColumn: index + 1,
                            // width: "1px",
                            zIndex: 1, // ทำให้ข้อความอยู่ด้านบน
                        }}
                    >
                        {time}
                    </div>
                ))}

                {/* เส้นแบ่งช่วงเวลา (Grid Lines) */}
                {/* {timeSlots.map((_, index) => (
    <div
        key={index}
        className="border-l border-gray-300 absolute top-10 bottom-0 "
        style={{
            left: `calc(${(index + 1) * (100 / (totalSlots + 1))}%)`,  // ปรับให้คำนวณจาก totalSlots
           // width: "3px",
            zIndex: 0, // ให้อยู่ด้านล่าง
        }}
    />
))} */}


                {/* Court Labels */}
                {Array.from({ length: 9 }, (_, i) => i + 1).map((court) => (
                    <div
                        key={court}
                        className="text-center font-medium text-gray-600"
                        style={{ gridRow: court + 1, gridColumn: 1 }}
                    >
                        Court {court}
                    </div>
                ))}

                {/* Render Bookings */}
                {bookings.map((booking, index) => {
                    const color = getUniqueColorForBooking(booking.court, booking.startTime, existingColors);
                    existingColors.push({ color, court: booking.court, startTime: booking.startTime });

                    return (
                        <div
                            key={index}
                            className="relative rounded-xl p-2 text-white font-medium"
                            style={{
                                ...getBookingStyle(booking.startTime, booking.endTime),
                                gridRow: booking.court + 1,
                                backgroundColor: color,
                            }}
                        >
                            {booking.name}
                        </div>
                    );

                })}
            </div>


            {openNotification && (
                <NotificationComponent onClose={() => setOpenNotification(null)} />
            )}
            {openUserAccount && (
                <UserAccountComponent onClose={() => setOpenUserAccount(null)} />
            )}
        </div>
    );
}