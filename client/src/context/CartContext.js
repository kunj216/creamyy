import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item._id === product._id);

    if (existing) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));

      toast.success(`${product.name} quantity updated 🍨`);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart 🍨`);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
    toast("Item removed", {
      icon: "🗑️"
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
