import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


import { setCustomIconsLoader } from "@iconify/react";

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



    const onHandleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear previous error messages
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

        if (!passwordMatch) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!termsAccepted) {
            setErrorMessage("You must agree to the Terms & Conditions.");
            return;
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
                                    className="font-bold text-gray-600 underline"
                                    onClick={() => setIsOpenTerm(true)}
                                >Terms & Conditions
                                </button> and
                                <button
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
                                        <p><strong>Effective Date:</strong></p>
                                        <p>Welcome to CourtReservation.com! These Terms of Service govern your use of
                                            our online platform for reserving sports courts. By accessing or using our
                                            service, you agree to be bound by these terms. If you do not agree, please
                                            do not use our platform.</p>

                                        <h3 className="font-bold mt-4">1. Acceptance of Terms</h3>
                                        <p>By creating an account or using CourtReservation, you acknowledge that you
                                            have read, understood, and agreed to these Terms of Service. We may update
                                            these terms from time to time, and continued use of the platform constitutes
                                            acceptance of the revised terms.</p>

                                        <h3 className="font-bold mt-4">2. User Accounts & Responsibilities</h3>
                                        <ul className="list-disc list-inside">
                                            <li>You must create an account to make a reservation.</li>
                                            <li>You are responsible for maintaining the confidentiality of your login
                                                credentials.
                                            </li>
                                            <li>Any misuse, fraudulent activity, or violation of these terms may result
                                                in account suspension or termination.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">3. Court Reservations & Cancellations</h3>
                                        <ul className="list-disc list-inside">
                                            <li>Reservations must be made in advance through the platform.</li>
                                            <li>Cancellations must be made at least [Insert Hours] before the reserved
                                                time to be eligible for a refund or credit.
                                            </li>
                                            <li>Late arrivals may result in forfeiture of the reservation without
                                                refund.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">4. Payments & Refunds</h3>
                                        <ul className="list-disc list-inside">
                                            <li>Payment is required at the time of booking.</li>
                                            <li>Refunds are issued only if cancellations are made within the allowed
                                                timeframe.
                                            </li>
                                            <li>CourtReservation reserves the right to change pricing at any time, with
                                                notice provided to users.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">5. Code of Conduct</h3>
                                        <ul className="list-disc list-inside">
                                            <li>Users must respect the booked time slots and maintain proper behavior at
                                                the facilities.
                                            </li>
                                            <li>Any form of harassment, vandalism, or violation of facility rules may
                                                lead to account suspension.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">6. Service Availability & Limitations</h3>
                                        <ul className="list-disc list-inside">
                                            <li>We do not guarantee uninterrupted or error-free service.</li>
                                            <li>CourtReservation is not liable for cancellations due to weather,
                                                facility maintenance, or other unforeseen circumstances.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">7. Privacy & Data Protection</h3>
                                        <p>We collect and store personal data as described in our <a href="#"
                                                                                                     className="text-blue-600 underline">Privacy
                                            Policy</a>. Your data will not be shared with third parties except as
                                            necessary to provide the service.</p>

                                        <h3 className="font-bold mt-4">8. Intellectual Property</h3>
                                        <ul className="list-disc list-inside">
                                            <li>All content, including the website design, branding, and software, is
                                                the property of CourtReservation.
                                            </li>
                                            <li>Users may not copy, distribute, or modify any part of the platform
                                                without permission.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">9. Limitation of Liability</h3>
                                        <ul className="list-disc list-inside">
                                            <li>CourtReservation is not responsible for injuries, damages, or losses
                                                incurred while using reserved facilities.
                                            </li>
                                            <li>We are not liable for any financial losses due to booking errors or
                                                system outages.
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">10. Termination of Service</h3>
                                        <ul className="list-disc list-inside">
                                            <li>We reserve the right to terminate or suspend accounts that violate these
                                                terms.
                                            </li>
                                            <li>Users may delete their accounts at any time by contacting support.</li>
                                        </ul>

                                        <h3 className="font-bold mt-4">11. Governing Law & Dispute Resolution</h3>
                                        <ul className="list-disc list-inside">
                                            <li>These terms are governed by the laws of [Insert Jurisdiction].</li>
                                            <li>Any disputes must be resolved through arbitration or the courts in
                                                [Insert Location].
                                            </li>
                                        </ul>

                                        <h3 className="font-bold mt-4">12. Changes to These Terms</h3>
                                        <p>We may update these Terms of Service at any time. Users will be notified of
                                            significant changes.</p>

                                        <h3 className="font-bold mt-4">13. Contact Information</h3>
                                        <p>If you have any questions or concerns, please contact us at
                                            [kanisorn.kat@ku.th].</p>
                                    </div>
                                    <button
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
                                        <p><strong>Effective Date:</strong></p>
                                        <p>At [CourtReservation.com], we value your privacy and are committed to
                                            protecting your personal information. This Privacy Policy outlines the types
                                            of personal data we collect, how we use it, and the measures we take to
                                            protect it. By using our website and services, you agree to the terms of
                                            this policy.</p>

                                        <h3 className="font-bold mt-4">1. Information We Collect</h3>
                                        <p>We collect personal information such as your name, email address, phone
                                            number, and payment details when you make a reservation or contact us. We
                                            may also collect non-personal data like your IP address and usage data.</p>

                                        <h3 className="font-bold mt-4">2. How We Use Your Information</h3>
                                        <p>Your information is used to process reservations, communicate with you,
                                            improve our services, and send marketing updates (optional). We will not
                                            sell or share your data with third parties except as necessary for providing
                                            the service.</p>

                                        <h3 className="font-bold mt-4">3. Data Security</h3>
                                        <p>We take measures to protect your personal information, including encryption
                                            and secure servers. However, no method of online transmission is 100%
                                            secure.</p>

                                        <h3 className="font-bold mt-4">4. Cookies and Tracking Technologies</h3>
                                        <p>We use cookies to enhance your experience on our website. You can manage your
                                            cookie preferences through your browser settings.</p>

                                        <h3 className="font-bold mt-4">5. Your Rights</h3>
                                        <p>You have the right to access, correct, or delete your personal information.
                                            You can also withdraw your consent for marketing communications at any
                                            time.</p>

                                        <h3 className="font-bold mt-4">6. Changes to This Privacy Policy</h3>
                                        <p>We may update this Privacy Policy periodically. Any changes will be posted
                                            here with an updated effective date.</p>

                                        <h3 className="font-bold mt-4">7. Contact Us</h3>
                                        <p>If you have any questions or concerns, please contact us at
                                            [kanisorn.kat@ku.th].</p>
                                    </div>
                                    <button
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
                <button
                    type="button"
                    className="w-3/5 border border-gray-300 p-3 rounded-lg flex items-center justify-center space-x-2"
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
                </button>
                <p>© 2024 terkcode - reserved app</p>
            </div>

        </div>
    )
}