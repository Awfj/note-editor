import React, { Component } from "react";

import classes from "./Notes.module.scss";
import Note from "../../components/pages/notes/Note/Note";

export default class Notes extends Component {
  state = {
    foundNotes: [],
    searching: false,
    addingTags: false
  };

  searchHandler = event => {
    const searchValue = event.target.value;
    const notes = this.props.notes;
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

  removeTagHandler = (noteIndex, tagIndex) => {
    const notes = this.props.notes;
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
    let notes = "There is no notes";
    if (!this.state.searching) {
      if (this.props.notes.length !== 0) {
        notes = this.props.notes.map((note, index) => (
          <Note
            key={note.id}
            id={note.id}
            index={index}
            value={note.value}
            tags={note.tags}
            addingTags={this.state.addingTags}
            location={this.props.location}
            removeNoteHandler={this.props.removeNoteHandler}
            removeTag={this.removeTagHandler}
          />
        ));
      }
    } else {
      notes = this.state.foundNotes.map((note, index) => (
        <Note
          key={note.id}
          index={index}
          value={note.value}
          tags={note.tags}
          addingTags={this.state.addingTags}
          removeNote={this.removeNoteHandler}
          removeTag={this.removeTagHandler}
        />
      ));
    }

    return (
      <div>
        <h2>All Notes</h2>
        <form>
          <input
            className={classes.search}
            onChange={this.searchHandler}
            type="text"
            placeholder="Search by tag..."
          />
        </form>
        <div className={classes.notes}>{notes}</div>
      </div>
    );
  }
}
