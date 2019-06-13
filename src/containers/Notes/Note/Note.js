import React from "react";

import classes from "./Note.module.scss";

const note = props => {
  return (
    <div className={classes.note} onClick={() => props.removeNote(props.index)}>
      <p>{props.message}</p>
      <p>{props.tags}</p>
    </div>
  );
};

export default note;
