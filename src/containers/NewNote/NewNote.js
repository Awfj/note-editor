import React, { Component } from "react";

import classes from "./NewNote.module.scss";
import Tags from "../../components/shared/Tags/Tags";

class NewNote extends Component {
  render() {
    let success = null;
    if (this.props.noteAdded) {
      success = <p className={classes.success}>New Note Added!</p>;
    }
    return (
      <div className={classes.newNote}>
        <h2>New Note</h2>
        <form onSubmit={this.props.addNoteHandler}>
          <textarea
            onChange={this.props.changeAddNoteHandler}
            name="note"
            placeholder="Type something... New tags are created with #."
            value={this.props.noteValue}
          />
          {success}
          <div className={classes.formGroup}>
            <button className={classes.submit}>Add Note</button>
            <Tags tags={this.props.noteTags} />
          </div>
        </form>
      </div>
    );
  }
}

export default NewNote;
