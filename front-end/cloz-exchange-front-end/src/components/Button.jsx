import React from 'react'
import {Link} from 'react-router-dom';

const Button = ({children, buttonStyle, to}) => {
    return (
        <Link to={to} className='btn-mobile'>
            {children}
        </Link>

    );
}
export default Button