import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import All from "./All";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/slide/:id">
          <All/>
        </Route>
        <Route path="/slide">
          <All/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
