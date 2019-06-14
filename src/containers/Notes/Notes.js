import React, { Component } from "react";

import classes from "./Notes.module.scss";
import notesJSON from "../../assets/notes.json";
import Note from "./Note/Note";

const uuidv4 = require("uuid/v4");

export default class Notes extends Component {
  state = {
    notes: notesJSON.notes,
    foundNotes: [],
    tags: null,
    includesTags: false,
    isSearching: false
  };

  addNoteHandler = event => {
    event.preventDefault();

    const notes = this.state.notes;
    const tags = this.state.tags;
    const addNoteform = document.forms.addNoteForm;
    const message = addNoteform.message.value;

    if (!message) {
      return;
    }

    const updatedNotes = notes.concat({ id: uuidv4(), message, tags });

    this.setState({ notes: updatedNotes, includesTags: false });
    addNoteform.message.value = "";
  };

  changeHandler = event => {
    const tags = event.target.value
      .split(" ")
      .filter(word => word.startsWith("#") && word.length !== 1);

    let includesTags = false;

    if (tags.length > 0) {
      includesTags = true;
    }

    this.setState({ tags, includesTags });
  };

  searchHandler = event => {
    const searchValue = event.target.value;
    const notes = this.state.notes;
    let foundNotes = this.state.foundNotes;

    foundNotes = notes.filter(note => {
      let test = note.tags.filter(tag => tag.startsWith(searchValue)).join(" ");
      console.log(test)

      return note.tags.includes(test);
    });
    // console.log(foundNotes);

    this.setState({ foundNotes, isSearching: true });

    if (searchValue.length === 0) {
      this.setState({ isSearching: false });
    }
  };

  removeNoteHandler = noteIndex => {
    const notes = this.state.notes;
    const updatedNotes = notes.filter((_, index) => noteIndex !== index);

    this.setState({ notes: updatedNotes });
  };

  render() {
    // console.log(this.state.foundNotes);
    let notes = "There is no notes";
    if (!this.state.isSearching) {
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
    } else {
      notes = this.state.foundNotes.map((note, index) => {
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

    let tags = null;
    if (this.state.includesTags) {
      tags = (
        <ul>
          {this.state.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      );
    }

    return (
      <div className={classes.notes}>
        <form>
          <input
            onChange={this.searchHandler}
            type="text"
            placeholder="Type a tag..."
          />
        </form>
        {notes}

        <form id="addNoteForm" onSubmit={this.addNoteHandler}>
          <textarea
            onChange={this.changeHandler}
            id="message"
            name="message"
            cols="30"
            rows="10"
          />
          {tags}
          <button>New Note</button>
        </form>
      </div>
    );
  }
}
