import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function CartSidebar() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity
      }));

      await api.post(
        "/orders",
        { items: orderItems },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      toast.success("Order placed successfully!");
      clearCart();
      closeCart();
    } catch (error) {
      toast("Checkout failed");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCart}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-heading font-bold">
            Your Cart 🛒
          </h2>
          <button onClick={closeCart}>✕</button>
        </div>

        <div className="p-6 overflow-y-auto h-[70%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹ {item.price} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <p className="font-semibold mb-4">
            Total: ₹ {total}
          </p>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
