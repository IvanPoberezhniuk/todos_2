import React, { Component } from 'react';
import ToDosFooter from './toDos__footer.jsx';
import ToDosList from './toDos__list.jsx';
const randomstring = require('randomstring');

export default class ToDos extends Component {
  state = {
    visibleData: [],
    actualData: [],
    inputValue: ''
  };

  componentDidMount() {
    const localData =
      JSON.parse(window.localStorage.getItem('localData')) || [];

    this.setState({
      visibleData: [...localData],
      actualData: [...localData]
    });

    this.saveDataToLocalStorage();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveDataToLocalStorage);
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
    const isEmpty = value => /^ *$/.test(value);

    if (isEmpty(this.state.inputValue)) {
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
          visibleData: newData,
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
        visibleData: newData,
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
      visibleData: chosenFilter(prevState.actualData)
    }));
  };

  toggleIsCompleted = id => {
    this.setState(prevState => {
      const newData = [...prevState.actualData];
      const taskIndex = newData.findIndex(task => task.id === id);

      newData[taskIndex].isCompleted = !newData[taskIndex].isCompleted;

      return {
        visibleData: newData,
        actualData: newData
      };
    });
  };

  clearCompleted = () => {
    this.setState(prevState => {
      const newData = prevState.actualData.filter(task => !task.isCompleted);

      return {
        visibleData: newData,
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
    const { visibleData } = this.state;

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
            value={this.state.inputValue}
          />
          <button type="submit" onClick={this.addTask} hidden />

          {!visibleData.length ? (
            false
          ) : (
            <ToDosList
              data={visibleData}
              toggleIsCompleted={this.toggleIsCompleted}
              removeTask={this.removeTask}
            />
          )}
          <ToDosFooter
            filterTasks={this.filterTasks}
            clearCompleted={this.clearCompleted}
            completedTasks={
              visibleData.filter(task => task.isCompleted !== true).length
            }
          />
        </form>
      </div>
    );
  }
}
