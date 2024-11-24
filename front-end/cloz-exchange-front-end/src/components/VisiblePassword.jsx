import React from 'react'
import { useState,useEffect } from 'react';

// created component based off of this article that tells me how to show/hide text https://stackoverflow.com/questions/71679442/show-hide-multiple-password-in-react-js
const VisiblePassword = ({ value, handleChange }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className='relative mb-4'>
            <input
                placeholder='Password'
                type={isVisible ? "text" : "password"}
                value={value}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full p-3 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button type="button" 
             className="absolute right-3 border-solid top-1/2 border-gray-300 transform bg-white -translate-y-1/2 text-sm text-gray-600 focus:outline-none"
            onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide" : "Show"}
                
            </button>
        </div>
    );
};
export default VisiblePassword;