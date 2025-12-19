import { NavLink } from "react-router-dom"


function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-8">
      
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Creamyy 🍨
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Serving happiness one scoop at a time. Fresh, creamy and delicious
            ice creams made with love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li className="hover:text-white cursor-pointer"><NavLink to="/">Home</NavLink></li>
            <li className="hover:text-white cursor-pointer"><NavLink to="/menu">Menu</NavLink></li>
            <li className="hover:text-white cursor-pointer"><NavLink to="/about">About us</NavLink></li>
            <li className="hover:text-white cursor-pointer"><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>📍 Delhi, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ creamyy@gmail.com</li>
          </ul>
        </div>
        

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Creamyy. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
