import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { switchTheme } from "../actions";
import { moonIcon, sunIcon } from "../icons";
import { DARK_THEME, LIGHT_THEME } from "../actions/themes";

const ThemeButton = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  console.log(theme);
  return (
    <Button
      size="sm"
      variant={theme.mode === "light" ? "outline-dark" : "outline-light"}
      className="mx-1 d-flex align-items-center bar-button"
      onClick={() => {
        theme.mode === "light"
          ? dispatch(switchTheme(DARK_THEME))
          : dispatch(switchTheme(LIGHT_THEME));
      }}
    >
      {theme.mode === "light" ? moonIcon : sunIcon}
    </Button>
  );
};

export default ThemeButton;
