import { useState } from "react";
import DateTimeDisplay from "./Time";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

export default function BookingComponent() {

  const [activeTab, setActiveTab] = useState("Booking");
  const [statusFilter, setStatusFilter] = useState("Ongoing");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePopup, setActivePopup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };
  const handleNavClick = (name) => {
    setActiveTab(name);
  };
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const bookings = [
    { id: "#7010", name: "John Doe", contact: "(081) 234-5678", stadium: "Bangkok Arena", facility: "Badminton", status: "Confirmed", amount: 150 },
    { id: "#7021", name: "Jane Smith", contact: "(082) 345-6789", stadium: "Bangkok Arena", facility: "Football", status: "Cancelled", amount: 200 },
    { id: "#7032", name: "Alice Johnson", contact: "(091) 456-7890", stadium: "Sriracha Arena", facility: "Basketball", status: "Confirmed", amount: 450 },
    { id: "#7043", name: "Michael Brown", contact: "(092) 567-8901", stadium: "Sriracha Arena", facility: "Tennis", status: "Confirmed", amount: 300 },
    { id: "#7054", name: "David Wilson", contact: "(093) 678-9012", stadium: "Bangkok Arena", facility: "Badminton", status: "Cancelled", amount: 200 },
    { id: "#7065", name: "Emily White", contact: "(094) 789-0123", stadium: "Sriracha Arena", facility: "Football", status: "Confirmed", amount: 500 },
    { id: "#7076", name: "Chris Anderson", contact: "(095) 890-1234", stadium: "Bangkok Arena", facility: "Basketball", status: "Confirmed", amount: 150 },
    { id: "#7088", name: "Jessica Thomas", contact: "(096) 901-2345", stadium: "Bangkok Arena", facility: "Tennis", status: "Completed", amount: 150 },
    { id: "#7099", name: "Daniel Martinez", contact: "(097) 012-3456", stadium: "Sriracha Arena", facility: "Badminton", status: "Confirmed", amount: 300 },
    { id: "#7100", name: "Sophia Gonzalez", contact: "(098) 123-4567", stadium: "Sriracha Arena", facility: "Basketball", status: "Cancelled", amount: 450 },
    { id: "#7101", name: "Lucas Hernandez", contact: "(099) 234-5678", stadium: "Bangkok Arena", facility: "Football", status: "Confirmed", amount: 450 },
    { id: "#7102", name: "Mia Carter", contact: "(089) 345-6789", stadium: "Sriracha Arena", facility: "Tennis", status: "Cancelled", amount: 200 },
    { id: "#7103", name: "Ethan Lopez", contact: "(078) 456-7890", stadium: "Bangkok Arena", facility: "Badminton", status: "Completed", amount: 150 },
    { id: "#7104", name: "Ava Scott", contact: "(067) 567-8901", stadium: "Sriracha Arena", facility: "Basketball", status: "Confirmed", amount: 500 },
    { id: "#7105", name: "Liam Nelson", contact: "(056) 678-9012", stadium: "Bangkok Arena", facility: "Football", status: "Cancelled", amount: 300 },
    { id: "#7106", name: "Olivia Perez", contact: "(045) 789-0123", stadium: "Sriracha Arena", facility: "Tennis", status: "Confirmed", amount: 200 },
    { id: "#7107", name: "Noah Adams", contact: "(034) 890-1234", stadium: "Bangkok Arena", facility: "Badminton", status: "Cancelled", amount: 400 },
    { id: "#7108", name: "Emma Taylor", contact: "(023) 901-2345", stadium: "Sriracha Arena", facility: "Basketball", status: "Confirmed", amount: 150 },
    { id: "#7109", name: "William Rodriguez", contact: "(012) 012-3456", stadium: "Bangkok Arena", facility: "Football", status: "Cancelled", amount: 350 },
    { id: "#7110", name: "Samantha Clark", contact: "(011) 123-4567", stadium: "Sriracha Arena", facility: "Tennis", status: "Confirmed", amount: 200 },
    { id: "#7111", name: "Benjamin Lewis", contact: "(010) 234-5678", stadium: "Bangkok Arena", facility: "Badminton", status: "Completed", amount: 100 },
    { id: "#7112", name: "Charlotte Young", contact: "(009) 345-6789", stadium: "Sriracha Arena", facility: "Basketball", status: "Confirmed", amount: 450 },
    { id: "#7113", name: "James Hall", contact: "(008) 456-7890", stadium: "Bangkok Arena", facility: "Football", status: "Cancelled", amount: 500 }
  ];

  const filteredBookings = bookings.filter((booking) => {
    if (statusFilter === "Ongoing" && booking.status === "Completed") return false;
    if (statusFilter === "Completed" && booking.status !== "Completed") return false;
    if (filter !== "All" && booking.status !== filter && statusFilter !== "Completed") return false;

    return booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.includes(searchQuery);
  });

  const handleClick = () => {
    setShowPopup(true);
  };
  const handleCheckAvailability = () => {
    navigate("/facility");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 11;
  const totalPages = Math.ceil(filteredBookings.length / postPerPage);
  const startIndex = (currentPage - 1) * postPerPage;
  const endIndex = startIndex + postPerPage;
  const bookingsToDisplay = filteredBookings.slice(startIndex, endIndex);


  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className="flex flex-row h-screen">

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">

        {/* Accout , Notification , Coin */}
        <div className="flex justify-end space-x-8 pb-2">
          <div className="flex item-center space-x-2">
            <img src="/diamon.png" alt="Coin" className="w-8 h-8" />
            <span><p class="font-semibold">2,000</p></span>
          </div>
          <div>
            <img src="/notification.png" alt="Notification" className="w-8 h-8" />
          </div>
          <div>
            <img src="/user.png" alt="Account" className="w-8 h-8" />
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="mx-auto">
            <DateTimeDisplay />
          </div>
          <button onClick={handleOpenPopup} className="bg-[#0F53B3] text-white px-4 py-2 rounded">
            Create Booking
          </button>
        </div>

        {showPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleClosePopup}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-[500px] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-center">Create Booking</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Client name</label>
                  <input type="text" placeholder="Enter client name" className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone number</label>
                  <input type="text" placeholder="Enter phone number" className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Stadium</label>
                  <select className="w-full border px-3 py-2 rounded-md">
                    <option>Select stadium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Facility Type</label>
                  <select className="w-full border px-3 py-2 rounded-md">
                    <option>Select Facility</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input type="date" className="w-full border px-3 py-2 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Select Period</label>
                  <select className="w-full border px-3 py-2 rounded-md">
                    <option>Select Time Period</option>
                  </select>
                </div>
              </div>

              {/*Cancel & Check Availability */}
              <div className="flex justify-end mt-4">
                <button onClick={handleClosePopup} className="px-4 py-2 border rounded-md mr-2">
                  Cancel
                </button>
                <button className="bg-[#0F53B3] text-white px-4 py-2 rounded"
                  onClick={handleCheckAvailability}>
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center w-full pb-4">
          {/* ปุ่ม Ongoing / Completed */}
          <div className="flex gap-4">
            {["Ongoing", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-md border border-gray-300 ${statusFilter === status ? "text-[#0F50AA] bg-[#E8F1FD] border-[#1570EF]" : "bg-white text-gray-700"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* ปุ่ม All, Confirmed, Cancelled */}
          {statusFilter !== "Completed" && (
            <div className="flex gap-2">
              {["All", "Confirmed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-md border border-gray-300 ${filter === status ? "text-[#0F50AA] bg-[#E8F1FD] border-[#1570EF]" : "text-gray-700"
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Show Table and kebab menu */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Reservation ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Contact</th>
                <th className="p-2 text-left">Stadium</th>
                <th className="p-2 text-left">Facility</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingsToDisplay.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-2">{booking.id}</td>
                  <td className="p-2">{booking.name}</td>
                  <td className="p-2">{booking.contact}</td>
                  <td className="p-2">{booking.stadium}</td>
                  <td className="p-2">{booking.facility}</td>
                  <td className="p-2">
                    <span
                      className={`px-4 py-1 rounded-full font-bold ${booking.status === "Completed"
                        ? "bg-[#E7F8F0] text-[#41C588]"
                        : booking.status === "Confirmed"
                          ? "bg-[#E7F8F0] text-[#41C588]"
                          : "bg-[#FEECEB] text-[#F36960]"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-2">{booking.amount}</td>
                  <td className="p-2 flex items-center justify-start space-x-2">
                    {/* กดไอคอนเพื่อเปิด Modal */}
                    <Icon
                      icon="mdi:dots-vertical"
                      width="24"
                      height="24"
                      className="ml-2 cursor-pointer text-gray-600 hover:text-black"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center w-full mt-4">

          {/* Previous Page Button */}
          <button
            className={`px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded 
      ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded transition-all ${currentPage === index + 1
                  ? "text-[#0F50AA] bg-[#E8F1FD]"
                  : "bg-white text-gray-600 hover:bg-[#F3F4F6]"
                  }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Next Page Button */}
          <button
            className={`px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded 
      ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>

        </div>
      </div>

      {/* Show Detail Booking */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <Icon icon="lucide:x" width="24" height="24" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center border-b-2 border-gray-300 pb-2">
              Booking Detail
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <strong>Reservation ID:</strong> <span>{selectedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <strong>Client Name:</strong> <span>{selectedBooking.name}</span>
              </div>
              <div className="flex justify-between">
                <strong>Contact:</strong> <span>{selectedBooking.contact}</span>
              </div>
              <div className="flex justify-between">
                <strong>Stadium:</strong> <span>{selectedBooking.stadium}</span>
              </div>
              <div className="flex justify-between">
                <strong>Facility Type:</strong> <span>{selectedBooking.facility}</span>
              </div>
              <div className="flex justify-between">
                <strong>Amount:</strong> <span>{selectedBooking.amount}</span>
              </div>
              <div className="flex justify-between">
                <strong>Status:</strong> <span>{selectedBooking.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}