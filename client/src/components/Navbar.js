import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { openCart, cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b px-6 py-4">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Creamyy 🍨
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">

          <Link to="/menu" className="hover:text-pink-500">
            Menu
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-pink-500">
              Admin
            </Link>
          )}

          {user && (
            <button
              onClick={openCart}
              className="relative hover:text-pink-500"
            >
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4">

          <Link to="/menu" onClick={() => setMenuOpen(false)}>
            Menu
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                openCart();
                setMenuOpen(false);
              }}
            >
              Cart ({cartCount})
            </button>
          )}

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                Signup
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
