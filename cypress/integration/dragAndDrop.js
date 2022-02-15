describe("Drag and Drop", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should move first item to 3rd position", () => {
    // when
    dragItem(1, 3);

    // then
    getListItemValue(1).should("have.text", "Point 2");
    getListItemValue(2).should("have.text", "Point 3");
    getListItemValue(3).should("have.text", "Point 1");
  });
});

function dragItem(indexToMove, targetIndex) {
  const dataTranferMock = { setData: () => {}, setDragImage: () => {} };
  cy.get(`li:nth-child(${indexToMove}) > .drag`).trigger("dragstart", {
    dataTransfer: dataTranferMock,
  });
  cy.get(`li:nth-child(${targetIndex})`).trigger("dragover");
}

function getListItemValue(index) {
  return cy.get(
    `li:nth-child(${index}) > [data-testid="listitem"] > .listitem__text`
  );
}
