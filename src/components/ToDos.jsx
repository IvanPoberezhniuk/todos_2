import React, { Component } from "react";

let toDoData = [
  { task: "Learn 1", isComplete: false },
  { task: "Learn 2", isComplete: true },
  { task: "Learn 3", isComplete: true },
  { task: "Learn 4", isComplete: false }
];

export default class ToDos extends Component {
  state = {
    data: toDoData
  };

  addTask = event => {
    if (event.key === "Enter") {
      let newTaskName = event.target.value;
      toDoData = [...toDoData, { task: newTaskName, isComplete: false }];

      this.setState({
        data: toDoData
      });
    }
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

  editTask = event => {
    let dataValue = event.target.getAttribute("data-task");
    let value = event.target.value;
    let newData = toDoData.map(task =>
      task.task === dataValue ? (task.task = value) : task
    );

    this.setState({
      data: newData
    });
  };

  render() {
    return (
      <div action="" className="toDos" autoComplete="off">
        <input
          type="text"
          name="toDos"
          placeholder="What need to be done?"
          className="input-base"
          onKeyPress={this.addTask}
          autocomplete="off"
        />
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
                {/* <input
                  onChange={event => this.editTask(event)}
                  type="text"
                  data-task={task.task}
                  className="toDos--task"
                  defaultValue={task.task}
                /> */}
                <span data-task={task.task} className="toDos--task">
                  {task.task}
                </span>
              </div>
              <button
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
          <div>{this.state.data.length} items left</div>
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
      </div>
    );
  }
}
