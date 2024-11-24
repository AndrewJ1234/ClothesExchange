// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useUser } from "../context/UserContext";

// const MyShop = () => {
//   // const { username } = useParams();
//   // const { products } = useContext()
//   const { username } = useUser();

//   const sendData = () => {

//   }

//   return (
//     <>
//       <Navbar />
//       <div className="h-screen flex items-start justify-center">
//         <div className="text-base sm:text-2xl mb-4 mt-20">
//           <h2 className="text-base text-black">{username} Shop</h2>s
//           <button className="text-base font-medium text-black border border-black bg-white px-4 py-2 rounded-md hover:bg-gray-100" onClick={}>
//             Create Products
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// // function MyShop() {
// //   const { username } = useParams(); // Extract the username from the URL
// //   const [shopItems, setShopItems] = useState([]);

// //   useEffect(() => {
// //     // Fetch shop items for this username from the backend
// //     axios
// //       .get(`http://localhost:20943/api/users/myshop/${username}`)
// //       .then((response) => {
// //         if (response.data && response.data.length > 0) {
// //           setShopItems(response.data);
// //         } else {
// //           console.log("No shop items found for this user.");
// //         }
// //       })
// //       .catch((error) => {
// //         if (error.response && error.response.status === 404) {
// //           console.error("Shop not found for username:", username);
// //         } else {
// //           console.error("Error fetching shop items:", error);
// //         }
// //       });
// //   }, [username]); // Re-fetch data if the username changes

// //   return (
// //     <div>
// //       <h2>{username}'s Shop</h2>
// //       <ul>
// //         {shopItems.map((item) => (
// //           <li key={item._id}>{item.name}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// export default MyShop;

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

    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      console.error("All fields are required!");
      return;
    }

    const productData = {
      title: newProduct.title,
      price: newProduct.price,
      image: newProduct.image,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL2}/api/shops/${username}/myshop/add`,
        productData
      );
      console.log("Product added:", response.data);

      // Optimistically update the product list
      setProducts((prevProducts) => [...prevProducts, response.data.product]);

      // Reset the form
      setNewProduct({ title: "", price: "", image: "" });
      setIsFormVisible(false); // Hide form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col items-center mt-10">
        <h2 className="text-2xl font-bold mb-4">{username}'s Shop</h2>

        <button
          className="text-base font-medium text-black border border-black bg-white px-4 py-2 rounded-md hover:bg-gray-100"
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
                  <h4 className="text-xl font-semibold">{product.title}</h4>
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
