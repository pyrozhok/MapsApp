import React from "react";
import { observer } from "mobx-react-lite";
import Delete from "./Delete";
import "./List.css";

const List = ({ items, dragStart, dragOver, dragEnd, handleDelete }) => {
  return (
    <ul className="list" onDragOver={e => e.preventDefault}>
      {items.map((item, index) => (
        <li key={index} onDragOver={e => dragOver(e, index)}>
          <div
            className="drag"
            draggable
            onDragStart={e => dragStart(e, index)}
            onDragEnd={dragEnd}
            data-testid="listitem"
          >
            <span className="listitem-text">{item.title}</span>
            <Delete onClick={() => handleDelete(item)} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default observer(List);
