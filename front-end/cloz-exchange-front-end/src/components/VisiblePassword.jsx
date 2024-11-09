import React from 'react'
import { useState,useEffect } from 'react';

// created component based off of this article that tells me how to show/hide text https://stackoverflow.com/questions/71679442/show-hide-multiple-password-in-react-js
const VisiblePassword = ({ value, handleChange }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <input
                placeholder='Password'
                type={isVisible ? "text" : "password"}
                value={value}
                onChange={(e) => handleChange("password", e.target.value)}
            />
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? "Hide" : "Show"}
            </button>
        </div>
    );
};
export default VisiblePassword;