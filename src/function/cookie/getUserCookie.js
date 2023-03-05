const getUserCookie = (id) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default getUserCookie;
