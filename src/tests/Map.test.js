import React from "react";
import { render } from "@testing-library/react";

import Map from "../components/Map";

describe("Map", function () {
  const updateCenter = jest.fn();
  const handleDataChanged = jest.fn();
  const center = { lat: 55.917839651090226, lng: 92.72993988700969 };
  const zoom = 15;

  const markers = [
    {
      id: "point-1",
      title: "Point 1",
      point: {
        lat: 55.91764854980106,
        lng: 92.72974357848639,
      },
    },
    {
      id: "point-2",
      title: "Point 2",
      point: {
        lat: 55.9160599879703,
        lng: 92.73315853782758,
      },
    },
    {
      id: "point-3",
      title: "Point 3",
      point: {
        lat: 55.91581948668801,
        lng: 92.72680706688031,
      },
    },
  ];
  test("If map is rendered", () => {
    render(
      <Map
        center={center}
        zoom={zoom}
        markers={markers}
        updateCenter={updateCenter}
        handleDataChanged={handleDataChanged}
      />
    );
  });
});
