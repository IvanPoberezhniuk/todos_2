import React, { Component } from 'react';
import ToDosFooter from './toDos__footer.jsx';
import ToDosList from './toDos__list.jsx';
let randomstring = require('randomstring');

export default class ToDos extends Component {
  state = {
    data: [],
    actualData: [],
    inputValue: ''
  };

  async componentDidMount() {
    let localData = JSON.parse(window.localStorage.getItem('localData')) || [];

    this.setState(prevState => ({
      data: [...prevState.data, ...localData],
      actualData: [...prevState.data, ...localData]
    }));
  }

  addTask = event => {
    event.preventDefault();

    if (/^ *$/.test(this.state.inputValue)) {
      return;
    } else {
      this.setState(prevState => {
        let updateData = [
          ...prevState.actualData,
          {
            task: prevState.inputValue,
            isCompleted: false,
            id: randomstring.generate(5)
          }
        ];

        return {
          data: updateData,
          actualData: updateData,
          inputValue: ''
        };
      });
    }
  };

  removeTask = id => {
    this.setState(prevState => {
      let index = prevState.actualData.findIndex(task => task.id === id);
      prevState.actualData.splice(index, 1);
      return {
        data: [...prevState.actualData]
      };
    });
  };

  filterTasks = filterBy => {
    let chosenFilter = data => {
      switch (filterBy) {
        default:
          return data;
        case 'active':
          return data.filter(task => !task.isCompleted);
        case 'completed':
          return data.filter(task => task.isCompleted);
      }
    };

    this.setState(prevState => ({
      data: chosenFilter(prevState.actualData)
    }));
  };

  toggleIsCompleted = id => {
    this.setState(prevState => {
      let taskIndex = prevState.actualData.findIndex(task => task.id === id);

      prevState.actualData[taskIndex].isCompleted = !prevState.actualData[
        taskIndex
      ].isCompleted;

      return {
        data: prevState.actualData
      };
    });
  };

  clearCompleted = () => {
    this.setState(prevState => {
      prevState.actualData = prevState.actualData.filter(
        task => task.isCompleted !== true
      );
      return {
        data: prevState.actualData
      };
    });
  };

  changeStateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    const { data, actualData } = this.state;

    window.addEventListener('beforeunload', () =>
      window.localStorage.setItem('localData', JSON.stringify(actualData))
    );

    return (
      <div className="toDos__container">
        <h1 className="toDos__header">todos</h1>
        <form className="toDos">
          <input
            type="text"
            placeholder="What need to be done?"
            className="input-base"
            autoComplete="off"
            onChange={this.changeStateInputValue}
          />
          <button type="submit" onClick={this.addTask} hidden />

          {!data.length ? (
            false
          ) : (
            <ToDosList
              data={data}
              toggleIsCompleted={this.toggleIsCompleted}
              removeTask={this.removeTask}
            />
          )}
          <ToDosFooter
            filterTasks={this.filterTasks}
            clearCompleted={this.clearCompleted}
            completedTasks={
              data.filter(task => task.isCompleted !== true).length
            }
          />
        </form>
      </div>
    );
  }
}
