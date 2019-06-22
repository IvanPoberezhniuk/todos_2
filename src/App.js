import React, { Component } from "react";
import ToDos from "./components/ToDos";
import "./App.css";

// let toDoData = (window.localStorage.toDoData = []);

class App extends Component {
  render() {
    return (
      <>
        <ToDos />
      </>
    );
  }
}

export default App;
