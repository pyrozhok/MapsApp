import React from "react";
import { mount } from "enzyme";
import { render, screen } from "@testing-library/react";
import List from "../components/List";

describe("ListItem", function () {
  beforeEach(function () {
    this.items = [
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
  });

  it("Removes an item by clicking a Delete button", function () {
    const handleDelete = jest.fn(() => {
      this.items.splice(0, 1);
    });
    const wrapper = mount(
      <List items={this.items} handleDelete={handleDelete} />
    );

    wrapper
      .find(".list")
      .childAt(0)
      .find("Delete")
      .find("button")
      .simulate("click");

    expect(this.items).toHaveLength(2);
  });

  it("Renders list of points", function () {
    const dragStart = jest.fn();
    const dragOver = jest.fn();
    const dragEnd = jest.fn();
    const handleDelete = jest.fn(() => {
      this.items.splice(0, 1);
    });

    render(
      <List
        items={this.items}
        dragStart={dragStart}
        dragOver={dragOver}
        dragEnd={dragEnd}
        handleDelete={handleDelete}
      />
    );

    const itemsBefore = screen.queryAllByTestId("listitem");

    const firstTextBefore = itemsBefore[0].firstElementChild.textContent;
    const secondTextBefore = itemsBefore[1].firstElementChild.textContent;
    const thirdTextBefore = itemsBefore[2].firstElementChild.textContent;

    expect([firstTextBefore, secondTextBefore, thirdTextBefore]).toEqual([
      "Point 1",
      "Point 2",
      "Point 3",
    ]);
  });
});
