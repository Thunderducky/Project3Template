import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtnDisplay() {
  return (
    <span className="delete-btn-display">
      ✗
    </span>
  );
}

export default DeleteBtnDisplay;
