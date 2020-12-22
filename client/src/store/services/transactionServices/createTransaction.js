import axios from "axios";

export default async function createTransaction(type,amount) { 
  return axios
    .post(`${process.env.REACT_APP_API}/transactions/${type}`, { amount })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}