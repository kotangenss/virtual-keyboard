function setLocalStorage(value, key = 'lang') {
  localStorage.setItem(key, value);
}

function getLocalStorage(key = 'lang') {
  return localStorage.getItem(key);
}

export { setLocalStorage, getLocalStorage };
