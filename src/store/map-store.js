import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export class MapStore {
  center = { lat: 55.917839651090226, lng: 92.72993988700969 };
  zoom = 15;
  markers = [
    {
      id: uuidv4(),
      title: "Point 1",
      point: {
        lat: 55.91764854980106,
        lng: 92.72974357848639,
      },
    },
    {
      id: uuidv4(),
      title: "Point 2",
      point: {
        lat: 55.9160599879703,
        lng: 92.73315853782758,
      },
    },
    {
      id: uuidv4(),
      title: "Point 3",
      point: {
        lat: 55.91581948668801,
        lng: 92.72680706688031,
      },
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  updateCenter(center) {
    this.center = center;
  }

  addMarker = title => {
    const newMarker = {
      id: uuidv4(),
      title: title,
      point: this.center,
    };

    this.updateMarkers([...this.markers, newMarker]);
  };

  updateMarkers = markers => {
    this.markers.replace(markers);
  };
}
