import React, { Component } from "react";

import classes from "./Notes.module.scss";
import Note from "../../components/pages/notes/Note/Note";

class Notes extends Component {
  render() {
    let notesExist = "There are no notes";
    let notesNotFound = null;
    let heading = null;

    if (this.props.searching && this.props.foundNotes.length === 0) {
      notesNotFound = "No notes found";
    }

    if (!this.props.searching) {
      if (this.props.notes.length !== 0) {
        notesExist = this.props.notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            value={note.value}
            tags={note.tags}
            removeNoteHandler={this.props.removeNoteHandler}
          />
        ));
      }
      heading = <h2>All Notes</h2>;
    } else {
      notesExist = this.props.foundNotes.map(note => (
        <Note
          key={note.id}
          id={note.id}
          value={note.value}
          tags={note.tags}
          removeNoteHandler={this.props.removeNoteHandler}
        />
      ));
      heading = <h2>Found Notes</h2>;
    }

    return (
      <div>
        <form>
          <input
            className={classes.search}
            type="text"
            placeholder="Search by tag..."
            value={this.props.searchValue}
            onChange={this.props.searchHandler}
          />
        </form>
        {heading}
        <div className={classes.notes}>
          {notesExist}
          {notesNotFound}
        </div>
      </div>
    );
  }
}

export default Notes;
