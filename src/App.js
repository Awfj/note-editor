import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Notes from "./containers/Notes/Notes";

library.add(fas);

function App() {
  return (
    <div className="App">
      <h1>Notes Editor</h1>
      <Switch>
        {/* <Route path='/notes-editor' exact component={Notes} /> */}
        <Route
          path="/notes-editor"
          exact
          render={props => <Notes {...props} />}
        />
        <Redirect to="/notes-editor" />
      </Switch>
    </div>
  );
}

export default App;
