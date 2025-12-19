import { NavLink } from "react-router-dom"
function Home() {
  return (
    <>
      {/* hero section  */}
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
        <img src="hero.jpg" alt="ice cream" className="w-full h-full object-cover"/>
      </div>
    </div>


    {/* ice cream cards  */}
    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4 gap-5">
      <div className="px-3 pt-4 bg-amber-50 flex flex-col rounded-2xl overflow-hidden shadow transition-all duration-400 hover:scale-105">
        <img src="card 1.jpg" alt="ice cream" className="w-full h-[80%] object-cover"/>
        <div className="text-3xl text-center font-bold mt-1 bg-yellow-200 text-rose-500 rounded-2xl">Fruity Cup</div>
        <div className="grid grid-cols-2 mt-3 px-3">
            <div className="py-1.5">$15.99</div>
            <button className="shadow-md rounded-2xl bg-pink-500 text-white px-2.5 py-1.5 font-semibold transition-all duration-200 hover:bg-pink-600 hover:scale-105 active:scale-95">Add to cart</button>
        </div>
      </div>
      <div className="px-3 pt-4 bg-amber-50 flex flex-col rounded-2xl overflow-hidden shadow transition-all duration-400 hover:scale-105">
        <img src="card 2.jpg" alt="ice cream" className="w-full h-[80%] object-cover"/>
        <div className="text-3xl text-center font-bold mt-1 bg-yellow-200 text-rose-500 rounded-2xl">Rainbow Cone</div>
        <div className="grid grid-cols-2 mt-3 px-3">
            <div className="py-1.5">$19.99</div>
            <button className="shadow-md rounded-2xl bg-pink-500 text-white px-2.5 py-1.5 font-semibold transition-all duration-200 hover:bg-pink-600 hover:scale-105 active:scale-95">Add to cart</button>
        </div>
      </div>
      <div className="px-3 pt-4 bg-amber-50 flex flex-col rounded-2xl overflow-hidden shadow transition-all duration-400 hover:scale-105">
        <img src="card 3.jpg" alt="ice cream" className="w-full h-[80%] object-cover"/>
        <div className="text-3xl text-center font-bold mt-1 bg-yellow-200 text-rose-500 rounded-2xl">Blueberry Mash</div>
        <div className="grid grid-cols-2 mt-3 px-3">
            <div className="py-1.5">$25.99</div>
            <button className="shadow-md rounded-2xl bg-pink-500 text-white px-2.5 py-1.5 font-semibold transition-all duration-200 hover:bg-pink-600 hover:scale-105 active:scale-95">Add to cart</button>
        </div>
      </div>
      <div className="px-3 pt-4 bg-amber-50 flex flex-col rounded-2xl overflow-hidden shadow transition-all duration-400 hover:scale-105">
        <img src="card 4.jpg" alt="ice cream" className="w-full h-[80%] object-cover"/>
        <div className="text-3xl text-center font-bold mt-1 bg-yellow-200 text-rose-500 rounded-2xl">Vanilla Sundae</div>
        <div className="grid grid-cols-2 mt-3 px-3">
            <div className="py-1.5">$19.99</div>
            <button className="shadow-md rounded-2xl bg-pink-500 text-white px-2.5 py-1.5 font-semibold transition-all duration-200 hover:bg-pink-600 hover:scale-105 active:scale-95">Add to cart</button>
        </div>
      </div>
    </div>


      {/* stats  */}

      <div className="py-20 bg-yellow-100 grid grid-cols-2 md:grid-cols-4 gap-5 text-center mx-4 shadow-md">
        <div className="flex flex-col gap-5">
          <div className="text-amber-800 text-8xl font-bold">20+</div>
          <div className="text-amber-800 text-2xl font-semibold">Flavours</div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-amber-800 text-8xl font-bold">5000+</div>
          <div className="text-amber-800 text-2xl font-semibold">Happy Customers</div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-amber-800 text-8xl font-bold">10+</div>
          <div className="text-amber-800 text-2xl font-semibold">Locations</div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-amber-800 text-8xl font-bold">Fresh</div>
          <div className="text-amber-800 text-2xl font-semibold">Made Daily</div>
        </div>
      </div>

      {/* franchise  */}
      <div className="grid grid-cols-2 py-4 bg-yellow-100 mx-4 shadow-md mt-2">
      <div className="mx-8 flex flex-col justify-center items-center h-full space-y-3">
        <div className="text-4xl md:text-8xl text-amber-800 text-center font-semibold">Partner with Creamyy</div>
        <div className="text-2xl md:text-4xl text-rose-500 text-center italic">Join the Creamyy family and bring happiness to your city. <br />
Low investment, strong brand support, and high demand.</div>
        <NavLink to="/cart" className="shadow-md py-3 w-40 rounded-2xl transition-all duration-200 text-center text-white bg-pink-500 font-semibold hover:bg-pink-600 hover:scale-105 active:scale-95">Become a Partner</NavLink>
      </div>
      <div className="w-full h-full overflow-hidden">
        <img src="outlet.jpg" alt="outlet" className="w-full h-full object-cover"/>
      </div>
    </div>
    </>
  
  )

}

export default Home
