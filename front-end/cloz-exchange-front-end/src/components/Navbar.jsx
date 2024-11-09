import React, {useState} from 'react'
import  {Link, useMatch, useResolvedPath} from "react-router-dom"
import Button from './Button'
import { useEffect } from 'react';
import './Navbar.css';

export default function Navbar(){
    const [button, setButton] = useState(true);
    const [click, setClick] = useState(true);
    const handleClick = () => {
        setClick(!click);
    }
    const closeMobileMenu = () => {
        setClick(false);
    }

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
                <div className="navbar-container">
                    <Link to='/' className='site-title'>ClozExchange</Link>
                    { <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas-fa-bars'}></i>
                    </div>}
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <CustomLink to='/' className="nav-links" onClick={closeMobileMenu}>Home</CustomLink>
                        <CustomLink to='/categories' className="nav-links" onClick={closeMobileMenu}>Categories</CustomLink>
                        <CustomLink to='/chats' className="nav-links" onClick={closeMobileMenu}>Chats</CustomLink>
                        <CustomLink to='/myshops' className="nav-links" onClick={closeMobileMenu}>My Shops</CustomLink>
                        {/* <CustomLink to='/register' className="nav-links" onClick={closeMobileMenu}>Register</CustomLink> */}
                    </ul>
                    {/* {button && <Button buttonStyle='btn--outline'>Register</Button>} */}
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


// const [click, setClick] = useState(false);
    // const [button, setButton] = useState(true);
    // const handleClick = () => {
    //     setClick(!click);
    // }
    // const closeMobileMenu = () => {
    //     setClick(false);
    // }

    // const showButton = () => {
    //     if(window.innerWidth <= 960){
    //         setButton(false);
    //     }
    //     else{
    //         setButton(true);
    //     }
    // };

    // useEffect(() => {
    //     showButton();
    //     window.addEventListener('resize', showButton);
    //     return () => window.removeEventListener('resize', showButton);
    //   }, []);


