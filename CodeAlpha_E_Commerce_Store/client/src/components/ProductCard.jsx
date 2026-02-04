import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow transition p-4">
      
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="h-44 bg-gray-100 rounded mb-3 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-800">
            {product.name}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            ₹{product.price}
          </p>
        </div>

        {/* Save for later */}
        <button className="text-gray-400 hover:text-orange-500">
          <FiHeart size={16} />
        </button>
      </div>
    </div>
  );
}
