import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Categories() {
  //   const { username } = useParams();  // Extract username from URL
  const [categories, setCategories] = useState([]);
  const { username } = useUser();
  const pantsArr = [];
  const jacketsArr = [];
  const shirtsArr = [];
  const allClothesArr = [];
  const [isForm, setIsForm] = useState(false);
  const navigate = useNavigate();
  let usernameShop = {};
  const [currentTrader, setCurrentTrader] = useState(null);
const [currentItem, setCurrentItem] = useState(null);
  const [tradedUserClothes, setUserTradedClothes] = useState(null);
  const url = `${import.meta.env.VITE_BACKEND_URL2}/api/trades/${username}`

  const setClothes = (e) => {
    // console.log('hello', e.target.value) debugging
    setUserTradedClothes({username: username, item: e.target.value});
  }


  const sendData = (e) => {
    axios.post(url, {user: tradedUserClothes, traderUser: currentTrader, traderUserClothes: currentItem})
    .then((response) => console.log('response', response))
    .catch((error) => console.error(error));
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendData();
    navigate(`/trades/${username}`); // navigates to the trade link
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL2
          }/api/categories/${username}/categories`
        );
        if (response.data) {
          // setProducts(response.data.shop);
          console.log("Shop Data", response.data.shopData);
          setCategories(response.data.shopData);
        } else {
          console.warn("No items found in any of the shops:", response.data);
          // setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // setProducts([]);
      }
    };
    fetchProducts();
  }, [username]);
  // console.log("categories", categories); // debugging
  const getCategories = () => {
    //   // display the categories of clothing
    //   // pants, jackets, and shirts
    //   // under each category display the product and username next to it
    //   // create 3 different arrays: in each array it will contain the item and username
    categories.map((shop) => {
      console.log(shop.slug.includes(username));
      if (!shop.slug.includes(username)) {
        console.log("user shop", shop.slug, shop.items);
        if (shop.tag === "pants") {
          pantsArr.push({
            shop: shop,
            username: shop.slug.substring(0, shop.slug.length - 5),
          });
        } else if (shop.tag === "shirts") {
          shirtsArr.push({
            shop: shop,
            username: shop.slug.substring(0, shop.slug.length - 5),
          });
        } else {
          jacketsArr.push({
            shop: shop,
            username: shop.slug.substring(0, shop.slug.length - 5),
          });
        }
      } else {
        usernameShop = shop;
      }
    });
  };
  // sort the elements based on the size of the elements
  getCategories();
  allClothesArr.push({ inventory: jacketsArr, category: "Jackets" });
  allClothesArr.push({ inventory: shirtsArr, category: "Shirts" });
  allClothesArr.push({ inventory: pantsArr, category: "Pants" });

  // sort the categories
  
  function sortByLen(){
    return function compareNumbers(a, b) {
    return a.length - b.length;
  }
}
allClothesArr.sort(sortByLen());

  // console.log(allClothesArr);

  const toggleForm = (id) => {
    setIsForm(isForm === id ? null : id);
  }
    // generate a form when clicked on
    //  select piece of clothes that you want to trade
    // condition: if the two pieces of clothes have same price or if your piece of clothes has higher price
    //  then trade is successful
    // if the condition is true -> trade successful
    // piece of clothes that was from other username gets added to your shop and gets added to your list of trades
    // piece of clothes that you traded gets added to the other username

  // console.log('jacket Arr', jacketsArr)
  // console.log('pants Arr', pantsArr)
  // console.log('shirts Arr', shirtsArr)

  // in the div i want to display the product and the username
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-start justify-center">
        <div className="text-base sm:text-2xl mb-4 mt-20">
          {/* <h2 className="text-base text-black">{username} Categories</h2> */}
          <h2 className='absolute top-20 left-1/2 transform-translate-x-1/2-translate-y-1/2'>{username}'s Categories</h2>
          <div className="m-auto top-40 left-0 right-0 max-w-4xl absolute transform-translate-x-1/2-translate-y-1/2">
            {/* <h3 className="text-lg font-bold mb-4"></h3> */}
            <div className="space-y-6">
              {allClothesArr.length > 0 ? (
                allClothesArr.map((clothesArr, categoryIndex) => (
                  <div
                    key={`category-${categoryIndex}`}
                    className="border border-gray-300 p-6 bg-gray-100 flex flex-col items-center"
                  >
                    {/* Centered header */}
                    <h2 className="text-xl font-bold mb-6">
                      {clothesArr.category}
                    </h2>

                    {/* Inventory items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                      {clothesArr.inventory.map(
                        (inventoryItem, inventoryIndex) => (
                          
                          <div
                            key={`inventory-${categoryIndex}-${inventoryIndex}`}
                          >
                           {/* {setCurrentTrader(inventoryItem.username)} */}
                            {console.log('log', inventoryItem)}
                            {inventoryItem.shop?.items?.map(
                               
                              (item, itemIndex) => (
                                <div
                                  key={`item-${categoryIndex}-${inventoryIndex}-${itemIndex}`}
                                  className="border border-gray-300 p-4 text-center"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover mb-2"
                                  />
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-gray-600">${item.price}</p>
                                  <p className="text-gray-500 text-sm">
                                  <p>{inventoryItem.username}</p>
                                    Tag: {item.tag}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setCurrentTrader(inventoryItem.username);
                                      setCurrentItem(item);
                                      // console.log('itmessss', item)
                                      setIsForm(!isForm)
                                    }}
                                    className=""
                                  >
                                    {isForm ? "Cancel" : "Trade"}
                                  </button>
                                  {/* {console.log(usernameShop.items)}   */}
                                  {isForm && (
                                    <>
                                      <strong><h2>Trades</h2></strong>
                                      <form 
                                      id={`${item.id}-${itemIndex}`}
                                        action={`${import.meta.env.VITE_BACKEND_URL2}/api/trades/${username}`}
                                        method="POST"
                                        onSubmit={handleSubmit}
                                      >
                                        <div className='display-grid'>
                                        {usernameShop.items.map((item) => {
                                          {console.log(item)}
                                          return(
                                            <div 
                                            
                                            className='border rounded-md p-4 flex flex-col items-center text-center' 
                                            key={item._id}>
                                              <p>{item.name}</p>
                                              <p>${item.price}</p>
                                              <img className='w-32 h-32'
                                                src={item.image}
                                                alt={item.name}
                                              />
                                              <p>{item.tag}</p>
                                              <input
                                                type="radio"
                                                name="tradeClothes"
                                                value={item.image} // in the backend reference the image and find it in the array
                                                className='border-300'
                                                onChange = {(e) => {setClothes(e)}}
                                              />
                                          </div>
                                          )
                                        })}
                                        {/* {currentTraderShop = {username: currentTrader, item: currentItem}} */}
                                        {console.log(currentTrader)}
                                        {console.log(currentItem)}
                                        {/* {console.log('curret clothes', currentClothes)} */}
                                        </div>
                                        <input
                                          type="submit"
                                          value="confirm trade"
                                          className='border-gray-300 text-gray-900 border bg-gray-200 hover:bg-blue-500 focus:ring-blue-500 focus:bg-blue-500'
                                          // onClick={}
                                          onClick = {() => toggleForm(`${item.id}-${itemIndex}`)} // this might not work
                                        />
                                      </form>
                                    </>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No clothes available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;