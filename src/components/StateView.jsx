import React from "react";

function StateView(props) {
  return (
    <div>
      <h4>Current state</h4>
      <pre>{JSON.stringify(props.state, 0, 2)}</pre>
    </div>
  );
}

export default StateView;
