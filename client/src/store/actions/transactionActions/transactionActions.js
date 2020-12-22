import createTransaction from "../../services/transactionServices/createTransaction";
import getAllTransactions from "../../services/transactionServices/getAllTransactions";


export async function setTransaction(type,amount){
   const data= await createTransaction(type,amount)
   return { type:"SET_TRANSACTION", payload:data}
}

export async function getTransactions(){
    const data = await getAllTransactions()
    return { type:"GET_ALL_TRANSACTIONS", payload:data}
}

export function openModal(action){
    return { type:"OPEN_MODAL", payload:action}
}

export function closeModal(){
    return { type:"CLOSE_MODAL"}
}

