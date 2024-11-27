import React from 'react';

class Lifecycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("Constructor: Component is initialized.");
  }

  // Mounting Phase: Called after the component is inserted into the DOM
  componentDidMount() {
    console.log("componentDidMount: Component is now mounted.");
  }

  // Updating Phase: Called when state or props change
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: Component updated.");
    console.log("Previous State:", prevState, "Current State:", this.state);
  }

  // Unmounting Phase: Called before the component is removed from the DOM
  componentWillUnmount() {
    console.log("componentWillUnmount: Component is being removed.");
  }

  // Handle button click to demonstrate updates
  incrementCounter = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    console.log("Render: Component is being rendered.");
    return (
      <div>
        <h1>React Component Lifecycle Demo</h1>
        <p>Counter: {this.state.count}</p>
        <button onClick={this.incrementCounter}>Increment Counter</button>
      </div>
    );
  }
}

export default Lifecycle;
