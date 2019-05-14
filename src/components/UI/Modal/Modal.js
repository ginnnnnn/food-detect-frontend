import React from "react";
import "./Modal.css";

import Backdrop from "../Backdrop/Backdrop";

const Modal = ({ canceled, show, children }) => {
  return (
    <React.Fragment>
      <Backdrop clicked={canceled} show={show} />
      <div
        className="Modal vh-75 pre"
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0"
        }}
      >
        {children}
      </div>
    </React.Fragment>
  );
};

export default Modal;

//Backdrop ex!!
