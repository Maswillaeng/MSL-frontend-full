import axios from "axios";

export const deleteFollow = async (userId, data) => {
  return await axios.delete(
    `http://localhost:8080/api/${userId}/follow`,
    data,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
