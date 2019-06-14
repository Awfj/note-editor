import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Note.module.scss";

const note = props => {
  const tags = props.tags.map((tag, index) => (
    <li key={index}>
      {tag}{" "}
      <FontAwesomeIcon
        icon={["fas", "times"]}
        onClick={() => props.removeTag(props.index, index)}
      />
    </li>
  ));

  let addTagsFrom = null;
  if (props.addingTags) {
    addTagsFrom = (
      <form>
        <input type="text" />
      </form>
    );
  }
  console.log(props)
  return (
    <div className={classes.note}>
      <button>
        <FontAwesomeIcon icon={["fas", "edit"]} />
      </button>
      <button onClick={() => props.removeNote(props.index)}>
        <FontAwesomeIcon icon={["fas", "times"]} />
      </button>
      <p>{props.message}</p>
      <ul>
        Tags: {tags}
        {addTagsFrom}
        <button onClick={() => props.addTags(props.index)}>
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
      </ul>
    </div>
  );
};

export default note;
