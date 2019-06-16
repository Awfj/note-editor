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
    this.setState({ notes, enteredTags: [], test: updatedNoteTags });
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

    // const noteTags = [...note.tags];

    const test = [...this.state.test];

    let tags = value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    let a = tags.concat(test);

    let updatedTags = [];
    a.map(tag => {
      if (!updatedTags.includes(tag)) {
        return (updatedTags = updatedTags.concat(tag));
      } else {
        return updatedTags;
      }
    });
    // let updatedTags = [];
    // tags.map(tag => {
    //   if (!updatedTags.includes(tag)) {
    //     return (updatedTags = updatedTags.concat(tag));
    //   } else {
    //     return updatedTags;
    //   }
    // });

    // let test = noteTags.filter(tag => !updatedTags.includes(tag));
    // let test = noteTags.concat(updatedTags);

    // let updatedTest = [];
    // test.map(tag => {
    //   if (!updatedTest.includes(tag)) {
    //     return (updatedTest = updatedTest.concat(tag));
    //   } else {
    //     return updatedTest;
    //   }
    // });

    // console.log(updatedTest);

    // let a = tags.concat(test);
    console.log(updatedTags);

    // let addedTags = [];
    // if (noteTags.length > tags.length) {
    //   addedTags = noteTags.slice(tags.length);
    // } else if (addedTags.length === 0) {
    //   console.log("111");
    //   // console.log(addedTags);
    //   if (noteTags.length === tags.length) {
    //     console.log("214");
    //     addedTags = noteTags.slice(tags.length - 1);
    //   }
    // }

    // let a = tags.concat(addedTags);

    note.value = value;
    note.tags = tags;

    notes[noteIndex] = note;

    this.setState({ notes });
  };

  changeAddTagHandler = event => {
    const value = event.target.value.split(" ");

    this.setState({ enteredTags: value });
  };

  render() {
    console.log(this.state.notes[0].tags);
    // console.log(this.state.test);
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
