import React from "react"
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext'; 


function Home(){
    const { username } = useUser();
    return(
        <>
        <Navbar/>
        <div className='h-screen flex items-start justify-center'>
            <div className="text-base sm:text-2xl mb-4 mt-20">
            <h2 className="text-base text-black">{username} ALL COLLECTIONS</h2>

            </div>

            {/* Map Products */}
            {/* <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>{
                filterProducts.map((item, index)=> {
                    
                })
            }
            </div> */}
        </div>
        </>
    )
}

export default Home