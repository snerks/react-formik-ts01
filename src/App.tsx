import * as React from "react";
import "./App.css";

// import logo from './logo.svg';
// import Basic from "./basic";
// import { BasicSfc } from "./basic-sfc";
// import { FriendList } from "./friend-list";
import { ShowForm, ShowPartial } from "./show-form";
// import { ShowObjectForm } from "./show-object-form";
// import UserSearchForm from "./user-search-form";

class App extends React.Component {
  public render() {
    const show: ShowPartial = {
      eventIdBts: "18487",
      // "isNew": false,
      addedDate: new Date("2018-09-22"),
      isSoldOut: true,
      isCancelled: false,
      priceText: "SOLD OUT",
      date: new Date("2018-10-16"),
      venue: "SWX",
      artists: [{ name: "Idles" }, { name: "Heavy Lungs" }],
      detailsUri:
        "https://www.bristolticketshop.co.uk/eventdetails.aspx?e=18487",
      id: "c944ecb2-d870-4599-b6b9-5dee8a4ac03d"
    };

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
        <ShowForm {...show} />
        {/* <ShowObjectForm /> */}
        {/* <UserSearchForm /> */}
      </div>
    );
  }
}

export default App;
