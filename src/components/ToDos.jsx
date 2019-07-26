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

  componentDidMount() {
    let localData = JSON.parse(window.localStorage.getItem('localData')) || [];

    this.setState(prevState => ({
      data: [...prevState.data, ...localData],
      actualData: [...prevState.data, ...localData]
    }));

    this.saveDataToLocalStorage();
  }

  componentWillUnmount() {
    this.saveDataToLocalStorage();
  }

  saveDataToLocalStorage = () => {
    window.addEventListener('beforeunload', () =>
      window.localStorage.setItem(
        'localData',
        JSON.stringify(this.state.actualData)
      )
    );
  };

  addTask = event => {
    event.preventDefault();

    if (/^ *$/.test(this.state.inputValue)) {
      return;
    } else {
      this.setState(prevState => {
        const newData = [
          ...prevState.actualData,
          {
            task: prevState.inputValue,
            isCompleted: false,
            id: randomstring.generate(5)
          }
        ];

        return {
          data: newData,
          actualData: newData,
          inputValue: ''
        };
      });
    }
  };

  removeTask = id => {
    this.setState(prevState => {
      const newData = [...prevState.actualData.filter(task => task.id !== id)];

      return {
        data: newData,
        actualData: newData
      };
    });
  };

  filterTasks = filterBy => {
    const chosenFilter = data => {
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
      const taskIndex = prevState.actualData.findIndex(task => task.id === id);
      const newData = [...prevState.actualData];

      newData[taskIndex].isCompleted = !newData[taskIndex].isCompleted;

      return {
        data: newData,
        actualData: newData
      };
    });
  };

  clearCompleted = () => {
    this.setState(prevState => {
      const newData = prevState.actualData.filter(task => !task.isCompleted);

      return {
        data: newData,
        actualData: newData
      };
    });
  };

  changeStateInputValue = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  render() {
    const { data } = this.state;

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
