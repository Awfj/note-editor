import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import classes from "./NoteDetails.module.scss";
import Tags from "../../components/shared/Tags/Tags";

class NoteDetails extends Component {
  render() {
    const noteId = this.props.match.params.noteId;
    let body = null;

    const currentNote = this.props.notes.find(note => {
      return note.id === noteId;
    });

    if (!currentNote) {
      body = <Redirect to="/note-editor" />;
    } else {
      body = (
        <div className={classes.noteDetails}>
          <h2>Edit Note</h2>
          <form className={classes.editNoteForm}>
            <textarea
              name="note-details"
              value={currentNote.value}
              onChange={event =>
                this.props.onChangeEditNoteHandler(event, noteId)
              }
            />
          </form>
          <Tags tags={currentNote.tags} />
        </div>
      );
    }
    return <Fragment>{body}</Fragment>;
  }
}

export default NoteDetails;
