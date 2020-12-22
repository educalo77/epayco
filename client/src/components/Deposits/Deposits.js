import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import { useSelector, useDispatch } from 'react-redux';
import { getBalanceUser } from '../../store/actions/balanceActions/balanceActions';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const dispatch= useDispatch()
  const {balance} = useSelector ((store)=> store.balanceReducer)
  const {openModal} = useSelector ((store)=> store.transactionReducer)
  useEffect(()=>{
    (async function(){
      dispatch( await getBalanceUser())
    })()
  },[openModal])
  return (
  
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        ${balance?.available}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}