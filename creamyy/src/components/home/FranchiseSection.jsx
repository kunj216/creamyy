import { NavLink } from "react-router-dom";

function FranchiseSection(){
    return(
        <div className="grid grid-cols-2 py-4 bg-yellow-100 mx-4 shadow-md mt-2">
            <div className="mx-8 flex flex-col justify-center items-center h-full space-y-3">
                <div className="text-4xl md:text-8xl text-amber-800 text-center font-semibold">Partner with Creamyy</div>
                <div className="text-2xl md:text-4xl text-rose-500 text-center italic">
                    Join the Creamyy family and bring happiness to your city. <br />
                    Low investment, strong brand support, and high demand.</div>
                <NavLink to="/cart" className="shadow-md py-3 w-40 rounded-2xl transition-all duration-200 text-center text-white bg-pink-500 font-semibold hover:bg-pink-600 hover:scale-105 active:scale-95">Become a Partner</NavLink>
                </div>
            <div className="w-full h-full overflow-hidden">
                <img src="/src/assets/outlet.jpg" alt="outlet" className="w-full h-full object-cover"/>
            </div>
        </div>
    )
}

export default FranchiseSection