import { useState } from "react"
import { NavLink } from "react-router-dom"

function Navbar () {
    const [open , setOpen] = useState(false)

    return(
        <nav className="mt-2 w-[98vw] h-[8vh] md: h-[10vh] bg-pink-500 flex items-center rounded-2xl md: rounded-3xl shadow-md mx-auto">
            <div className="w-full px-8 flex items-center justify-between ">
                <NavLink to="/" className="flex items-center gap-3">
                    <img src="/logo.jpg" alt="ice cream logo" className="h-10 md:h-12 object-contain rounded-full"/>
                </NavLink>
                <div className="flex space-x-10 text-white text-lg font-medium">
                    <NavLink to ="/menu" className={({ isActive }) =>
                        `px-5 py-2 rounded-full transition-all duration-400
                        ${isActive ? "bg-amber-900 text-white" : "hover:bg-amber-800 hover:text-white"}`
                        }>Menu</NavLink>
                    <NavLink to ="/cart" className={({ isActive }) =>
      `px-5 py-2 rounded-full transition-all duration-400
       ${isActive ? "bg-amber-900 text-white" : "hover:bg-amber-800 hover:text-white"}`
    }>Cart</NavLink>
                    <NavLink to ="/about" className={({ isActive }) =>
      `px-5 py-2 rounded-full transition-all duration-400
       ${isActive ? "bg-amber-900 text-white" : "hover:bg-amber-800 hover:text-white"}`
    }>About Us</NavLink>
                    <NavLink to ="/contact" className={({ isActive }) =>
      `px-5 py-2 rounded-full transition-all duration-400
       ${isActive ? "bg-amber-900 text-white" : "hover:bg-amber-800 hover:text-white"}`
    }>Contact</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar