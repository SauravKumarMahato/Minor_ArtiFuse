import React from "react";
import { Link } from "react-router-dom"; // Assuming you want to use links for navigation
import "./Navbar.css";
import logo from './logo.png';


const Navbar = () => {
  return (
    <div className="nnavbar-container">
      <div className="logi-title-container">
            <img src={logo} alt="Logo" className="logo" />

       <div id="title">
       <h1>Artifuse</h1> {/* Title "Artifuse" */}
       </div>
     </div>
      <ul id="navbar">
        <li>
          <a href="http://localhost:5173/">Help</a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=23BHwAFIZmk">Inpainting Here</a>
        </li>
        <li>
          <a href="index.html">Home</a>
        </li>
       
      </ul>
    </div>
   
  );
};

export default Navbar;
