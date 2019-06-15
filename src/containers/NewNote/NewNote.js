import React, { Component } from "react";

import Tags from '../../components/shared/Tags/Tags';

class NewNote extends Component {
  render() {
    return (
      <div>
        <h2>New Note</h2>
        <form onSubmit={this.props.addNoteHandler}>
          <textarea
            onChange={this.props.changeAddNoteHandler}
            name="note"
            rows="10"
            value={this.props.noteValue}
          />
          <button>Add Note</button>
        </form>
        <Tags tags={this.props.noteTags} />
      </div>
    );
  }
}

export default NewNote;
