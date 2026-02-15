import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CartSidebar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route path="/" element={<Home />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
