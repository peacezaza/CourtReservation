import {Link} from "react-router-dom";

export default function HomePage(){

    return (
        <div>
            {/*Nav bar*/}
            <div className="flex flex-row justify-around p-3">
                <div>
                    <a className="font-bold " href="#">BranBuzz</a>
                </div>
                <div className="flex flex-row space-x-5">
                    <a href="#">Home</a>
                    <a href="#">About us</a>
                    <a href="#">Services</a>
                    <a href="#">Contact us</a>
                </div>
                <div className="space-x-3">
                    <Link to="/signup" className="bg-black text-white p-1 px-7 shadow">Sign up</Link>
                    <Link to="/login" className="bg-black text-white p-1 px-7 shadow">Login</Link>
                </div>
            </div>
            <div></div>
        </div>
    )
}