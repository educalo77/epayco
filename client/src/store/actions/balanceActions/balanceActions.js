import getBalance from "../../services/balanceServices/getBalance";

export async function getBalanceUser(){
    const data = await getBalance()
    return {type:"GET_BALANCE" , payload:data}
}