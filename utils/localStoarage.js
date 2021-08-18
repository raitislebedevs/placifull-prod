export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const setLocalExpiry = (storageValue) => {
  if (!key) {
    return null;
  }

  const item = {
    value: storageValue,
    expiry: now.getTime() + 30000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
