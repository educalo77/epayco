import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title/Title';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions } from '../../store/actions/transactionActions/transactionActions';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const allTransactions = useSelector((store)=> store.transactionReducer.allTransactions)
  const {openModal} = useSelector ((store)=> store.transactionReducer)
  useEffect(()=>{
    (async function(){
      dispatch( await getTransactions())
    })()
  },[openModal])

  return ( 
    <React.Fragment>
      <Title>Last movements</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allTransactions?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.createdAt.slice(0,10)}</TableCell>
              <TableCell>{row.createdAt.slice(11,19)}</TableCell>
              <TableCell>{row.action}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" >
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}