//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { AppUI } from './Components/AppUI';
import './css/Main.css';

// const DefaultTodos = [
//   { text: 'tets 1', completed: true, step: 1 },
//   { text: 'tets 2', completed: false, step: 2 },
//   { text: 'tets 3', completed: false, step: 3 }
// ];

function useLocalStorage(itemName, initialValue) {
  const [loading, setLoading] = React.useState(true)
  const [item, setItem] = React.useState(initialValue);
  React.useEffect(() => {
    setTimeout(() => {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;
      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = [];

      } else {
        parsedItem = JSON.parse(localStorageItem);
      }

      setItem(parsedItem);
      setLoading(false);
    }, 1000);
  });


  const saveItem = function (newItem) {
    const ItemStr = JSON.stringify(newItem);
    localStorage.setItem(itemName, ItemStr);
    setItem(newItem);
  }

  return {
    item ,
    saveItem,
    loading,
  }
}

function App(props) {
  const  {
    item : todos,
    saveItem: saveTodos,
    loading,
  } = useLocalStorage("todosList", []);

  const [searchValue, setSearchValue] = React.useState('');
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;


  let searchedTodos = [];

  if (!searchValue.length > 0) {
    searchedTodos = todos;
  } else {
    const currentSearch = searchValue.toLowerCase();
    searchedTodos = todos.filter(Element => {
      return Element.text.toLowerCase().includes(currentSearch);
    })
  }



  const changeTodoStatus = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    console.log("setting value to ", newTodos[todoIndex].completed === true ? false : true)
    newTodos[todoIndex].completed = newTodos[todoIndex].completed === true ? false : true;
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    console.log("removing element", todoIndex)
    saveTodos(newTodos);
  }

  // React.useEffect(()=>{
  //   console.log("use effect triggered")
  // }, [totalTodos]);


  return (
    <AppUI
      loading={loading}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      changeTodoStatus={changeTodoStatus}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;

