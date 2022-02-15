import "./App.css";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import StateView from "./components/StateView";
import List from "./components/List";
import Map from "./components/Map";
import { toJS } from "mobx";

function App(props) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [markedItem, setMarkedItem] = useState(null);

  const onKeyUpValue = event => {
    if (event.charCode === 13 && event.target.value.length > 0) {
      props.store.addMarker(event.target.value);

      //Clear input
      event.target.value = "";
    }
  };

  const handleDataChanged = data => {
    props.store.updateMarkers(data);
  };

  const handleCenterChanged = center => {
    props.store.updateCenter(center);
  };

  const onDragStart = (e, index) => {
    const items = toJS(props.store.markers);
    const draggedItem = items[index];

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);

    setDraggedItem(draggedItem);
  };

  const onDragOver = (e, index) => {
    e.preventDefault();

    const items = toJS(props.store.markers);
    const draggedOverItem = items[index];

    // if item is dragged over itself, ignore
    if (draggedItem.id === draggedOverItem.id) {
      return;
    } else {
      // filter out the currently dragged item
      const upItems = items.filter(item => item.id !== draggedItem.id);

      // add the dragged item after the dragged over item
      upItems.splice(index, 0, draggedItem);

      if (markedItem) markedItem.classList.remove("dragged");
      e.currentTarget.classList.add("dragged");

      setMarkedItem(e.currentTarget);
      handleDataChanged(upItems);
    }
  };

  const onDragEnd = () => {
    if (markedItem) markedItem.classList.remove("dragged");
    setDraggedItem(null);
    setMarkedItem(null);
  };

  const handleDelete = item => {
    const items = toJS(props.store.markers);
    const filteredItems = items.filter(marker => marker.id !== item.id);

    handleDataChanged(filteredItems);
  };

  return (
    <div className="wrapper">
      {/* <StateView state={props.store.markers} /> */}
      <div className="container">
        <div className="left-side">
          <input
            onKeyPress={onKeyUpValue}
            placeholder="Введите название точки"
          />
          <List
            items={toJS(props.store.markers)}
            dragStart={onDragStart}
            dragOver={onDragOver}
            dragEnd={onDragEnd}
            handleDelete={handleDelete}
          />
        </div>
        <div className="right-side">
          <Map
            center={props.store.center}
            zoom={props.store.zoom}
            markers={toJS(props.store.markers)}
            updateCenter={handleCenterChanged}
            handleDataChanged={handleDataChanged}
          />
        </div>
      </div>
    </div>
  );
}

export default observer(App);
