import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Notes from "../../components/Notes/Notes";
import NoteDetails from "../NoteDetails/NoteDetails";

library.add(fas);

class App extends Component {
  render() {
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
          <Route
            path="/notes-editor/:noteId"
            render={props => <NoteDetails {...props} />}
          />
          <Redirect to="/notes-editor" />
        </Switch>
      </div>
    );
  }
}

export default App;
