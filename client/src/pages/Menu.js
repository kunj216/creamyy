import { useEffect, useState } from "react";
import api from "../services/api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Menu() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">
        Our Ice Cream Menu 🍦
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 capitalize">
              Category: {product.category}
            </p>

            <p className="text-pink-600 font-bold mt-2">
              ₹ {product.price}
            </p>

            <p className="text-gray-600 text-sm mt-2">
              {product.description}
            </p>

            <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                >
                Add to Cart
                </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
