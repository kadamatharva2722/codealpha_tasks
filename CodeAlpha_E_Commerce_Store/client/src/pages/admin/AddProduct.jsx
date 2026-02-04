import api from "../../api/axios";

export default function AddProduct() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Add Product</h1>

      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const token = localStorage.getItem("token");

          const product = {
            name: e.target.name.value,
            price: e.target.price.value,
            image: e.target.image.value,
            description: e.target.description.value,
            category: e.target.category.value,
            countInStock: e.target.stock.value,
          };

          await api.post("/products", product, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          alert("Product added");
        }}
      >
        <input name="name" placeholder="Name" className="input" />
        <input name="price" placeholder="Price" className="input" />
        <input name="image" placeholder="Image URL" className="input" />
        <input name="category" placeholder="Category" className="input" />
        <input name="stock" placeholder="Stock" className="input" />
        <textarea name="description" placeholder="Description" className="input" />

        <button className="w-full bg-orange-500 text-white py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
