import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ urlInput, buttonClick, text }) => {
  return (
    <div className="w-90 w-50-l center">
      <p className="f5 f3-ns tc fw7">{`I can sense what you eat, Beep Beep Beep`}</p>
      <div className="form flex justify-center  pa4 br3 shadow-5">
        <input
          type=" text"
          className="f4 pa2 center w-70 "
          onChange={urlInput}
          value={text}
          placeholder="img url here"
        />
        <button
          onClick={buttonClick}
          className="b w-30 f6 f4-ns grow link ph2 ph4-ns pv3  white bg-blue dib pointer"
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
