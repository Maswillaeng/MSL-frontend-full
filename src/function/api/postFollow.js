import axios from "axios";

/**
 * 유저 팔로우 +1
 */
export const postFollow = async (userId, data) => {
  return await axios.post(`http://localhost:8080/api/${userId}/follow`, data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
