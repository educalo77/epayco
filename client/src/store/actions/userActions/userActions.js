import Axios from "axios";
import createOne from "../../services/userServices/createOne"
import emailLogin from "../../services/auth/emailLogin"

export async function SignUpUser(name, email, phone, document){
   const data = await createOne(name, email, phone, document)
   return {type:"SIGN_UP", payload:data}
}

export async function SignInUser(email, phone){
   const data = await emailLogin(email, phone)   
   if(data.message?true:false){
      return {type:"SIGN_IN_ERROR"}
   }
   localStorage.setItem("token", data.token)
   return {type:"SIGN_IN", payload:data}
}

export function SignOutUser(){
   localStorage.removeItem("token")
   Axios.defaults.headers.common["Authorization"] = ``
    return {type: "SIGN_OUT"}
}

