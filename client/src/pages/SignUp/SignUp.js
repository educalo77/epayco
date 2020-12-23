import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
import { SignUpUser } from '../../store/actions/userActions/userActions';
import { useHistory, NavLink } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import "../styles.css";


const useStyles = makeStyles((theme) => ({

  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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

export default function SignUp() {
  const classes = useStyles();
  
  const dispatch = useDispatch()

  const [input, setInput] = useState({})

  const history = useHistory()

  function handleChange(event){
    setInput({...input,[event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    dispatch( await SignUpUser(input.name,input.email, input.phone, input.document) )
    if (input.name && input.email && input.phone && input.document) {
      history.push("/signin");
      toast.success('Se ha registrado con exito');
    } else {
      toast.error('Por favor complete todos los campos');
    }

  }

  return (   
   <div className="login" >
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                id="name"
                onChange={handleChange}
              />
            </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                onChange={handleChange}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="document"
                label="Document"
                name="document"
                autoComplete="document"
                onChange={handleChange}

              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"

            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to={"/signin"} variant="body2">
                Already have an account? Sign in
              </NavLink>
            </Grid>
              </Grid>
        </form>
        </div>
      </Grid>
      </Grid>
    </div>
  );
}
