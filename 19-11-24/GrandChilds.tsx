import React, { Component } from "react";
import { contextObjs, UserInfo } from "./context";

class GrandChilds extends Component {
  // 3. Context Consumer
  static contextType = contextObjs;
  render() {
    //trying to access context
    const contextData = this.context as UserInfo | null;
    return (
      <div style={{ margin: "10px", border: "2px solid Blue" }}>
        <h3>This is Grand Child Component</h3>
        <hr />

        <div>
          <h3> User Details : </h3>
          <p>
            User Id : {contextData?.id} <br />
            User Name : {contextData?.name} <br />
            User Email : {contextData?.email}
          </p>
        </div>
      </div>
    );
  }
}

export default GrandChilds;
