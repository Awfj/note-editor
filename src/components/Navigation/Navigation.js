import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.scss";

const navigation = () => {
  return (
    <nav>
      <NavLink
        to="/note-editor"
        activeClassName={classes.active}
        className={classes.logo}
        exact
      >
        Note Editor
      </NavLink>
      <NavLink
        to="/note-editor/new-note"
        activeClassName={classes.active}
        className={classes.newNote}
      >
        New Note
      </NavLink>
    </nav>
  );
};

export default navigation;
