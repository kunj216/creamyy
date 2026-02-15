import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <CartProvider>
      <>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111827",
              color: "#fff",
              borderRadius: "999px",
              padding: "12px 20px",
              fontWeight: "500"
            }
          }}
        />
      </>
    </CartProvider>
  </AuthProvider>
);
