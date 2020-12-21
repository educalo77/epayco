import React, {Fragment, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import { useDispatch } from "react-redux";
import { getUser } from "../components/redux/useraction";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Links from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css"
import { grey } from '@material-ui/core/colors';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://epayco.co/">
        e-PayCo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
      theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[900],
  },
}));

const Login = ({ setAuth }) => {
    
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { email, password };
            
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
                        
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Login successfully!")
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }

    const responseGoogle = (res) => {
        const data = { 
            name: res.profileObj.name,
            imageUrl: res.profileObj.imageUrl,
            email: res.profileObj.email
        }
        dispatch(getUser(data));
        if (res.profileObj) {
            setAuth(true);
            toast.success("Login successfully!");
         }
        else {
            toast.error("Login Error");
        }
    };
      const classes = useStyles();

    return ( 
    <div className="login" >
            {/* <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="form-control my-3"
                    value={email}
                    onChange={e => onChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="form-control my-3"
                    value={password}
                    onChange={e => onChange(e)}
                />
            <button className="botsubmit">Submit</button>
            </form>
            <div className="googlelogin">
            <button className="botreg">
            <Link to="/register" className="linkreg" style={{ textDecoration: 'none' }}>Register</Link>
            </button>
            <GoogleLogin
            clientId="274236062060-1vk0mne3n6li5bgj5lu4sruoa2agrp2l.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="googlebot"
            />
            </div> */}

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
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
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
              value={email}
              onChange={e => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => onChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
                            />
            <GoogleLogin
            clientId="274236062060-1vk0mne3n6li5bgj5lu4sruoa2agrp2l.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="googlebot"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Links href="#" variant="body2">
                  Forgot password?
                </Links>
               </Grid>
            
              <Grid item>
                <Links href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Links>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      </Grid>
    </div>
    );
};

export default Login;