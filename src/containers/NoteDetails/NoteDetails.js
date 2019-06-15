import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

import classes from "./NoteDetails.module.scss";
import Tags from '../../components/shared/Tags/Tags'

class NoteDetails extends Component {
  render() {
    let body = null;

    const currentNote = this.props.notes.find(note => {
      return note.id === this.props.match.params.noteId;
    });

    if (!currentNote) {
      body = <Redirect to="/note-editor" />;
    } else {
      body = (
        <div className={classes.noteDetails}>
          {/* <form>
            <textarea
              name=""
              id=""
              value={currentNote.message}
              cols="30"
              rows="10"
            />
          </form> */}
          <p>{currentNote.message}</p>
          <Tags tags={currentNote.tags} />
        </div>
      );
    }
    // console.log(this.props)
    return <Fragment>{body}</Fragment>;
  }
}

export default NoteDetails;
