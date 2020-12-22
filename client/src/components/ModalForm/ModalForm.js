import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import {closeModal, setTransaction, getTransactions} from "../../store/actions/transactionActions/transactionActions"
import { TextField, Button } from '@material-ui/core';
import { getBalanceUser } from '../../store/actions/balanceActions/balanceActions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border:"none"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    outline:"none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function validation(values){
  
  const errors = {};
    if (!values.amount) {
      errors.amount = "Required";
    } 
    if (!values.amountConfirmation) {
      errors.amountConfirmation = "Required";
    }
    if(values.amount !== values.amountConfirmation){
      errors.match = "Not match";
    }
    return errors;
}

export default function TransitionsModal() {
  const classes = useStyles();
  const openModal = useSelector((state)=>state.transactionReducer.openModal)
  const balance = useSelector((state)=>state.balanceReducer.balance)
  const [openSecond,setOpenSecond] = useState(false)
  const [input,setInput] = useState({})
  const [error, seterror] = useState({error:"error"})

  const dispatch = useDispatch()

  function handleClose(){
    seterror({error:"error"})
    dispatch(closeModal())
  }

  function handleChange(event){
    seterror(validation({...input,[event.target.name]:event.target.value}))
    setInput({...input,[event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
     if(openModal === "payment"){
      if(balance.available < input.amountConfirmation){ 
        setOpenSecond(true)
        return seterror({error:true})} 
     }
     dispatch( await setTransaction (openModal,parseInt(input.amount)) )
     dispatch( await getTransactions())
     setOpenSecond(true)
  }

  function handleCloseSecond(){
    setOpenSecond(false)
    dispatch( closeModal())
  }
  return (    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal?true:false}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal?true:false}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{openModal?openModal.toUpperCase():""}</h2>
            <form  className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="amount"
                    label="Amount"
                    name="amount"
                    autoFocus
                    onChange={handleChange}
                    type="number"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="amountConfirmation"
                    label="Amount Confirmation"
                    id="amountConfirmation"
                    onChange={handleChange}
                    type="number"
                />
                <Button
                    disabled={Object.keys(error).length===0?false:true}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Acept
                </Button>
            </form>
          </div>
        </Fade>
        
      </Modal>
      <Modal
      open={openSecond}
      onClose={handleCloseSecond}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
    {<div className={classes.paper}>
      <h2 id="simple-modal-title">{
      openModal==="recharge"?
      "Recarga exitosa!"
      :openModal==="payment"&&Object.keys(error).length===0?
      "Enviamos un mail a tu correo!"
      :"Sin saldo"        
      }</h2>
      <p id="simple-modal-description">
        {
        openModal==="recharge"?
        "Ahora puedes disfrutar de tu nuevo balance."
        :openModal==="payment"&&Object.keys(error).length===0?
        "Ingresa a tu correo y continua con la confirmacion del pago."
        :"Recarga dinero para seguir comprando!" 
      }
      </p>
    </div>}
    </Modal>
    </>
  );
}