

export default function Signup() {
    return (
        <div className="flex flex-row h-screen">
            {/*Left Side*/}
            <div className="w-1/2 bg-black text-white flex flex-col justify-around pt-10 pb-20">
                <p className="font-bold text-[50px] pl-10">*</p>

                <div className="pl-5 w-2/3">
                    <p className="pl-5 text-[100px] font-bold">Hello</p>
                    <p className="pl-5 text-[100px] font-bold">Terkcode!</p>
                    <p className="text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                        PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
            {/*Right Side*/}
            <div className="w-1/2 bg-white flex flex-col items-center justify-center space-y-5">
                <p className="font-bold text-3xl">Register Account</p>
                <p className="text-gray-400">Try now for FREE! Takes less than a minute.</p>
                <form className="w-full flex flex-col space-y-5">
                    <div className="w-full flex justify-center">
                        <input
                            placeholder="Email"
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <input
                            placeholder="Password"
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <input
                            placeholder="Confirm Password"
                            className="w-3/5 p-3 border-b border-gray-600 focus:outline-none focus:border-[#2243E8]"
                        />
                    </div>
                    <p className="text-gray-400 flex justify-center">I agree to the <a href="#"
                                                                                       className="font-bold text-gray-600 underline">Terms
                        & Conditions</a>and <a href="#" className="font-bold underline text-gray-600">Privacy Policy</a>
                    </p>
                    <div className="flex justify-center text-white">
                        <button className=" bg-black border w-3/5 p-3 rounded-lg">Sign up</button>
                    </div>

                </form>
                <p className="text-gray-400">Already have an account? <a className="underline font-bold text-gray-600"
                                                                         href="#">Login here</a></p>
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