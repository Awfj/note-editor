import React, { Component } from "react";

import classes from "./Notes.module.scss";
import notesJSON from "../../assets/notes.json";
import Note from "./Note/Note";

const uuidv4 = require("uuid/v4");

export default class Notes extends Component {
  state = {
    notes: notesJSON.notes
  };

  addNoteHandler = event => {
    event.preventDefault();

    const notes = this.state.notes;
    const addNoteform = document.forms.addNoteForm;
    let message = addNoteform.message.value;
    let tags = '';

    if (!message) {
      return;
    }

    tags = message
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1)
      .join(" ");

    const updatedNotes = notes.concat({ id: uuidv4(), message, tags });

    this.setState({ notes: updatedNotes });
    addNoteform.message.value = "";
  };

  removeNoteHandler = noteIndex => {
    const notes = this.state.notes;
    const updatedNotes = notes.filter((_, index) => noteIndex !== index);

    this.setState({ notes: updatedNotes });
  };

  render() {
    // console.log(this.state.notes);
    let notes = "There is no notes";
    if (this.state.notes.length !== 0) {
      notes = this.state.notes.map((note, index) => {
        return (
          <Note
            key={note.id}
            index={index}
            message={note.message}
            tags={note.tags}
            removeNote={this.removeNoteHandler}
          />
        );
      });
    }

    return (
      <div className={classes.notes}>
        {notes}

        <form id="addNoteForm" onSubmit={this.addNoteHandler}>
          <textarea id="message" name="message" cols="30" rows="10" />
          <button>New Note</button>
        </form>
      </div>
    );
  }
}
