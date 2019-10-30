import React from "react";
import { Route, Switch } from "react-router-dom";
import Clothing from "./pages/Clothing";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Clothing} />
      <Route exact path="/clothing" component={Clothing} />
    </Switch>
  );
};

export default Routes;
