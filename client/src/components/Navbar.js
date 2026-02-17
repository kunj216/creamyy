import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { openCart, cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900">
          Creamyy 🍨
        </Link>

        {/* Hamburger (Mobile Only) */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <Link to="/menu" className="hover:text-pink-500">
            Menu
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-pink-500">
              Admin
            </Link>
          )}

          {user && (
            <button onClick={openCart} className="relative hover:text-pink-500">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-pink-500 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {user ? (
            <button
              onClick={logout}
              className="bg-gray-900 text-white px-4 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/signup"
                className="bg-gray-900 text-white px-4 py-2 rounded-full"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col items-start px-6 py-6 space-y-5 text-gray-700 font-medium">
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-pink-500 transition"
            >
              Menu
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-pink-500 transition"
              >
                Admin
              </Link>
            )}

            {user && (
              <button
                onClick={() => {
                  openCart();
                  setMenuOpen(false);
                }}
                className="text-lg hover:text-pink-500 transition"
              >
                Cart ({cartCount})
              </button>
            )}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full text-left text-lg bg-gray-900 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg hover:text-pink-500 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-center"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
