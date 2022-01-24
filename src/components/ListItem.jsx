import React from "react";
import "./ListItem.css";

function ListItem(props) {
  const newClassName = props.className === "" ? "listitem" : `listitem ${props.className}`;

  return (
    <li
      key={props.dataId}
      className={newClassName}
      data-id={props.dataId}
      draggable='true'
      onDragEnd={props.dragEnd}
      onDragStart={props.dragStart}
    >
      {props.title}
    </li>
  );
}

export default ListItem;
