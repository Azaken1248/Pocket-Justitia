import React from "react";

const customStyles = {
    background: "linear-gradient(145deg, rgb(205, 227, 249) 0%, rgb(232, 239, 243) 55%, rgb(213, 189, 222) 100%)",
    fontWeight: "600",
    color: "#055791",
    minWidth: "100vw",
    height: "5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    textAlign: "center"
};

function Footer(){
    return(
        <div className="container" style={customStyles}>
            <span><h5>2023 Justicia - &copy; All rights reserved</h5></span>
        </div>
    );
}

export default Footer;