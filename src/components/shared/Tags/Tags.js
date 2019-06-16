import React from "react";

import classes from "./Tags.module.scss";

const tags = props => {
  let body = null;

  if (props.tags.length !== 0) {
    body = (
      <ul>
        {props.tags.map((tag, index) => (
          <div key={index} className={classes.listGroup}>
            <li className={classes.tags}>
              {tag}
            </li>
          </div>
        ))}
      </ul>
    );
  }
  return <div className={classes.tags}>{body}</div>;
};

export default tags;
