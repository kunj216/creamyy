import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Home() {
  const { user } = useContext(AuthContext);

  const [recommendations, setRecommendations] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHybrid = async () => {
      try {
        if (!user) return;

        const { data } = await api.get("/products/hybrid", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setRecommendations(data.recommendations);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTopSelling = async () => {
      try {
        const { data } = await api.get("/products/top-selling");
        setTopSelling(data);
      } catch (error) {
        console.log(error);
      }
    };

    const init = async () => {
      setLoading(true);
      await fetchHybrid();
      await fetchTopSelling();
      setLoading(false);
    };

    init();
  }, [user]);

  return (
    <div className="bg-rose-50 min-h-screen">
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1563805042-7684c019e1cb"
          alt="Ice Cream"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-white max-w-2xl px-6"
        >
          <h1 className="text-6xl font-heading font-bold mb-6">
            Indulge in Luxury Scoops 🍨
          </h1>

          <p className="text-lg text-gray-200 mb-8">
            Handcrafted premium ice creams made with elegance.
          </p>
        </motion.div>
      </section>

      {/* HYBRID RECOMMENDATIONS */}
      {user && recommendations.length > 0 && (
        <section className="py-20 px-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
            Recommended For You
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {recommendations.map((product) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                key={product._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1580910051074-3eb694886505"
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-semibold text-lg">{product.name}</h3>

                  <p className="text-rose-500 font-bold mt-2">
                    ₹ {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* TOP SELLING SECTION */}
      <section className="py-20 px-12 bg-white">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-12 text-center">
          Top Selling Flavors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {topSelling.map((product) => (
            <div
              key={product._id}
              className="bg-rose-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1580910051074-3eb694886505"
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-lg">{product.name}</h3>

                <p className="text-rose-500 font-bold mt-2">
                  ₹ {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-12 bg-rose-50">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-16 text-center">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Aarav Sharma",
              review:
                "The smoothest chocolate ice cream I’ve ever had. Creamyy feels like a luxury dessert brand.",
            },
            {
              name: "Meera Kapoor",
              review:
                "The recommendation system actually understands my taste. It feels personalized.",
            },
            {
              name: "Rohan Mehta",
              review:
                "From UI to flavors, everything feels premium. Definitely my go-to ice cream store.",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.review}"
              </p>

              <h4 className="font-semibold text-gray-900">
                {testimonial.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
