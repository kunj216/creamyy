import { NavLink } from "react-router-dom";

function HeroSection (){
    return(
        <div className="grid grid-cols-2 h-[50vh] bg-yellow-100 mx-4 shadow-md">
            <div className="mx-8 flex flex-col justify-center h-full space-y-3">
                <div className="text-4xl md:text-8xl text-amber-800 text-center font-semibold">Happiness served cold</div>
                <div className="text-2xl md:text-4xl text-rose-500 text-center italic">Fresh, creamy ice creams made daily</div>
                <div className="flex justify-center mx-auto my-5">
                <NavLink to="/cart" className="shadow-md mx-8 px-8 py-3 rounded-2xl transition-all duration-200 text-white bg-pink-500 font-semibold hover:bg-pink-600 hover:scale-105 active:scale-95">Order Now</NavLink>
                <NavLink to="/menu" className="shadow-md mx-8 px-8 py-3 rounded-2xl transition-all duration-200 border-2 border-pink-500 text-pink-500 font-semibold hover:bg-pink-500 hover:text-white active:scale-95">Explore Menu</NavLink>
                </div>
            </div>
            <div className="w-full h-full overflow-hidden">
                <img src="/src/assets/hero.jpg" alt="ice cream" className="w-full h-full object-cover"/>
            </div>
        </div>
    )
}

export default HeroSection