import React, {useState} from 'react'
import  {Link, useMatch, useResolvedPath} from "react-router-dom"
import { useEffect } from 'react';
import './Navbar.css';
import profileUser from '../assets/user.png'
import { useUser } from '../context/UserContext'; 


// used this youtube video to understand how to create navbar and do the routing https://www.youtube.com/watch?v=I2UBjN5ER4s
export default function Navbar(){
    const [button, setButton] = useState(true);
    const [click, setClick] = useState(true);
    const handleClick = () => {
        setClick(!click);
    }

    const { username, setUsername } = useUser(); 

    // const handleSignOut = () => {
    //     // Clear username from state and localStorage on sign-out
    //     localStorage.removeItem("username");
    //     setUsername('');
    //     navigate("/register");
    //   };


    const closeMobileMenu = () => {
        setClick(false);
    }

    const handleSignOut = () => {
        setUsername('');  
        localStorage.removeItem("username"); 
      };

    const showButton = () => {
        if (window.innerWidth <= 960){
            setButton(false);
        }
        else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
        return () => window.removeEventListener('resize', showButton);
    }, []);
    return(
        <>
            <nav className="navbar">
                <div className="flex justify-between items-center w-full">
                   
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas-fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        { username ? (
                            <>
                                 <Link to={`/`} className='site-title'>ClozExchange</Link>
                                <CustomLink to={`/`} className="nav-links" onClick={closeMobileMenu}>Home</CustomLink>
                                <CustomLink to={`/categories/${username}`} className="nav-links" onClick={closeMobileMenu}>Categories</CustomLink>
                                <CustomLink to={`/myshops/${username}`}className="nav-links" onClick={closeMobileMenu}>My Shops</CustomLink>
                                <CustomLink to={`/product/:productId`}className="nav-links" onClick={closeMobileMenu}>Products</CustomLink>
                                <CustomLink to={`/trades/${username}`}className="nav-links" onClick={closeMobileMenu}>Trades</CustomLink>
                            </>
                    ) : (
                        <CustomLink to="/" className="nav-links" onClick={closeMobileMenu}>Register</CustomLink>
                        )}
                    </ul>
                    {/* {button && <Button buttonStyle='btn--outline'>Register</Button>} */}
                    <div className="flex items-center gap-6">
                    <div className="group relative">
                        {/* Profile icon */}
                        <img src={profileUser} className="w-5 cursor-pointer" alt="profile picture" />
                        {/* Dropdown menu */}
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 bg-black text-white">
                            {/* <Link to="/profile" className="cursor-pointer hover:text-purple-500">
                            My Profile
                        </Link> */}
                        <Link to="/orders" className="cursor-pointer hover:text-purple-500">
                            Orders
                        </Link>
                        <Link to="/register" className="cursor-pointer hover:text-purple-500" onClick={handleSignOut}>
                            Sign out
                        </Link>
                            </div>
                        </div>
                    </div>
            </div>

                </div>
            </nav>
        </>
    )
};

function CustomLink({to, children, ...props}){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({path: resolvedPath.pathname, end: true});
    return(
      <li className={isActive ? "active": ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}



