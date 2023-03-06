import axios from "axios";

export const getBoard = async () => {
  return await axios.get("http://localhost:8080/api/post/page");
};
