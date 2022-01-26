import "./App.css";
import React from "react";
import { observer } from "mobx-react-lite";
import StateView from "./components/StateView";
import List from "./components/List";
import Map from "./components/Maps/Map";
import { toJS } from "mobx";

function App(props) {
  function onKeyUpValue(event) {
    if (event.charCode === 13 && event.target.value.length > 0) {
      props.store.addMarker(event.target.value);

      //Clear input
      event.target.value = "";
    }
  }

  function handleDataChanged(data) {
    props.store.updateMarkers(data);
  }

  function handleCenterChanged(center) {
    props.store.updateCenter(center);
  }

  return (
    <div className='wrapper'>
      <StateView state={props.store.markers} />
      <div className='container'>
        <div className='left-side'>
          <input onKeyPress={onKeyUpValue} placeholder='Введите название точки' />
          <List data={toJS(props.store.markers)} handleDataChanged={handleDataChanged} />
        </div>
        <div className='right-side'>
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
