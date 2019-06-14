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
    searching: false,
    addingTags: false
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

  removeNoteHandler = noteIndex => {
    const notes = this.state.notes;
    const updatedNotes = notes.filter((_, index) => noteIndex !== index);

    this.setState({ notes: updatedNotes });
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

    foundNotes = notes.filter(
      note =>
        note.tags.join(" ").startsWith(searchValue) ||
        note.tags.join(" ").startsWith("#" + searchValue)
    );

    this.setState({ foundNotes, searching: true });

    if (searchValue.length === 0) {
      this.setState({ searching: false });
    }
  };

  addTagsHandler = noteIndex => {
    // const notes = this.state.notes;

    // const updatedNotes = notes.filter((note, nIndex) => {
    //   // console.log(note)
    //   return;
    // });

    console.log(noteIndex);
    this.setState({ addingTags: true });
  };

  removeTagHandler = (noteIndex, tagIndex) => {
    const notes = this.state.notes;
    const foundNotes = this.state.foundNotes;

    const updatedNotes = notes.filter((note, nIndex) => {
      if (nIndex === noteIndex) {
        return (note.tags = note.tags.filter(
          (_, tIndex) => tIndex !== tagIndex
        ));
      } else {
        return note.tags;
      }
    });

    const updatedFountNotes = foundNotes.filter((note, nIndex) => {
      if (nIndex === noteIndex) {
        return (note.tags = note.tags.filter(
          (_, tIndex) => tIndex !== tagIndex
        ));
      } else {
        return note.tags;
      }
    });

    this.setState({ notes: updatedNotes, foundNotes: updatedFountNotes });
  };

  render() {
    // console.log(this.state.addingTags);
    let notes = "There is no notes";
    if (!this.state.searching) {
      if (this.state.notes.length !== 0) {
        notes = this.state.notes.map((note, index) => (
          <Note
            key={note.id}
            index={index}
            message={note.message}
            tags={note.tags}
            addingTags={this.state.addingTags}
            removeNote={this.removeNoteHandler}
            removeTag={this.removeTagHandler}
            addTags={this.addTagsHandler}
            {...this.props}
          />
        ));
      }
    } else {
      notes = this.state.foundNotes.map((note, index) => (
        <Note
          key={note.id}
          index={index}
          message={note.message}
          tags={note.tags}
          addingTags={this.state.addingTags}
          removeNote={this.removeNoteHandler}
          removeTag={this.removeTagHandler}
          addTags={this.addTagsHandler}
        />
      ));
    }

    let tags = "There is no tags. Add a new one with #.";
    if (this.state.includesTags) {
      tags = this.state.tags.map((tag, index) => <li key={index}>{tag}</li>);
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
          <ul>Tags: </ul>
          {tags}
          <button>New Note</button>
        </form>
      </div>
    );
  }
}
