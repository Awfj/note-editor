import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import classes from "./Note.module.scss";
import Tags from "../../../shared/Tags/Tags";

const note = props => {
  return (
    <div className={classes.note}>
      <div className={classes.icons}>
        <Link
          className={classes.edit}
          to={{ pathname: "/note-editor/edit/" + props.id }}
        >
          <FontAwesomeIcon icon={["fas", "edit"]} />
        </Link>
        <button
          className={classes.remove}
          onClick={() => props.removeNoteHandler(props.id)}
        >
          <FontAwesomeIcon icon={["fas", "times"]} />
        </button>
      </div>
      <p>{props.value}</p>
      <Tags tags={props.tags} tagsType="NoteTags" />
    </div>
  );
};

export default note;
