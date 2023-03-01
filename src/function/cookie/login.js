const login = (id) => {
  document.cookie = `user=${id}; path=/; expires=Tue, 19 Jan 2028 03:14:07 GMT`;
};

export default login