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
          <form>
            <textarea
              name="note-details"
              value={currentNote.value}
              cols="30"
              rows="10"
              onChange={event =>
                this.props.changeEditNoteHandler(event, noteId)
              }
            />
          </form>
          <Tags
            tags={currentNote.tags}
            noteId={noteId}
            enteredTags={this.props.enteredTags}
            addTagsHandler={this.props.addTagsHandler}
            changeAddTagHandler={this.props.changeAddTagHandler}
            location={this.props.location.pathname}
          />
        </div>
      );
    }
    // console.log(this.props)
    return <Fragment>{body}</Fragment>;
  }
}

export default NoteDetails;
