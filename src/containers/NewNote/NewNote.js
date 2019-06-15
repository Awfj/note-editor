import React, { Component } from "react";

class NewNote extends Component {
  render() {
    return (
      <div>
        <h1>New Note</h1>
        <form onSubmit={this.props.addNoteHandler}>
          <textarea
            onChange={this.props.changeHandler}
            name="note"
            cols="30"
            rows="10"
            value={this.props.noteMessage}
          />
          <button>Add Note</button>
        </form>
      </div>
    );
  }
}

export default NewNote;
