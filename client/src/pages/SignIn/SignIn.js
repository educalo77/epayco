import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";  
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { SignInUser } from '../../store/actions/userActions/userActions';
import { useHistory, NavLink } from "react-router-dom";
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

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const [input, setInput] = useState({})

  useEffect(()=>{
      if(localStorage.token) history.push("/")
      
  })

  function handleChange(event){
    setInput({...input,[event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault()
    dispatch( await SignInUser(input.email, input.phone) )
    setInput({})

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
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={input.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              autoComplete="current-phone"
              value={input.phone}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
            <Grid item>
              <NavLink to={"/signup"} onClick={()=>history.push("/signup")} variant="body2">
                {"Don't have an account? Register"}
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
