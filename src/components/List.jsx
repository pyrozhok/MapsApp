import React, { useState } from "react";
import ListItem from "./ListItem";
import Delete from "./Delete";
import "./List.css";

function List(props) {
  const [draggedOverId, setDraggedOverId] = useState(undefined);
  const [beingDragged, setBeingDragged] = useState(undefined);

  const listItems = props.data.map((item, i) => {
    // highlight the new position
    let dragClass = i === draggedOverId ? "listitem-over" : "";

    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ListItem
          key={item.id}
          dataId={i}
          className={dragClass}
          title={item.title}
          dragStart={dragStart}
          dragEnd={dragEnd}
        ></ListItem>
        <Delete onClick={() => handleDelete(item)} />
      </div>
    );
  });

  const handleDelete = (item) => {
    const items = props.data.filter((marker) => marker.id !== item.id);
    props.handleDataChanged(items);
  };

  function updateState(items, draggedOverId) {
    setDraggedOverId(draggedOverId);
    setBeingDragged(draggedOverId);

    // update the sortIndex
    items.forEach((item, i) => {
      item.sortIndex = i;
    });

    props.handleDataChanged(items);
  }

  function dragStart(e) {
    // Update our state with the item that is being dragged
    setBeingDragged(Number(e.target.dataset.id));
    e.dataTransfer.effectAllowed = "move";
  }

  function dragOver(e) {
    e.preventDefault();
    // ignore when dragging over the list container
    if (e.target.className === "list") return;

    let from = beingDragged;
    let to = Number(e.target.dataset.id);
    setDraggedOverId(to);

    // reorder the array with the current hover position
    let items = props.data;
    items.splice(to, 0, items.splice(from, 1)[0]);

    updateState(items, to);
  }

  function dragEnd() {
    // Update state to force removal of the class used for highlighting
    updateState(props.data, undefined);
  }

  return (
    <ul className='list' onDragOver={dragOver}>
      {listItems}
    </ul>
  );
}

export default List;
