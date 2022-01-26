import React from "react";
import { observer } from "mobx-react-lite";

function StateView(props) {
  return (
    <div>
      <h4>Current state</h4>
      <pre>{JSON.stringify(props.state, 0, 2)}</pre>
    </div>
  );
}

export default observer(StateView);
