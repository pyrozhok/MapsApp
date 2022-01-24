import "./App.css";
import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import StateView from "./components/StateView";
import List from "./components/List";
import Map from "./components/Maps/Map";

function App(props) {
  const [index, setIndex] = useState(0);

  // https://stackoverflow.com/questions/53215285/how-can-i-force-a-component-to-re-render-with-hooks-in-react
  const forceUpdate = useReducer(() => ({}))[1];
  const [markers, setMarkers] = useState([
    {
      id: uuidv4(),
      title: "Point 1",
      sortIndex: index,
      point: {
        lat: 55.91764854980106,
        lng: 92.72974357848639,
      },
    },
  ]);

  const [center, setCenter] = useState({
    lat: 55.917839651090226,
    lng: 92.72993988700969,
  });

  const zoom = 15;

  function onKeyUpValue(event) {
    if (event.charCode === 13 && event.target.value.length > 0) {
      let sortIndex = index;
      setMarkers([
        ...markers,
        {
          id: uuidv4(),
          title: event.target.value,
          sortIndex: sortIndex + 1,
          point: { lat: center.lat, lng: center.lng },
        },
      ]);

      setIndex(index + 1);

      //Clear input
      event.target.value = "";
    }
  }

  function handleDataChanged(data) {
    console.log(data);
    setMarkers(data);
    forceUpdate();
  }

  function handleCenterChanged(center) {
    console.log(center);
    setCenter(center);
  }

  return (
    <div className='wrapper'>
      <StateView state={markers} />
      <div className='container'>
        <div className='left-side'>
          <input onKeyPress={onKeyUpValue} />
          <List data={markers} handleDataChanged={handleDataChanged} />
        </div>
        <div className='right-side'>
          <Map
            center={center}
            zoom={zoom}
            markers={markers}
            updateCenter={handleCenterChanged}
            handleDataChanged={handleDataChanged}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
