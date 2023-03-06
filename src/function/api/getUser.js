import axios from "axios";
import getUserCookie from "../cookie/getUserCookie";

export const getUser = async () => {
  const user = { user_id: getUserCookie("user") };
  return await axios.get("http://localhost:8080/api/user", user);
};
