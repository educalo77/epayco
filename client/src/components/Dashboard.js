import React, { Fragment, useState, useEffect } from 'react'; 
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import "./styles.css"
import { grey } from '@material-ui/core/colors';
import Sidebar from './Sidebar';

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
    flexGrow: 1,
    backgroundColor: grey
},
menuButton: {
    marginRight: theme.spacing(2),
},
title: {
    flexGrow: 1,
},
}));



const Dashboard = () => {

  //  { setAuth }

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
  };

    const [name, setName] = useState(sessionStorage.getItem('name') || "");

    const userList = useSelector((state) => state.userList);
    const { users } = userList;



    async function getName() {
        if(localStorage.token){
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();

            setName(parseRes.user_name)

        } catch (err) {
            console.error(err.message);
        }
        }
        if (users) {
            setName(users.name);
        }
        
    }

    useEffect(() => {
        getName();
    },[]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        sessionStorage.removeItem("name")
        setAuth(false);
        toast.success("Logged out successfully!");
        window.location = "/"
    }

  const onClick = (e) => {
    return (
      <Sidebar />
    )
    }
  
    return (
         <div className={classes.root} >
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static" >
        <Toolbar className="appbar">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={(e) => onClick} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img height="16px" src="https://epayco.co/img/logo_fondo_epayco_davi.png" alt=""  />
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                  {users.imageUrl ? (<img src={users.imageUrl} alt={users.imageUrl} className="imageProfile" />
                  ) : (<AccountCircle />)
                  }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
            </AppBar>
        <Box pt={4}>
        <Copyright />
        </Box>
    </div>
    //     <Fragment >
    //         <div className="all">
    //         <div className="h1img">
    //         <h1 className="text">Welcome {name}  !</h1>
    //         <img src={users.imageUrl} alt={users.imageUrl} className="imageProfile" />
    //         </div>
    //         <div className="botlogout">
    //         <button className="botreg" onClick={e => logout(e)}>Logout</button>
    //         </div>
    //         </div>
    //       <Box pt={4}>
    //         <Copyright />
    //       </Box>
    // </Fragment>
    );
};


export default Dashboard;