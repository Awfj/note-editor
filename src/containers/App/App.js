import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import axios from "axios";

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
    noteValue: "",
    noteTags: [],
    noteAdded: false,
    enteredTags: [],
    test: []
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

  removeNoteHandler = noteIndex => {
    const notes = this.state.notes;
    const updatedNotes = notes.filter((_, index) => noteIndex !== index);

    this.setState({ notes: updatedNotes });
  };

  addTagsHandler = (event, noteId) => {
    event.preventDefault();

    const notes = [...this.state.notes];
    const noteIndex = notes.findIndex(note => note.id === noteId);
    const note = { ...notes[noteIndex] };
    const enteredTags = this.state.enteredTags;

    const tags = enteredTags
      .filter(tag => tag !== "#" && Boolean(tag))
      .map(tag => {
        if (!tag.startsWith("#") && tag.length !== 0) {
          return (tag = "#" + tag);
        } else {
          return tag;
        }
      });

    let updatedTags = [];
    tags.map(tag => {
      if (!updatedTags.includes(tag)) {
        return (updatedTags = updatedTags.concat(tag));
      } else {
        return updatedTags;
      }
    });

    const noteTags = note.tags.concat(tags);

    let updatedNoteTags = [];
    noteTags.map(tag => {
      if (!updatedNoteTags.includes(tag)) {
        return (updatedNoteTags = updatedNoteTags.concat(tag));
      } else {
        return updatedNoteTags;
      }
    });

    note.tags = updatedNoteTags;
    notes[noteIndex] = note;
    this.setState({ notes, enteredTags: [], test: updatedTags });
  };

  changeAddNoteHandler = event => {
    const value = event.target.value;
    const noteTags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    this.setState({ noteTags, noteValue: value, noteAdded: false });
  };

  changeEditNoteHandler = (event, noteId) => {
    const notes = [...this.state.notes];
    const noteIndex = notes.findIndex(note => note.id === noteId);
    const note = { ...notes[noteIndex] };
    const value = event.target.value;

    // const noteTags = [...note.tags];

    const test = [...this.state.test];
    let updatedTest = [];
    // console.log(updatedTest)
    updatedTest.push(test.join(" "));
    // const test = [...this.state.test];
    // console.log(test)

    // let updatedTest2 = []
    // updatedTest.map(tag => {
    //   if (!updatedTest2.includes(tag)) {
    //     return (updatedTest2 = updatedTest2.concat(tag));
    //   } else {
    //     return updatedTest2;
    //   }
    // });
    // test.push(test.join(' '))
    // console.log(updatedTest)

    let tags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    let a = tags.concat(updatedTest);

    let updatedTags = [];
    a.map(tag => {
      if (!updatedTags.includes(tag)) {
        return (updatedTags = updatedTags.concat(tag));
      } else {
        return updatedTags;
      }
    });

    note.value = value;
    note.tags = updatedTags;

    notes[noteIndex] = note;

    this.setState({ notes });
  };

  changeAddTagHandler = event => {
    const value = event.target.value.split(" ");

    this.setState({ enteredTags: value });
  };

  render() {
    // console.log(this.state.notes[0].tags);
    // console.log(this.state.test);

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
              render={props => (
                <Notes
                  notes={this.state.notes}
                  removeNoteHandler={this.removeNoteHandler}
                  {...props}
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
                  changeAddNoteHandler={this.changeAddNoteHandler}
                />
              )}
            />
            <Route
              path="/note-editor/edit/:noteId"
              render={props => (
                <NoteDetails
                  notes={this.state.notes}
                  enteredTags={this.state.enteredTags}
                  changeEditNoteHandler={this.changeEditNoteHandler}
                  addTagsHandler={this.addTagsHandler}
                  changeAddTagHandler={this.changeAddTagHandler}
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
