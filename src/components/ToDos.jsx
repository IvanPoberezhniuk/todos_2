import React, { Component } from "react";
import ToDosFooter from "./toDos--footer.jsx";
import ToDosList from "./toDos--list.jsx";
let randomstring = require("randomstring");

let localData = [];

export default class ToDos extends Component {
  state = {
    data: [],
    inputValue: ""
  };

  async componentDidMount() {
    setTimeout(() => {
      localData = JSON.parse(window.localStorage.getItem("localData")) || [];

      this.setState(prevState => ({
        data: [...prevState.data, ...localData]
      }));
    }, 1111);
  }

  addTask = event => {
    event.preventDefault();

    if (/^ *$/.test(this.state.inputValue)) {
      return;
    } else {
      localData = [
        ...localData,
        {
          task: this.state.inputValue,
          isCompleted: false,
          id: randomstring.generate(5)
        }
      ];

      this.setState({
        data: localData,
        inputValue: ""
      });
    }
  };

  removeTask = id => {
    let index = localData.findIndex(task => task.id === id);
    localData.splice(index, 1);

    this.setState({
      data: localData
    });
  };

  filterTasks = filterBy => {
    let chosenFilter = data => {
      switch (filterBy) {
        default:
          return data;
        case "active":
          return data.filter(task => !task.isCompleted);
        case "completed":
          return data.filter(task => task.isCompleted);
      }
    };

    this.setState({
      data: chosenFilter(localData)
    });
  };

  toggleIsCompleted = id => {
    this.setState(prevState => {
      let taskIndex = localData.findIndex(task => task.id === id);

      localData[taskIndex].isCompleted = !localData[taskIndex].isCompleted;

      return {
        data: localData
      };
    });
  };

  clearCompleted = () => {
    localData = localData.filter(task => task.isCompleted !== true);

    this.setState({
      data: localData
    });
  };

  changeStateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    window.addEventListener("beforeunload", () =>
      window.localStorage.setItem("localData", JSON.stringify(localData))
    );

    return (
      <form className="toDos">
        <input
          type="text"
          placeholder="What need to be done?"
          className="input-base"
          autoComplete="off"
          value={this.state.inputValue}
          onChange={event => this.changeStateInputValue(event)}
        />
        <button type="submit" onClick={event => this.addTask(event)} hidden />

        {!this.state.data.length ? (
          false
        ) : (
          <>
            <ToDosList
              data={this.state.data}
              toggleIsCompleted={this.toggleIsCompleted}
              removeTask={this.removeTask}
            />
            <ToDosFooter
              filterTasks={this.filterTasks}
              clearCompleted={this.clearCompleted}
              completedTasks={
                this.state.data.filter(task => task.isCompleted === true).length
              }
            />
          </>
        )}
      </form>
    );
  }
}
