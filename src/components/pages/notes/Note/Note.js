import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import classes from "./Note.module.scss";
import Tags from "../../../shared/Tags/Tags";

const note = props => {
  // let addTagsFrom = null;
  // if (props.addingTags) {
  //   addTagsFrom = (
  //     <form>
  //       <input type="text" />
  //     </form>
  //   );
  // }
  // console.log(props)
  return (
    <div
      className={classes.note}
    >
      <Link to={{ pathname: "/note-editor/edit/" + props.id }}>
        <FontAwesomeIcon icon={["fas", "edit"]} />
      </Link>
      <button onClick={() => props.removeNoteHandler(props.index)}>
        <FontAwesomeIcon icon={["fas", "times"]} />
      </button>
      <p>{props.value}</p>
      <Tags tags={props.tags} />
      {/* {addTagsFrom}
        <button onClick={() => props.addTags(props.index)}>
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button> */}
    </div>
  );
};

export default note;
