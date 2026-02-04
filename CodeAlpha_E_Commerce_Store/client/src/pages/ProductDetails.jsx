import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg"
      />

      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-xl text-orange-500 mt-2">₹{product.price}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>

        <button
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-md"
        >
          Add to Cart
        </button>


      </div>
    </div>
  );
}
