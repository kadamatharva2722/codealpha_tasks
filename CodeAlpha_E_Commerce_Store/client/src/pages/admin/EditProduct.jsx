import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    countInStock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await api.put(`/products/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Product updated");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-xl font-semibold mb-6">Edit Product</h1>

      <form className="space-y-4" onSubmit={submitHandler}>
        <input
          className="border p-2 w-full"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
          placeholder="Name"
        />

        <input
          className="border p-2 w-full"
          value={product.price}
          onChange={(e) =>
            setProduct({ ...product, price: e.target.value })
          }
          placeholder="Price"
        />

        <input
          className="border p-2 w-full"
          value={product.image}
          onChange={(e) =>
            setProduct({ ...product, image: e.target.value })
          }
          placeholder="Image URL"
        />

        <input
          className="border p-2 w-full"
          value={product.category}
          onChange={(e) =>
            setProduct({ ...product, category: e.target.value })
          }
          placeholder="Category"
        />

        <input
          className="border p-2 w-full"
          value={product.countInStock}
          onChange={(e) =>
            setProduct({ ...product, countInStock: e.target.value })
          }
          placeholder="Stock"
        />

        <textarea
          className="border p-2 w-full"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Description"
        />

        <button className="w-full bg-orange-500 text-white py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
