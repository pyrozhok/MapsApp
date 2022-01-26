import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "400px",
};

function Map(props) {
  const mapRef = useRef(null);

  const [path, setPath] = useState();
  const [isVisibleInfo, setIsVisibleInfo] = useState();

  useEffect(() => {
    const coordinates = [];
    props.markers.forEach(function (item) {
      coordinates.push({ lat: item.point.lat, lng: item.point.lng });
    });

    setPath(coordinates);
  }, [props.markes, props.handleDataChanged]);

  const handleOnMapLoad = (map) => {
    mapRef.current = map;
  };

  const onShowInfo = (markerId) => {
    setIsVisibleInfo(markerId);
  };

  // https://stackoverflow.com/questions/68425883/how-can-i-get-the-current-map-center-coordinates-using-getcenter-in-react-googl
  const handleCenterChanged = () => {
    if (!mapRef.current) return;
    const newCenter = mapRef.current.getCenter().toJSON();
    props.updateCenter(newCenter);
  };

  const handleOnMarkerDragged = (event, index) => {
    const { latLng } = event;
    props.markers[index].point = { lat: latLng.lat(), lng: latLng.lng() };
    props.handleDataChanged(props.markers);
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: path,
    zIndex: 1,
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyA6v4BqKCU23daFeE71QUuRvOQYyWe7qxo'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={props.zoom}
        onDragEnd={handleCenterChanged}
        onLoad={handleOnMapLoad}
      >
        <>
          {props.markers &&
            props.markers.map((position, index) => (
              <Marker
                key={position.id}
                onDrag={(event) => handleOnMarkerDragged(event, index)}
                position={position.point}
                draggable
                onClick={() => onShowInfo(position.id)}
                label={position.title}
              >
                {isVisibleInfo === position.id && (
                  <InfoWindow key={`infowindow-${position.title}`} position={position.point}>
                    <div>{position.title}</div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          <Polyline path={path} options={options} />
        </>
      </GoogleMap>
    </LoadScript>
  );
}

export default observer(Map);
