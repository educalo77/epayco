import { Route, Switch } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import ConfirmPage from "../pages/ConfirmPage/ConfirmPage";
import BalancePage from "../pages/BalancePage/BalancePage";
import MovimientosPage from "../pages/MovimientosPage/MovimientosPage";

export default function Routes() {
  return<>             
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/confirmpay" component={ConfirmPage}/>
            <Route exact path="/balance" component={BalancePage}/>
            <Route exact path="/movements" component={MovimientosPage}/>
          </Switch>
        </>
}

