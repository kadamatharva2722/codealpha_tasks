import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  // Fetch few products as featured
  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await api.get("/products");
      setFeatured(data.slice(0, 4)); // show first 4
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: "Electronics", path: "electronics" },
    { name: "Fashion", path: "fashion" },
    { name: "Home", path: "home" },
    { name: "Accessories", path: "accessories" },
  ];

  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 leading-tight">
              Everyday essentials, <br /> delivered smarter
            </h1>
            <p className="mt-4 text-gray-600">
              Discover quality products curated for modern living.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-md text-sm hover:bg-orange-600 transition"
            >
              Shop Now
            </Link>
          </div>

          <div className="hidden md:block">
            <img src={heroImg} alt="Hero" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.path}`}
              className="bg-white p-6 rounded-md shadow-sm hover:shadow transition text-center"
            >
              <p className="font-medium text-gray-800">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-sm text-orange-500 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}
