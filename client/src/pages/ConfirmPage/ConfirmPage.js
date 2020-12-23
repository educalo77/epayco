import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useDispatch,useSelector} from "react-redux"
import { SignInUser } from '../../store/actions/userActions/userActions';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useHistory, useLocation } from "react-router-dom";
import { setTransaction } from '../../store/actions/transactionActions/transactionActions';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[900],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[500] : theme.palette.grey[700],
  },
}));

export default function ConfirmPage() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const [input, setInput] = useState({})
  const location = useLocation () 
  let token = location.search.slice(location.search.indexOf("=")+1)
  useEffect(()=>{
    localStorage.token===undefined?
    history.push("/signin")
    :
    (async function(){
        Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`
    })() 
  },[])  

  function handleChange(event){
    setInput({...input,[event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    dispatch( await setTransaction ("confirmpayment",{phone:parseInt(input.phone), token}))
    history.push("/")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MonetizationOnIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Confirm Pay
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            id="phone"
            autoComplete="phone"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Confirma el Pago
          </Button>
        </form>
      </div>

    </Container>
  );
}
