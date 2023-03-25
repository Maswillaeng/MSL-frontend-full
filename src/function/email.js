import axios from "axios";

export const email = async () => {
  return await axios.get("http://localhost:8080/api/email-duplicate").then((res)=>{
    console.log(res)
  });
};
