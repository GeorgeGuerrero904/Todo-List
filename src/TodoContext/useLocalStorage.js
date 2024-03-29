import React from "react";

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

  export {useLocalStorage};