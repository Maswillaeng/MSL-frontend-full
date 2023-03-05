import axios from "axios";
import getUserCookie from "../cookie/getUserCookie";

export const getUser = async () => {
  const user = { user_id: getUserCookie("user") };
  axios
    .get("http://localhost:8080/api/user", user, {
      headers: {
        "Content-Type": `application/json`,
      },
      withCredentials: true,
    })
};
