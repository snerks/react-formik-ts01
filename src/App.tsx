import * as React from "react";
import "./App.css";

// import logo from './logo.svg';
// import Basic from "./basic";
// import { BasicSfc } from "./basic-sfc";
// import { FriendList } from "./friend-list";
import { ShowForm } from "./show-form";

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
        {/* <BasicSfc /> */}
        {/* <FriendList /> */}
        <ShowForm />
      </div>
    );
  }
}

export default App;
