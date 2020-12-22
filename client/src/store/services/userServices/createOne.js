import axios from "axios";

export default async function create(name, email, phone, document) {
  return axios
    .post(`${process.env.REACT_APP_API}/users`, { name, email, phone, document })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}