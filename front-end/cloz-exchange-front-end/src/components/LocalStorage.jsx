import React from 'react';

// https://stackoverflow.com/questions/62536758/react-usestate-stuck-after-setting-localstorage-as-initial-state used this code for localstorage
function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);

  React.useEffect(() => {
    const localStorageItem = localStorage.getItem(itemName);
    let parsedItem;

    if (!localStorageItem) {
        localStorage.setItem(itemName, initialValue);
    //   localStorage.setItem(itemName, JSON.stringify(initialValue));
      parsedItem = initialValue;
    } else {
      parsedItem = localStorageItem;
    }
    setItem(parsedItem);
  }, []);

  const saveItem = (newItem) => {
    // const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, newItem);
    setItem(newItem);
  };

  return {
    item,
    saveItem,
  };
}

export { useLocalStorage };
