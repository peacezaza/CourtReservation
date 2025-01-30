import { useState } from "react";
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";

import {setCustomIconsLoader} from "@iconify/react";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const onHandleSubmit = (event) => {
        event.preventDefault();
        console.log("Clicked")
        if(email !== "" && password !== "" && confirmPassword !== "") {
            setLoading(true);
            if(password === confirmPassword) {
                setPasswordMatch(true);
                axios.post("http://localhost:3000/signup", {
                    email: email,
                    password: password,
                    user_type: "owner"
                }).then((response) => {
                    console.log(response.data);
                    if(response.data.success){
                        navigate("/dashboard");
                        setLoading(false);
                    }
                    else{
                        setLoading(false);
                    }
                })
            }
            else{
                setPasswordMatch(false);
                setLoading(false);
            }
        }


        // if(password === confirmPassword){
        //     axios.post("http://localhost:3000/signup", {
        //         email : email,
        //         password: password,
        //         confirmPassword : confirmPassword
        //     })
        // }
        // else{
        //     setPasswordMatch(false);
        // }

        // axios.post("http://localhost:3000/signup", {
        //     email: email,
        //     password: password,
        //     user_type: "owner"
        // })

        // setEmail("");
        // setPassword("");
        // setConfirmPassword("");
    }

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
                            placeholder="Password"
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            value = {confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    {!passwordMatch && <div>sadfaf</div>}
                    <div className="flex flex-row justify-center space-x-5">
                        <input className="" type="checkbox" />
                        <p className="text-gray-400 flex justify-center">I agree to the <a href="#"
                                                                                           className="font-bold text-gray-600 underline">Terms
                            & Conditions</a>and <a href="#" className="font-bold underline text-gray-600">Privacy
                            Policy</a>
                        </p>
                    </div>

                    <div className="flex justify-center">
                        {/*                        <Link to="#" className="bg-black border w-3/5 p-3 text-center rounded-xl">
                            <button type="submit" className="text-center">
                                Sign up
                            </button>
                        </Link>*/}
                        {/*<Link to="/dashboard" className="bg-black border w-3/5 p-3 rounded-lg text-center" />Sign up*/}
                        <button type="submit" className="text-center bg-black border w-3/5 p-3 text-white rounded-xl">
                            Sign up
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
                {loading && <div role="status">
                    <svg aria-hidden="true"
                         className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 fixed top-1/2 left-1/2"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                </div>}
            </div>
        </div>
    )
}