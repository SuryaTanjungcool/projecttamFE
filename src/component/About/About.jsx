import React, { useState } from "react";
import { FaEye, FaTrashAlt, FaPlus } from "react-icons/fa";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Chocolate Cake", price: 5.99, image: "" },
    { id: 2, name: "Strawberry Cheesecake", price: 6.99, image: "" },
    { id: 3, name: "Lemon Tart", price: 4.99, image: "" },
  ]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([
      ...products,
      { id: products.length + 1, ...newProduct, price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: "", price: "", image: "" });
  };

  const handleViewProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="container py-14">
      <h1 className="text-center text-3xl font-bold mb-8">Desserts Menu</h1>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">Price: ${product.price.toFixed(2)}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleViewProduct(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <FaEye /> View
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      <div className="mt-10 p-6 bg-gray-100 rounded-lg">
        {editingProduct ? (
          <>
            <h2 className="text-xl font-bold mb-4">View Product</h2>
            {editingProduct.image && (
              <img
                src={editingProduct.image}
                alt={editingProduct.name}
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
            )}
            <h3 className="text-lg font-semibold">{editingProduct.name}</h3>
            <p className="text-gray-700">Price: ${editingProduct.price.toFixed(2)}</p>
            <p className="text-gray-700 mt-4">No editing allowed in view mode.</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                className="w-full h-32 object-cover mb-4 rounded-lg"
              />
            )}
            <button
              onClick={handleAddProduct}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryDark flex items-center gap-2"
            >
              <FaPlus /> Add Product
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
