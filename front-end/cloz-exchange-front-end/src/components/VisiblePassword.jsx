import React from 'react'
import { useState,useEffect } from 'react';

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