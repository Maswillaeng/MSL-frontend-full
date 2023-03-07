import axios from "axios";

/**
 * 유저 팔로우 -1
 */
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
