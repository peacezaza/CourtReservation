import {useEffect, useState} from "react";
import axios from "axios";

export default function UserAccount({ onClose }) {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        phone: "",
        oldPassword:"",
        newPassword: "",
        confirmNewPassword : ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        try{
            axios.get("http://localhost:3000/getUserData",
                {
                    headers: {'Authorization': `Bearer ${token}`}
                }).then((response) => {
                    if(response.status === 200){
                        console.log(response)
                        setUserData(response.data.data)
                    }
            })
        }catch (error){
            console.log(error);
        }
    }, []);

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const token = localStorage.getItem("token");
        try{
            const response = axios.put("http://localhost:3000/updateUserdata", userData,
                {
                    headers: {'Authorization': `Bearer ${token}`}
                })
        }catch (error){
            console.log(error);
        }

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" >
            <div className="p-6 max-w-md w-full border rounded-lg shadow-md bg-white ">
                <div className="flex justify-between mb-4">
                    <h2 className="text-lg font-semibold">User Information</h2>
                    <button onClick={onClose} className="text-red-500">✖</button>
                </div>

                {!submitted ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded cursor-not-allowed focus:outline-none focus:ring-0"
                                    readOnly
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-black text-white py-2 rounded">
                            save
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg font-semibold">Saved Information</p>

                        <button
                            onClick={onClose}
                            className="mt-4 bg-red-500 py-2 px-4 rounded text-white">
                            close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}