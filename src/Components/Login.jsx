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

    useEffect(() => {
        // Load the Google Sign-In API script
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            console.log("Script element added to DOM:", script);
            script.onload = () => {
                initializeGoogleSignIn();
            };
        };

        const initializeGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '90601118992-th16ma48ht4l0m7rsda45l9j60l31ctf.apps.googleusercontent.com',
                    callback: handleGoogleSignIn
                });

                // Render the button
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'), // Add a div with this ID in your render method
                    { theme: 'outline', size: 'large' }
                );
            }
        };
        loadGoogleScript();
    }, []);


    const handleGoogleSignIn = (response) => {
        // Google returns a JWT token that we need to verify on our backend
        setLoading(true);
        console.log("TAP")

        axios.post("http://localhost:3000/google-signup", {
            credential: response.credential
        }).then((res) => {
            setLoading(false);
            // if (res.data.success) {
            navigate("/dashboard");
            console.log(res.data)
            localStorage.setItem("token", res.data.token);
            // }
        }).catch((error) => {
            setLoading(false);
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while signing in with Google. Please try again.");
            }
        });
    };
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
                        <div id="google-signin-button"></div>
                    </form>
                    <div className="text-center text-gray-500 mt-4">
                        Forget password?
                        <button onClick={() => setIsModalOpen(true)} className="text-black underline">Click here
                        </button>
                    </div>
                </div>
            </div>
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
