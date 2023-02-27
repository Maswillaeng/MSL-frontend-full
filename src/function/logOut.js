const logOut = (id) => {
    document.cookie = `user=${id}; path=/; expires=Tue, 19 Jan 2018 03:14:07 GMT`;
  };
  
  export default logOut;