import { useState } from "react";

export default function NotificationComponent({ onClose }) {
    const newReservations = 3;
    const paymentReceived = 1;
    const feedbacks = [
        { text: "สนามดีมาก ตอบดีๆ มีมารยาท + เสียงเครื่องดนตรีไทยบรรเลง มาเชียร์ตลอดเลย", rating: 4.5 },
        { text: "บรรยากาศดีมาก สนุกสุดๆ", rating: 4.7 },
        { text: "อาหารแพงไปหน่อย", rating: 4.2 },
        { text: "พื้นที่จอดรถกว้างขวาง", rating: 4.6 },
        { text: "เสียงพากย์ดังเกินไป", rating: 4.3 },
        { text: "พนักงานเป็นมิตร", rating: 4.8 },
        { text: "ห้องน้ำสะอาด", rating: 4.5 },
    ];



    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[600px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-center mb-4">Notification</h2>

                {/* New Reservations */}
                <div className="flex justify-between items-center p-3 border rounded-lg mb-3">
                    <span className="font-medium">New Reservations</span>
                    <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full">
              {newReservations}
            </span>
                </div>

                {/* Payment Received */}
                <div className="flex justify-between items-center p-3 border rounded-lg mb-3">
                    <span className="font-medium">Payment Received</span>
                    <span className="bg-green-100 text-green-500 px-3 py-1 rounded-full">
              {paymentReceived}
            </span>
                </div>

                {/* Feedback Section (Scrollable) */}
                <div className="border rounded-lg p-3">
                    <h3 className="font-bold mb-2">New FEEDBACK</h3>
                    <div className="max-h-[200px] overflow-y-auto space-y-2 pr-4">
                        {feedbacks.map((feedback, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                                <span className="text-gray-600 text-sm">{feedback.text}</span>
                                <span className="text-yellow-500 font-bold">★ {feedback.rating}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Close Button */}
                <div className="text-center mt-4">
                    <button
                        className="bg-black text-white px-6 py-2 rounded-full"
                        onClick={onClose}
                    >
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
}
