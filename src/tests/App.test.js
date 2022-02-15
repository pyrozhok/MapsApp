import React from "react";
import { mount } from "enzyme";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("App", function () {
  let wrapper;
  beforeEach(function () {
    this.store = {
      markers: [
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
      ],
      addMarker: value => {
        this.newMarker = value;
      },
    };
    wrapper = mount(<App store={this.store} />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("calls addMarker when hitting the Enter key", function () {
    const { getByPlaceholderText } = render(<App store={this.store} />);
    const inputNode = getByPlaceholderText("Введите название точки");
    userEvent.type(inputNode, "new point{enter}");

    expect(this.newMarker).toEqual("new point");
  });
});
