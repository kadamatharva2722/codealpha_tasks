import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const token = localStorage.getItem("token");

    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Admin Products</h1>

      <div className="bg-white rounded-md shadow-sm">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">₹{product.price}</p>
            </div>

            <button
              onClick={() => deleteHandler(product._id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
