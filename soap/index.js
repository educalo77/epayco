const express = require("express");
const soap = require('soap');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const { createOne, getOne, getOneByEmail } = require("./src/controllers/userControllers");
const { recharge, payment, getAllByUserId } = require("./src/controllers/transactionControllers");

const { conn } = require("./src/db.js");
const passports = require("./src/passport/passport")

const {confirmPay} = require("./src/mailmodel/confirmPay");
const { getOneByUserId } = require("./src/controllers/balanceControllers");
const passport = require("passport");

require("./src/db");

const secret = process.env.EMAIL_SECRET || 'secret';


var service = {
    epayco: {
        billetera: {
            createUser : async function({name,email,phone,document}) {
              let user = await createOne(name,email,phone,document)
              return { createuserres : user }
            },

            transactionsGet: async function({userId}){
              let transactions = await getAllByUserId({userId:parseInt(userId)}) 
              let aux = transactions.map((e)=>{ 
                e.dataValues.createdAt = e.dataValues.createdAt.toDateString()
                return e.dataValues
              })
            
              return {transactionsres: aux}
            },
            rechargeAction: async function({userId,amount}) {
              userId=parseInt(userId)
              amount=parseInt(amount)
              let action = await recharge({userId,amount})
              
              return { rechargeactionres : action};
            },

            paymentAction: async function({userId,amount}) {
              let user = await getOne(userId)               
              let email = await confirmPay({user,amount})               
              return { paymentactionres: "operacion realizada"}
            },

            paymentConfirm: async function({userId,amount}){

              let data = await jwt.verify(amount.token, secret, (error, data) => {
                if (error) return {paymentconfirmres:"TOKEN NO VALIDO"}
                else  return data})
                
                let user = await getOne(data.id)
                if(!user.compare(amount.phone.toString())) return {paymentconfirmres:"TELEFONO NO VALIDO"}
                let succesfull = await payment (data.id, data.amount)                
              return {paymentconfirmres:succesfull}
            },

            balanceGet: async function({userId}){
              userId=parseInt(userId)
              let balances = await getOneByUserId({userId})    
              return {balancegetres: balances.dataValues}
            },
            emailLogin: async ({email,phone})=>{
                /* let aux="algo"
                let res = {send:function(e){
                aux.push(e) 
                console.log("send",aux)}}
                await passport.authenticate("local",function(err,user,info){
                console.log(err);
                console.log(user);
                console.log(info);
                res.send("algo")
                })({body:{email,phone}},res)              
                console.log("es",aux); */
                let user = await getOneByEmail({email:email})  
                return {emailLogin: user}
            }
        }
    }
};
  
const xml = require('fs').readFileSync('./wscalc1.wsdl', 'utf8')
const app = express()
app.use(passports.initialize());

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
conn.sync({ force: false }).then(() => {
  app.listen(8001, function(){
      soap.listen(app, '/wscalc1', service, xml, function(){
          console.log('server initialized');
        });
  });
});

