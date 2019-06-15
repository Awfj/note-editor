import React from "react";

const tags = props => {
  // let body = "There is no tags. Add a new one with #.";
  let body = null;

  if (props.tags.length !== 0) {
    body = (
      <ul>
        {props.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    );
  }

  return <div>{body}</div>;
};

export default tags;
