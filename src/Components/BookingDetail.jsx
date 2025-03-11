export default function BookingDetail({ booking, onClose, onCancel }) {
    if (!booking) return null; // ป้องกัน error กรณีไม่มีข้อมูล

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px] relative border-2 border-black ">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-1 text-center">Booking Details</h2>
                <hr className="mb-4 border-t border-gray-400" />
                <div className="space-y-2 text-gray-700 text-lg">
                    <div className="grid grid-cols-2 gap-y-1 gap-x-9">
                        <p className=" text-black">Reservation ID:</p> <p className="text-gray-400">#{booking.id}</p>
                        <p className=" text-black">Client Name:</p> <p className="text-gray-400">{booking.name}</p>
                        <p className=" text-black">Contact:</p> <p className="text-gray-400">{booking.contact}</p>
                        <p className=" text-black">Stadium:</p> <p className="text-gray-400">{booking.stadium}</p>
                        <p className=" text-black">Facility Type:</p> <p className="text-gray-400">{booking.facility}</p>
                        <p className=" text-black">Court Number:</p> <p className="text-gray-400">{booking.courtnumber}</p>
                        <p className=" text-black">Date:</p> <p className="text-gray-400">{booking.date}</p>
                        <p className=" text-black">Time:</p> <p className="text-gray-400">{booking.time}</p>
                        <p className=" text-black">Amount:</p> <p className="text-gray-400">${booking.amount}</p>
                        <p className=" text-black">Status:</p> <p className="text-gray-400">{booking.status}</p>
                    </div>
                </div>
                {/* {booking.status === "Confirmed" && (
                    <div className="mt-3 flex justify-center">
                        <button
                            onClick={() => onCancel(booking.id)}
                            className="font-bold mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-xl text-xl"
                        >
                            Cancel
                        </button>
                    </div>
                )} */}

            </div>
        </div>
    );
}