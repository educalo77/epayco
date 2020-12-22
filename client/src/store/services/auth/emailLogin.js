import axios from "axios";

export default async function emailLogin(email, phone) {
  return axios
    .post(`${process.env.REACT_APP_API}/auth/login/email`, { email, phone })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}