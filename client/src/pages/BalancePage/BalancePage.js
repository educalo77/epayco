import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PaymentIcon from '@material-ui/icons/Payment';
import Deposits from '../../components/Deposits/Deposits';
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { getTransactions, openModal } from '../../store/actions/transactionActions/transactionActions';
import { getBalanceUser } from '../../store/actions/balanceActions/balanceActions';
import Axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoneyIcon from '@material-ui/icons/Money';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ModalForm from "../../components/ModalForm/ModalForm"
import { Menu, MenuItem } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: {

    marginTop: '-30%'
  }, 
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginTop: '5%'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  titles:{
    padding:"10px"
  },
  content: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
  },
  copy: {
    marginTop: '22%'
  }
}));

export default function BalancePage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user)
  

  useEffect(()=>{
    localStorage.token===undefined?
    history.push("/signin")
    :
    (async function(){
        Axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`
        dispatch( await getTransactions())
        dispatch( await getBalanceUser())
    })() 
  },[])  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleOpenModal = (action) =>{    
    dispatch( openModal(action) )
  }
  const handleLogOut =() =>{
    handleClose()
    localStorage.removeItem("token")
    history.push("signin")
  }

  return (  
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <img className="imagelogo" src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn7.png " alt="" />
          </Typography>
          {user && user.name ? (<h2>Bienvenido {user.name.charAt(0).toUpperCase() + user.name.slice(1)}! </h2>) : ('')}
          <IconButton onClick={handleClick} color="inherit">
              <AccountCircleIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Divider/>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
           <ListItem button onClick={()=> (history.push("/"))} >
            <ListItemIcon  >
              <HomeIcon label />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={()=> (history.push("balance"))}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Saldo" />
          </ListItem>
          <ListItem button onClick={()=> (history.push("movements"))} >
            <ListItemIcon  >
              <HistoryIcon label />
            </ListItemIcon>
            <ListItemText primary="Historial" />
          </ListItem>
          <ListItem button onClick={()=>handleOpenModal("payment")} >
            <ListItemIcon  >
              <PaymentIcon label />
            </ListItemIcon>
            <ListItemText primary="Pagar" />
          </ListItem>
          <ListItem button onClick={()=>handleOpenModal("recharge")}>
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Recargar" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <img className="imagelogocentral" src=" https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/logos/logo_epayco_400px.png" alt="" />
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <ModalForm/>
      </main>
    </div>
  );
}
