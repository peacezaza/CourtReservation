import { useState } from "react";

// const reviewData = [
//     { Name: "Mark", Review: "Food could be better", Stadium: "Arena", Score: "4.5" },
//     { Name: "Christian", Review: "Facilities are not enough for amount paid.", Stadium: "Ryummit", Score: "4.4" },
//     { Name: "Alexander", Review: "Good.", Stadium: "Arena", Score: "4.6" },
//     { Name: "Sophia", Review: "Amazing atmosphere!", Stadium: "Grand Dome", Score: "4.8" },
//     { Name: "Liam", Review: "Too crowded on weekends.", Stadium: "Elite Stadium", Score: "4.2" },
//     { Name: "Olivia", Review: "Clean and well-maintained.", Stadium: "Arena", Score: "4.7" },
//     { Name: "Noah", Review: "Parking space is limited.", Stadium: "Ryummit", Score: "4.3" },
//     { Name: "Emma", Review: "Great facilities and friendly staff.", Stadium: "Grand Dome", Score: "4.9" },
//     { Name: "William", Review: "Needs better seating arrangements.", Stadium: "Elite Stadium", Score: "4.0" },
//     { Name: "James", Review: "Best stadium experience ever!", Stadium: "Arena", Score: "5.0" },
//     { Name: "Mia", Review: "Could use more food variety.", Stadium: "Ryummit", Score: "4.1" },
//     { Name: "Benjamin", Review: "Easy to find location.", Stadium: "Grand Dome", Score: "4.7" },
//     { Name: "Ava", Review: "A bit overpriced for the experience.", Stadium: "Elite Stadium", Score: "4.2" },
//     { Name: "Ethan", Review: "Security checks are too slow.", Stadium: "Arena", Score: "4.3" },
//     { Name: "Charlotte", Review: "Loved the vibe and energy.", Stadium: "Ryummit", Score: "4.9" },
//     { Name: "Lucas", Review: "Bathrooms need better maintenance.", Stadium: "Grand Dome", Score: "4.4" },
//     { Name: "Amelia", Review: "Perfect spot for sports lovers.", Stadium: "Elite Stadium", Score: "5.0" },
//     { Name: "Henry", Review: "Lighting at night is too dim.", Stadium: "Arena", Score: "4.2" },
//     { Name: "Harper", Review: "Great stadium, but too noisy.", Stadium: "Ryummit", Score: "4.6" },
//     { Name: "Daniel", Review: "Would definitely come back!", Stadium: "Grand Dome", Score: "4.8" }
// ];

const itemsPerPage = 5;

export default function ReviewComponent({ onClose, fullReview}) {
    const reviewData = fullReview

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStadium, setSelectedStadium] = useState(""); // สำหรับเลือกสนาม
    const [filteredReviews, setFilteredReviews] = useState(reviewData);

    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

    // ดึงข้อมูลรีวิวที่ต้องแสดงในหน้าปัจจุบัน
    const currentReviews = filteredReviews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // ดึงชื่อสนามทั้งหมด
    const stadiums = [...new Set(reviewData.map(review => review.Stadium))];

    // ฟังก์ชันกรองข้อมูลตามสนาม
    const handleStadiumChange = (event) => {
        const selected = event.target.value;
        setSelectedStadium(selected);

        if (selected === "") {
            setFilteredReviews(reviewData); // ถ้าไม่มีการเลือกสนาม ให้แสดงทั้งหมด
        } else {
            setFilteredReviews(reviewData.filter(review => review.Stadium === selected));
        }
        setCurrentPage(1); // รีเซ็ตหน้ากลับไปที่ 1
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-6 max-w-2xl mx-auto border rounded-lg w-[944px] shadow-md bg-white">
                <div className="flex justify-between mb-4">
                    {/* Dropdown สำหรับเลือกสนาม */}
                    <div className="mb-4">
                        <select
                            value={selectedStadium}
                            onChange={handleStadiumChange}
                            className="border px-4 py-2 rounded"
                        >
                            <option value="">All</option>
                            {stadiums.map((stadium, index) => (
                                <option key={index} value={stadium}>
                                    {stadium}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={onClose} className="text-red-500">✖ Close</button>
                </div>

                {currentReviews.length === 0 ? (
                    <p className="text-gray-500">No reviews available.</p>
                ) : (

                    currentReviews.map((review, index) => (
                        <div key={index} className="p-4 mb-2 border rounded-lg flex justify-between bg-gray-50">
                            <div>
                                <p className="font-semibold">{(review.Name) ? review.Name : "Anonymous"}</p>
                                <p className="text-gray-500 text-sm">{review.Review}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-yellow-500">★ {review.Score}</p>
                                <p className="text-gray-500 text-sm">{review.Stadium}</p>
                            </div>
                        </div>
                    ))
                )}


                {/*{currentReviews.map((review, index) => (*/}
                {/*    <div key={index} className="p-4 mb-2 border rounded-lg flex justify-between bg-gray-50">*/}
                {/*        <div>*/}
                {/*            <p className="font-semibold">{review.Name}</p>*/}
                {/*            <p className="text-gray-500 text-sm">{review.Review}</p>*/}
                {/*        </div>*/}
                {/*        <div className="text-right">*/}
                {/*            <p className="text-yellow-500">★ {review.Score}</p>*/}
                {/*            <p className="text-gray-500 text-sm">{review.Stadium}</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}

                {/* Pagination Controls */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'border'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}