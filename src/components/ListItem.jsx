import React from "react";
import "./ListItem.css";
import { observer } from "mobx-react-lite";

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

export default observer(ListItem);
