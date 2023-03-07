import axios from "axios";
import getUserCookie from "../cookie/getUserCookie";

export const postLogOut = async () => {
  axios.post(
    "http://localhost:8080/api/logout",
    { user_id: getUserCookie("user") },
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};