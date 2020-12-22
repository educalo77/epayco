import {BrowserRouter} from "react-router-dom";
import './App.css';
import Routes from './routes/Routes';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store/store";
require("dotenv").config();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ef9128',
      main: '#5c5c5b',
      dark: '#5c5c5b',
      contrastText: '#ef9128',
    },
    secondary: {
      main: '#ef9128',
    },
  },
});
function App() {
  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  )
}

export default App;
