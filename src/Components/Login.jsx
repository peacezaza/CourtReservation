import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetMessage, setResetMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear previous error messages

        axios.post("http://localhost:3000/login", {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response.data);
            if (response.data.status) {
                console.log("Logged in successfully");
                localStorage.setItem("token", response.data.token);
                const decoded = jwtDecode(response.data.token);
                setType(decoded.userData.user_type);

                setIsLoggedIn(true);
                setEmail("");
                setPassword("");
            }
        }).catch((error) => {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Login failed");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        });

        setEmail("");
        setPassword("");
    }

    useEffect(() => {
        if (isLoggedIn && type) {
            navigate(type === "owner" ? "/dashboard" : "/AdminDashboard");
        }
    }, [isLoggedIn, type, navigate]);


    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResetMessage("");

        try {
            const response = await axios.post("http://localhost:3000/forgot-password", { email: resetEmail });
            setResetMessage(response.data.message || "Password reset link sent!");
        } catch (error) {
            setResetMessage(error.response?.data?.message || "Failed to send reset link.");
        }

        setLoading(false);
    };

    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <div className="w-1/2 bg-black p-12 flex flex-col">
                <div>
                    <div className="text-white font-bold text-[3rem]">*</div>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                    <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4">
                        Hello<br />Terkcode!<br />
                    </h1>
                    <p className="text-white/90 sm:text-0.5xl md:text-xl lg:text-xl max-w-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className="text-white/70 text-sm">
                    Â© 2024 terkcode. All rights reserved.
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 p-12 flex flex-col justify-center">
                <div className="max-w-md mx-auto w-full">
                    <h2 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 pb-20">SaleSkip</h2>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Welcome Back!</h3>
                    <p className="text-gray-600 mb-6">
                        Don't have an account? <a href="/signup" className="text-[#2243E8]">Create a new account now.</a>
                        <br />It's FREE! Takes less than a minute.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-[#2243E8]"
                            />
                        </div>
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-center relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-[#2243E8]"
                                />
                            </div>

                            {/* Show errorMessage from API */}
                            {errorMessage && (
                                <div className="w-full text-left mt-1 text-red-500 text-xs">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-3 rounded-lg font-medium"
                        >
                            Login Now
                        </button>
                        {/* <button
                            type="button"
                            className="w-full border border-gray-300 p-3 rounded-lg flex items-center justify-center space-x-2"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" className="text-gray-600">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span>Login with Google</span>
                        </button> */}


                    </form>
                    <div className="text-center text-gray-500 mt-4">

                        Forget password?
                        <button onClick={() => setIsModalOpen(true)} className="text-black underline">Click here
                        </button>
                    </div>
                </div>
            </div>
            {/* Forget Password Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Forgot Password?</h2>
                        <p className="text-sm text-gray-600 mb-4">Enter your email to receive a password reset link.</p>

                        <form onSubmit={handleForgetPassword} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>

                        {resetMessage && <p className="mt-3 text-center text-sm text-gray-700">{resetMessage}</p>}

                        <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full text-gray-600 hover:underline">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
