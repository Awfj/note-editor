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
    noteValue: "",
    noteTags: [],
    enteredTags: []
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

    // console.log(typeof enteredTags);

    const tags = enteredTags
      .filter(tag => tag !== '#' && Boolean(tag) !== false)
      .map(tag => {
        if (!tag.startsWith("#") && tag.length !== 0) {
          return (tag = "#" + tag);
        } else {
          return tag;
        }
      });
    let noteTags = note.tags.concat(tags);

    note.tags = noteTags;
    notes[noteIndex] = note;
    this.setState({ notes, enteredTags: [] });
  };

  changeAddNoteHandler = event => {
    const value = event.target.value;
    const noteTags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    this.setState({ noteTags, noteValue: value });
  };

  changeEditNoteHandler = (event, noteId) => {
    const notes = [...this.state.notes];
    const noteIndex = notes.findIndex(note => note.id === noteId);
    const note = { ...notes[noteIndex] };
    const value = event.target.value;
    const noteTags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);
    // const enteredTags = value
    //   .split(" ")
    //   .filter(word => word.startsWith("#") && word.length !== 1);

    note.value = value;
    note.tags = noteTags;
    // note.tags = note.tags.concat(enteredTags);

    // let tags = [];
    // note.tags.map(tag => {
    //   if(!tags.includes(tag)) {
    //     return tags.push(tag)
    //   }
    // });

    // note.tags = tags;
    notes[noteIndex] = note;
    // console.log(tags);
    // console.log(enteredTags)

    this.setState({ notes });
  };

  changeAddTagHandler = event => {
    const value = event.target.value.split(' ');

    this.setState({ enteredTags: value });
  };

  render() {
    // console.log(this.state.enteredTags);
    return (
      <div className="App">
        <Link to="/note-editor">Note Editor</Link>

        <Switch>
          <Route
            path="/note-editor"
            exact
            render={props => (
              <Notes
                notes={this.state.notes}
                noteTags={this.state.noteTags}
                noteValue={this.state.noteValue}
                addNoteHandler={this.addNoteHandler}
                changeAddNoteHandler={this.changeAddNoteHandler}
                removeNoteHandler={this.removeNoteHandler}
                {...props}
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
      </div>
    );
  }
}

export default App;
