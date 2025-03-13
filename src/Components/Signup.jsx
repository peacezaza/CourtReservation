import { useState, useEffect } from "react";
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();
    const [isOpenTerm, setIsOpenTerm] = useState(false);
    const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Initialize Google Sign-In
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

    // Handle Google Sign-In response
    const handleGoogleSignIn = (response) => {
        // Google returns a JWT token that we need to verify on our backend
        setLoading(true);
        console.log("TAP")

        axios.post("http://localhost:3000/google-signup", {
            credential: response.credential,
            user_type: "owner"
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

    // Manual sign up handler
    const onHandleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear previous error messages

        if (!passwordMatch) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!termsAccepted) {
            setErrorMessage("You must agree to the Terms & Conditions.");
            return;
        }

        if (email !== "" && password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                setPasswordMatch(true);
                setLoading(true); // Set loading to true when request is made
                axios.post("http://localhost:3000/signup", {
                    email: email,
                    password: password,
                    user_type: "owner",
                    points: 0
                }).then((response) => {
                    setLoading(false); // Set loading to false when response is received
                    if (response.data.success) {
                        navigate("/dashboard");
                        localStorage.setItem("token", response.data.token);
                    }
                }).catch((error) => {
                    setLoading(false); // Set loading to false if there's an error
                    if (error.response) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage("An unexpected error occurred. Please try again.");
                    }
                });
            } else {
                setPasswordMatch(false);
            }
        } else {
            setErrorMessage("All fields are required.");
        }
    };


    return (
        <div className="flex flex-row h-screen">
            {/*Left Side*/}
            <div className="w-1/2 bg-black text-white flex flex-col justify-around pt-10 pb-20">
                <p className="font-bold text-[50px] pl-10">*</p>
                <div className="pl-5 w-2/3">
                    <p className="pl-5 text-[100px] font-bold"></p>
                    <p className="pl-5 text-[100px] font-bold">Why US?</p>
                    <p className="text-gray-300">Manage your sports facilities seamlessly with Terkcode, a platform designed to help field owners optimize operations, attract more customers, and increase revenue. Add and manage multiple locations effortlessly, update schedules in real-time, and monitor bookings and revenue through advanced analytics. Gain insights into field utilization rates and booking trends to make data-driven decisions that boost profitability. Simplify payment processing with secure and transparent transactions, ensuring hassle-free management for both you and your customers. Leverage customer feedback and reviews to improve services and build trust with players. Promote your fields to a growing community of sports enthusiasts and fill empty time slots with targeted marketing tools. With Terkcode, you can focus on growing your business while we take care of the rest. Sign up today and transform the way you manage your sports facilities!</p>
                </div>
            </div>
            {/*Right Side*/}
            <div className="w-1/2 bg-white flex flex-col items-center justify-center space-y-5">
                <p className="font-bold text-3xl">Register Account</p>
                <p className="text-gray-400">Try now for FREE! Takes less than a minute.</p>
                <form className="w-full flex flex-col space-y-5" onSubmit={onHandleSubmit}>
                    <div className="w-full flex justify-center">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordMatch(e.target.value === confirmPassword);
                            }}
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full flex justify-center relative">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setPasswordMatch(password === e.target.value);
                                }}
                                className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                            />
                        </div>
                        {/* check passwordMatch */}
                        {!passwordMatch && confirmPassword !== "" && (
                            <div className="w-3/5 text-left mt-1 text-red-500 text-xs">
                                Passwords do not match
                            </div>
                        )}
                        {/* Show errorMessage from API */}
                        {errorMessage && (
                            <div className="w-3/5 text-left mt-1 text-red-500 text-xs">
                                {errorMessage}
                            </div>
                        )}
                    </div>


                    <div className="w-full flex justify-center">
                        <div className="w-3/5 flex flex-row items-start space-x-3">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <p className="text-gray-400 flex justify-center">I agree to the
                                <button
                                    type="button"
                                    className="font-bold text-gray-600 underline"
                                    onClick={() => setIsOpenTerm(true)}
                                >Terms & Conditions
                                </button> and
                                <button
                                    type="button"
                                    className="font-bold text-gray-600 underline"
                                    onClick={() => setIsOpenPrivacy(true)}
                                >Privacy Policy
                                </button>
                            </p>
                        </div>
                        {isOpenTerm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl shadow-lg relative">
                                    <h2 className="text-xl font-bold mb-4">Terms of Service</h2>
                                    <div className="h-60 overflow-y-auto text-sm text-gray-700">
                                        {/* Terms content - unchanged */}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpenTerm(false)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}
                        {isOpenPrivacy && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-3/4 max-w-2xl shadow-lg relative">
                                    <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
                                    <div className="h-60 overflow-y-auto text-sm text-gray-700">
                                        {/* Privacy content - unchanged */}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpenPrivacy(false)}
                                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={!termsAccepted || loading}
                            className={`text-center bg-black border w-3/5 p-3 text-white rounded-xl ${termsAccepted ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <svg aria-hidden="true" role="status"
                                         className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101"
                                         fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"/>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                "Sign up"
                            )}
                        </button>
                    </div>
                </form>
                <p className="text-gray-400 ">Already have an account? <a className="underline font-bold text-gray-600"
                                                                          href="/login">Login here</a></p>

                <div className="w-full flex flex-row items-center justify-center space-x-3">
                    <hr className="w-1/4 border-black"/>
                    <p className="font-bold">OR</p>
                    <hr className="w-1/4 border-black"/>
                </div>
                <p>Use your social profile to register</p>
                <div id="google-signin-button"></div>
                <p>© 2024 terkcode - reserved app</p>
            </div>
        </div>
    )
}