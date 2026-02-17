import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
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

      toast("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.log(error);
      toast("Checkout failed");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">
        Your Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹ {item.price} × {item.quantity}</p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">
            Total: ₹ {total}
          </h3>

          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
