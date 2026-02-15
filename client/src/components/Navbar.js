import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { openCart, cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 px-12 py-5 flex justify-between items-center">
      {/* Brand */}
      <Link
        to="/"
        className="text-3xl font-heading font-bold text-gray-900 tracking-wide hover:opacity-80 transition"
      >
        Creamyy 🍨
      </Link>

      {/* Navigation */}
      <div className="flex items-center space-x-10 text-gray-700 font-medium">
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-rose-400 transition duration-200"
          >
            Admin
          </Link>
        )}

        <Link
          to="/menu"
          className="hover:text-rose-400 transition duration-200"
        >
          Menu
        </Link>

        {user && (
          <button
            onClick={openCart}
            className="relative hover:text-rose-400 transition duration-200"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-5 bg-rose-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition duration-300 shadow-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-rose-400 transition duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition duration-300 shadow-md"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
