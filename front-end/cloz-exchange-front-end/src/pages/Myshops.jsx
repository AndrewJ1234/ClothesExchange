import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import axios from "axios";

const MyShop = () => {
  const { username } = useUser();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    tag: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL2}/api/shops/${username}/myshop`
        );
        if (response.data && response.data.shop) {
          setProducts(response.data.shop);
          console.log('Products state after setting:', response.data.shop);
        } else {
          console.warn("No items found in the shop:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [username]);

  // Handle form submission to add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.title || !newProduct.price || !newProduct.image || !newProduct.tag ) {
      console.log(newProduct.tag);
      console.error("All fields are required!");
      return;
    }

    const productData = {
      title: newProduct.title,
      price: newProduct.price,
      image: newProduct.image,
      tag: newProduct.tag
    };
    console.log('Product Data line 54', productData); // debugging

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL2}/api/shops/${username}/myshop/add`,
        productData
      );
      console.log("Product added:", response.data);

      setProducts((prevProducts) => [...prevProducts, response.data.product]);

      // Reset the form
      setNewProduct({ title: "", price: "", image: "", tag: "" });
      setIsFormVisible(false); // Hide form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (field, value) => {
    setNewProduct({
      ...newProduct,
      [field]: value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center mt-10 items-center">
        <h2 className="text-2xl font-bold mb-4 relative top-8 justify-center">{username}'s Shop</h2>

        <button
          className="text-base font-medium text-black border border-black bg-white px-4 py-2 rounded-md hover:bg-gray-100 relative top-8"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Cancel" : "Create Product"}
        </button>

        {/* Product Form */}
        {isFormVisible && (
          <form
            className="mt-4 p-4 border rounded-md bg-gray-50 w-80"
            onSubmit={handleAddProduct}
          >
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4 mr-2">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Tag
              </label>
                  <label className="block text-black">
                    <input
                      type="radio"
                      name="tag"
                      onChange={(e) => handleChange("tag", e.target.value)}
                      value='pants'
                      className="mr-2"
                    />
                    Pants
                  </label>
                  <label className="block text-black">
                    <input
                      type="radio"
                      name="tag"
                      onChange={(e) => handleChange("tag", e.target.value)}
                      value='shirts'
                      className="mr-2"
                    />
                    Shirts
                  </label>
                  <label className="block text-black">
                    <input
                      type="radio"
                      name="tag"
                      onChange={(e) => handleChange("tag", e.target.value)}
                      value='jackets'
                      className="mr-2"
                    />
                    Jackets
                  </label>
            </div>
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </form>
        )}
        {console.log("Product list", products)} 
        {/* {products.map((prod) => {
          console.log(prod.tag)
          console.log('product tags', prod.tag)
        })} */}
        {/* Product List */}
        <div className="mt-10 w-full max-w-4xl">
          <h3 className="text-lg font-bold mb-4">Products</h3>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-md p-4 flex flex-col items-center text-center"
                >
                  <img
                    src={product.image || "https://via.placeholder.com/150"}
                    alt={product.title || "Default Product"}
                    className="w-32 h-32 object-cover mb-2"
                  />
                  <h4 className="text-xl font-semibold">{product.name}</h4>
                  <p className="text-gray-700 mt-1">${product.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyShop;
