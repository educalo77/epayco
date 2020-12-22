import axios from "axios";

export default async function getBalance() {
  return axios
    .get(`${process.env.REACT_APP_API}/balance/`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}