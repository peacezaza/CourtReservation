import {Link} from "react-router-dom";



export default function HomePage(){

    return (
        <div className="h-screen">
            {/*Nav bar*/}
            <div className="flex flex-row justify-around p-3 h-[6%]">
                <div>
                    <a className="font-bold " href="#">BranBuzz</a>
                </div>
                <div className="flex flex-row space-x-5 font-bold">
                    <a href="#" className="text-black">Home</a>
                    <a href="#" className="text-black">About us</a>
                    <a href="#" className="text-black">Services</a>
                    <a href="#" className="text-black">Contact us</a>
                </div>
                <div className="space-x-3">
                    <Link to="/signup" className="bg-black text-white p-1 px-7 shadow">Sign up</Link>
                    <Link to="/login" className="bg-black text-white p-1 px-7 shadow">Login</Link>
                </div>
            </div>
            <div className="h-[94%] overflow-hidden flex flex-row">
                {/*Left Side*/}
                <div className="w-1/2 flex flex-col justify-center items-center h-screen">
                    <div className="w-[40%] space-y-12">
                        <h1 className="text-black font-bold text-5xl">We create
                        solution for<br/>
                        your business</h1>
                        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button className="border bg-black text-white px-4 py-2 rounded-lg text-xl">Get Started</button>
                    </div>
                </div>
                {/*Right Side*/}
                <div className="w-1/2 h-screen flex justify-end items-center mr-[1.5%]">
                    <div className="space-y-3">
                        <img src="/badminton.png" alt="Logo" className="w-[430px] h-[473px] border-black border-8 bg-black rounded-2xl p-3"/>
                        <p className="text-2xl font-bold">Reserve Your Court Today!</p>
                        <p className="w-1/2 text-gray-600">Book your favorite court for
                            badminton and other sports
                            at your convenience.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}