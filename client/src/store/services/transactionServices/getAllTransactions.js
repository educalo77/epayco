import axios from "axios";

export default async function getAllTransactions() {
  return axios
    .get(`${process.env.REACT_APP_API}/transactions/`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}