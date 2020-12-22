import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title/Title';
import { useSelector, useDispatch } from 'react-redux';
import { getBalanceUser } from '../../store/actions/balanceActions/balanceActions';


// function preventDefault(event) {

//   event.preventDefault();

// }

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    marginTop: '15px'
  },
  card: {
    backgroundColor: 'grey'
  }

}));

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

  const date = [new Date().toLocaleString()];


  return (
  
    <React.Fragment className={classes.card} >
      <Title>Saldo Disponible</Title>
      <Typography component="p" variant="h4" className={classes.depositContext}>
        ${balance?.available}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {date.map((d) => {
        return d
      } )}
      </Typography>
      <div>
        <Link color="primary" href="/movements">
          Ver historial
        </Link>
      </div>
    </React.Fragment>
  );
}