import { MapStore } from "../store/map-store";

describe("MapStore", () => {
  it("creates new marker", () => {
    const store = new MapStore();
    store.addMarker("Point 4");

    expect(store.markers.length).toBe(4);
    expect(store.markers[3].title).toBe("Point 4");
  });

  it("clears markers", () => {
    const store = new MapStore();
    store.updateMarkers([]);

    expect(store.markers.length).toBe(0);
  });

  it("updates center coodrinates", () => {
    const store = new MapStore();
    store.updateCenter({ lat: 55.8, lng: 92.6 });

    expect(store.center).toStrictEqual({ lat: 55.8, lng: 92.6 });
  });
});
