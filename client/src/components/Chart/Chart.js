import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title/Title';
import { useSelector } from 'react-redux';

export default function Chart() {
  const theme = useTheme();
  const {allTransactions} = useSelector ((store)=> store.transactionReducer)
  const [chartData, setChartData] = useState([])
  useEffect(()=>{
    let auxBalance=0
    let nuevo = allTransactions?.map((row)=>{  
      
     if(row.action === "recharge"){ 
       let recharge =auxBalance+ row.amount
       auxBalance= recharge
       return {date: row.createdAt.slice(0,10) , amount: recharge} 
      }
     if(row.action === "payment"){
       let payment = auxBalance- row.amount
       auxBalance = payment
        return { date: row.createdAt.slice(0,10) ,amount: payment} 
      }
   })
   setChartData(nuevo)
  },[allTransactions])

  return (  
    <React.Fragment>
      <Title>Linea de Tiempo</Title>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Saldo ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
