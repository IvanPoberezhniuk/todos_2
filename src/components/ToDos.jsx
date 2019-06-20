import React, { Component } from "react";

let toDoData = [
  { task: "Learn JS", isComplete: false },
  { task: "Learn HTML", isComplete: true },
  { task: "Learn React", isComplete: true }
];

// let toDoData = window.localStorage.getItem("data")
//   ? window.localStorage.getItem("data")
//   : [{ task: "Learn React", isComplete: true }];

export default class ToDos extends Component {
  state = {
    data: toDoData,
    inputValue: ""
  };

  addTask = event => {
    event.preventDefault();

    this.setState(prevState => ({
      data: [
        ...prevState.data,
        { task: this.state.inputValue, isComplete: false }
      ]
    }));
  };

  removeTask = event => {
    event.preventDefault();

    let dataTask = event.target.getAttribute("data-task");
    let index = toDoData.findIndex(task => task.task === dataTask);

    toDoData.splice(index, 1);

    this.setState({
      data: toDoData
    });
  };

  com;

  filterTasks = (isComplete = null) => {
    let newData;

    isComplete === null
      ? (newData = toDoData)
      : (newData = toDoData.filter(task => task.isComplete !== isComplete));

    this.setState({
      data: newData
    });
  };

  toggleIsComplete = event => {
    let dataValue = event.target.getAttribute("data-task");
    let index = toDoData.findIndex(task => task.task === dataValue);

    toDoData[index].isComplete = !toDoData[index].isComplete;

    this.setState({
      data: toDoData
    });
  };

  clearCompleted = () => {
    toDoData = toDoData.filter(task => task.isComplete !== true);

    this.setState({
      data: toDoData
    });
  };

  changeStateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    return (
      <form className="toDos">
        <input
          type="text"
          placeholder="What need to be done?"
          className="input-base"
          autoComplete="off"
          onInput={event => this.changeStateInputValue(event)}
        />
        <button type="submit" onClick={event => this.addTask(event)} hidden />
        {this.state.data.map((task, index) => {
          return (
            <div className="toDos--dropDownTask" key={task.task + index}>
              <div>
                <input
                  onClick={event => this.toggleIsComplete(event)}
                  type="checkbox"
                  data-task={task.task}
                  className="toDos--toggle"
                  defaultChecked={task.isComplete}
                />
                <span data-task={task.task} className="toDos--task">
                  {task.task}
                </span>
              </div>
              <button
                type="button"
                className="toDos--button-delete"
                onClick={event => this.removeTask(event)}
                data-task={task.task}
              >
                x
              </button>
            </div>
          );
        })}
        <div className="toDos--footer">
          <div>
            {this.state.data.filter(task => task.isComplete === true).length}{" "}
            items left
          </div>
          <div className="toDos--filter">
            <div onClick={() => this.filterTasks()}>All</div>
            <div onClick={() => this.filterTasks(true)}>Active</div>
            <div onClick={() => this.filterTasks(false)}>Completed</div>
          </div>
          <div
            onClick={() => this.clearCompleted()}
            className="toDos--clearCompleted"
          >
            Clear Completed
          </div>
        </div>
      </form>
    );
  }
}

// window.onbeforeunload = () => {
//   window.localStorage.setItem("data", toDoData);
// };
