import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import All from "./All";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/ppt/:id">
          <All/>
        </Route>
        <Route path="/ppt">
          <All/>
        </Route>
        <Redirect to="/ppt" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
