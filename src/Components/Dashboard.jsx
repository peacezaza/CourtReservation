

export default function Dashboard() {
    return (
        <div className="flex flex-row h-screen">
           {/* Left Side*/}
           <div className="w-[20%]">
               <div className="flex flex-col justify-start items-center  space-y-5">

                   <img src="/logo.png" alt="logo" className="w-[25%] h-[10%]"/>
                    <div className="w-full flex justify-center">
                        <button className="rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600  hover:bg-black hover:text-white">
                            <img src="/homeBlack.png" alt="home" className="w-10 h-10"/>
                            <p className="text-xl">Dashboard</p>
                        </button>
                    </div>

                   <div className="w-full flex justify-center">
                       <button className="rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white">
                           <img src="/booking.png" alt="booking" className="w-10 h-10"/>
                           <p className="text-xl">Booking</p>
                       </button>
                   </div>

                   <div className="w-full flex justify-center">
                       <button className="rounded-xl py-2 flex flex-row items-center justify-around space-x-6 text-gray-600 w-[70%] hover:bg-black hover:text-white">
                           <img src="/facility.png" alt="facility" className="w-10 h-10" />
                           <p className="text-xl">Facilities</p>
                       </button>
                   </div>

                   <div className="w-full flex justify-center">
                       <button className="rounded-xl py-2 flex flex-row justify-around items-center w-[70%] space-x-6 text-gray-600 hover:bg-black hover:text-white">
                           <img src="/transaction.png" alt="Transaction" className="w-10 h-10"/>
                           <p className="text-xl">Transaction</p>
                       </button>
                   </div>

               </div>
           </div>
            {/*Right Side*/}
            <div className="w-[80%] bg-blue-400">sfsdfs</div>
        </div>
    )
}