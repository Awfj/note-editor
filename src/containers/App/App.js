import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import classes from "./App.module.scss";
import notesJSON from "../../assets/notes.json";
import Notes from "../Notes/Notes";
import NoteDetails from "../NoteDetails/NoteDetails";
import NewNote from "../NewNote/NewNote";
import Navigation from "../../components/Navigation/Navigation";

library.add(fas);
const uuidv4 = require("uuid/v4");

class App extends Component {
  state = {
    notes: notesJSON.notes,
    foundNotes: [],
    noteValue: "",
    noteTags: [],
    searchValue: "",
    noteAdded: false,
    searching: false
  };

  addNoteHandler = event => {
    event.preventDefault();

    const notes = this.state.notes;
    const noteTags = this.state.noteTags;
    const noteValue = this.state.noteValue;

    if (!noteValue) {
      return;
    }

    const updatedNotes = [].concat(
      { id: uuidv4(), value: noteValue, tags: noteTags },
      notes
    );

    this.setState({
      notes: updatedNotes,
      noteAdded: true,
      noteValue: "",
      noteTags: []
    });
  };

  removeNoteHandler = noteId => {
    const notes = this.state.notes;
    const foundNotes = this.state.foundNotes;
    const updatedNotes = notes.filter(note => note.id !== noteId);
    const updatedFoundNotes = foundNotes.filter(note => note.id !== noteId);

    this.setState({ notes: updatedNotes, foundNotes: updatedFoundNotes });
  };

  searchHandler = event => {
    const searchValue = event.target.value;
    const notes = [...this.state.notes];

    const foundNotes = notes.filter(note => {
      const foundTags = note.tags.filter(tag => {
        return tag.startsWith("#" + searchValue);
      });

      return (
        note.tags.join(" ").startsWith(searchValue) ||
        note.tags.includes(foundTags.join(" "))
      );
    });

    this.setState({ searchValue, foundNotes, searching: true });

    if (searchValue.length === 0) {
      this.setState({ searching: false });
    }
  };

  onChangeEditNoteHandler = (event, noteId) => {
    const value = event.target.value;
    const noteTags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    let notes = [...this.state.notes];
    const noteIndex = notes.findIndex(note => note.id === noteId);
    const note = { ...notes[noteIndex] };
    note.value = value;
    note.tags = noteTags;
    notes[noteIndex] = note;
    this.setState({ notes });
  };

  onChangeNewNoteHandler = event => {
    const value = event.target.value;
    const noteTags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    this.setState({ noteTags, noteValue: value, noteAdded: false });
  };

  render() {
    return (
      <div className={classes.app}>
        <header>
          <Navigation />
        </header>

        <main>
          <Switch>
            <Route
              path="/note-editor"
              exact
              render={() => (
                <Notes
                  notes={this.state.notes}
                  foundNotes={this.state.foundNotes}
                  searching={this.state.searching}
                  searchValue={this.state.searchValue}
                  removeNoteHandler={this.removeNoteHandler}
                  searchHandler={this.searchHandler}
                />
              )}
            />
            <Route
              path="/note-editor/new-note"
              render={() => (
                <NewNote
                  notes={this.state.notes}
                  noteValue={this.state.noteValue}
                  noteTags={this.state.noteTags}
                  noteAdded={this.state.noteAdded}
                  addNoteHandler={this.addNoteHandler}
                  onChangeNewNoteHandler={this.onChangeNewNoteHandler}
                />
              )}
            />
            <Route
              path="/note-editor/edit/:noteId"
              render={props => (
                <NoteDetails
                  notes={this.state.notes}
                  onChangeEditNoteHandler={this.onChangeEditNoteHandler}
                  {...props}
                />
              )}
            />
            <Redirect to="/note-editor" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
