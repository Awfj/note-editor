import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Tags.module.scss";

const tags = props => {
  let body = null;
  let addTagForm = null;
  let removeButton = null;
  // let tagsClasses = '';

  // if (props.noteTagsClass) {
  //   tagsClasses = 
  // }

  if (props.location && props.location.includes("/note-editor/edit/")) {
    addTagForm = (
      <form className={classes.addTagForm}>
        <input
          className={classes.newTagsInput}
          type="text"
          placeholder="Type new tags..."
          value={props.enteredTags.join(" ")}
          onChange={props.changeAddTagHandler}
        />
        <button
          className={classes.addButton}
          onClick={event => props.addTagsHandler(event, props.noteId)}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
      </form>
    );
    removeButton = (
      <button className={classes.removeButton}>
        <FontAwesomeIcon icon={["fas", "times"]} />
      </button>
    );
  }

  if (props.tags.length !== 0) {
    body = (
      <ul>
        {props.tags.map((tag, index) => (
          <div key={index} className={classes.listGroup}>
            <li className={[classes.tags, classes[props.tagsType]].join(' ')}>{tag}</li>
            {removeButton}
          </div>
        ))}
      </ul>
    );
  }
  console.log(props)
  return (
    <div className={classes.tags}>
      {addTagForm}
      {body}
    </div>
  );
};

export default tags;
