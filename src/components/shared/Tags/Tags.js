import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const tags = props => {
  // let body = "There is no tags. Add a new one with #.";
  let body = null;
  let addTagForm = null;


  if (props.location && props.location.includes("/note-editor/edit/")) {
    addTagForm = (
      <form>
        <input type="text" value={props.enteredTags.join(' ')} onChange={props.changeAddTagHandler} />
        <button onClick={event => props.addTagsHandler(event, props.noteId)}>
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
      </form>
    );
  }

  if (props.tags.length !== 0) {
    body = (
      <ul>
        {props.tags.map((tag, index) => (
          <li key={index}>
            {tag}{" "}
            <button>
              <FontAwesomeIcon icon={["fas", "times"]} />
            </button>
          </li>
        ))}
        {addTagForm}
      </ul>
    );
  }

  return <div>{body}</div>;
};

export default tags;
