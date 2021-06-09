import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="container text-center" style={{ minHeight: '30vh' }}>
            <img src="/assets/images/error404.png" alt="" className="w-100" />
            <Link to="/" style={{background: '#005A8A'}} className="btn mb-5 text-white px-4">Return Home</Link>
        </div>

    );
}

export default NotFound;
