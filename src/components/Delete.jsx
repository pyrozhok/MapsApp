import React from "react";

const Delete = props => {
  return (
    <button className="delete-item" onClick={props.onClick}>
      X
    </button>
  );
};

export default Delete;
