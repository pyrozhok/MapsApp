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
  const [activeMarker, setActiveMarker] = useState(null);
  const [isVisibleInfoWindow, setIsVisibleInfoWindow] = useState(false);

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

  const handleOnMarkerClick = (markerId) => {
    setActiveMarker(markerId);
    setIsVisibleInfoWindow(true);
  };

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

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
    setIsVisibleInfoWindow(false);
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
            props.markers.map((marker, index) => (
              <Marker
                key={marker.id}
                onDrag={(event) => handleOnMarkerDragged(event, index)}
                position={marker.point}
                draggable
                onClick={() => handleOnMarkerClick(marker.id)}
                label={marker.title}
              >
                {isVisibleInfoWindow === true && activeMarker === marker.id && (
                  <InfoWindow
                    key={`infowindow-${marker.title}`}
                    position={marker.point}
                    onCloseClick={handleInfoWindowClose}
                  >
                    <div>{marker.title}</div>
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
