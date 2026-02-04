import Product from "../models/Product.js";

// GET all products
export const getProducts = async (req, res) => {
  const { category } = req.query;

  let products;

  if (category === "electronics") {
    products = await Product.find({
      category: {
        $regex: /(electronics|mobile|watch|headphone|laptop|smartwatch|tablet|camera)/i,
      },
    });
  } else if (category === "fashion") {
    products = await Product.find({
      category: {
        $regex: /(fashion|shirt|jeans|shoes|clothing|tshirt|cloth)/i,
      },
    });
  } else if (category === "home") {
    products = await Product.find({
      category: {
        $regex: /(home|furniture|kitchen|sofa|table)/i,
      },
    });
  } else {
    products = await Product.find({
      category: { $regex: new RegExp(category, "i") },
    });
  }

  res.json(products);
};



// GET single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

// CREATE product (admin later)
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.image = req.body.image || product.image;
  product.category = req.body.category || product.category;
  product.description = req.body.description || product.description;
  product.countInStock = req.body.countInStock || product.countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};
