// 1.  Recreate the Context API example(that we discussed in the session) using Class components in React with TypeScript?
// 	 -->  Prepare short notes on context api in class components.

import React, { Component } from "react";
import GrandChilds from "./GrandChilds";

class Childs extends Component {
  render() {
    return (
      <div style={{ margin: "10px", border: "2px solid Green" }}>
        <h3>This is Child Component</h3>
        <hr />
        <GrandChilds />
      </div>
    );
  }
}

export default Childs;
