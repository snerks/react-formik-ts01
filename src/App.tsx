import * as React from "react";
import "./App.css";

// import logo from './logo.svg';
import Basic from "./basic";

class App extends React.Component {
  public render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.tsx</code> and save to reload.
      //   </p>
      // </div>
      <div className="container-fluid" style={{ padding: 15 }}>
        <Basic />
      </div>
    );
  }
}

export default App;
