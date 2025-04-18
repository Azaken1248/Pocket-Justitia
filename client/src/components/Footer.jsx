import React from "react";

const customStyles = {
    background: "",
    fontWeight: 600,
    borderTop: "2px solid", 
    borderImage: "linear-gradient(90deg, rgba(27, 42, 65, 1) 0%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 1) 75%, rgba(27, 42, 65, 1) 100%) 1", // Added slice parameter
    color: "#F5F5F5",
    width: "100%",
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    textAlign: "center",
    boxSizing: "border-box"
};

function Footer(){
    return(
        <div className="container" style={customStyles}>
            <span><h5>2023 Justicia - &copy; All rights reserved</h5></span>
        </div>
    );
}

export default Footer;