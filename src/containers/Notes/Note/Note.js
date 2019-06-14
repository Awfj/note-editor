import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./Note.module.scss";

const note = props => {
  const tags = props.tags.map((tag, index) => <li key={index}>{tag}</li>);

  return (
    <div className={classes.note}>
      <button>
        <FontAwesomeIcon icon={["fas", "edit"]} />
      </button>
      <button onClick={() => props.removeNote(props.index)}>
        <FontAwesomeIcon icon={["fas", "times"]} />
      </button>
      <p>{props.message}</p>
      <ul>{tags}</ul>
    </div>
  );
};

export default note;
