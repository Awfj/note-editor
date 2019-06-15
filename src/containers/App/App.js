import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import notesJSON from "../../assets/notes.json";
import Notes from "../Notes/Notes";
import NoteDetails from "../NoteDetails/NoteDetails";

library.add(fas);
const uuidv4 = require("uuid/v4");

class App extends Component {
  state = {
    notes: notesJSON.notes,
    noteMessage: "",
    noteTags: []
  };

  addNoteHandler = event => {
    event.preventDefault();

    const notes = this.state.notes;
    const noteTags = this.state.noteTags;
    const noteMessage = this.state.noteMessage;
    if (!noteMessage) {
      return;
    }

    const updatedNotes = [].concat(
      { id: uuidv4(), message: noteMessage, tags: noteTags },
      notes
    );

    this.setState({
      notes: updatedNotes,
      noteMessage: ""
    });
  };

  changeHandler = event => {
    const value = event.target.value;
    const noteTags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    this.setState({ noteTags, noteMessage: value });
  };

  removeNoteHandler = noteIndex => {
    const notes = this.state.notes;
    const updatedNotes = notes.filter((_, index) => noteIndex !== index);

    this.setState({ notes: updatedNotes });
  };

  render() {
    // console.log(this.state.notes)
    return (
      <div className="App">
        <Link to="/note-editor">Note Editor</Link>
        
        <Switch>
          {/* <Route path='/notes-editor' exact component={Notes} /> */}
          <Route
            path="/note-editor"
            exact
            render={() => (
              <Notes
                notes={this.state.notes}
                noteTags={this.state.noteTags}
                noteMessage={this.state.noteMessage}
                addNoteHandler={this.addNoteHandler}
                changeHandler={this.changeHandler}
                removeNoteHandler={this.removeNoteHandler}
              />
            )}
          />
          <Route
            path="/note-editor/edit/:noteId"
            render={props => (
              <NoteDetails notes={this.state.notes} {...props} />
            )}
          />
          <Redirect to="/note-editor" />
        </Switch>
      </div>
    );
  }
}

export default App;
