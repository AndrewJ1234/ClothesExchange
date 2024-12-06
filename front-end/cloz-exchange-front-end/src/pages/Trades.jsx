import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
function Trades() {
  const { username } = useUser();
  const url = `${import.meta.env.VITE_BACKEND_URL2}/api/trades/${username}`;
  const [userTrades, setUserTrades] = useState([]);
  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await axios.get(url);
        console.log("response", response);
        let data = await response.data.userTrades;
        console.log("userTrades", userTrades);
        setUserTrades(data); 
      } catch (error) {
        console.error(error);
      }
    };

    sendData();
  });
  return (
    <>
      <h1 className="absolute top-20 left-1/2 transform-translate-x-1/2-translate-y-1/2 text-black">
        {username}'s Trades
      </h1>
      <div className='absolute top-30 left-1/2 left-1/2 transform-translate-x-1/2-translate-y-1/2 '>
            {userTrades.map((trade, index) => (
                <div key={index} className='border border-gray-500'>
                    <h3 className='text-black'>Name: {trade.name}</h3>
                    <img className='w-32 h-32' src={trade.image} alt={trade.name} />
                    <p className='text-black'>Price: ${trade.price}</p>
                    <p className='text-black'>Tag: {trade.tag}</p>
                </div>
            ))}
        </div>
    </>
  );
}

export default Trades;
