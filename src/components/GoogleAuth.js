import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { MY_CLIENT_ID } from "../keys";
import { signIn, signOut } from "../actions";
import { googleIcon } from "../icons";

const GoogleAuth = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        dispatch(
          signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId())
        );
      } else {
        dispatch(signOut());
      }
    };

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: MY_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
        });
    });
  }, [dispatch]);

  const renderAuthButton = () => {
    if (isSignedIn) {
      return (
        <Button
          size="sm"
          variant="outline-danger"
          className="d-flex align-items-center bar-button"
          onClick={() => {
            dispatch(onSignOutClick);
          }}
        >
          {googleIcon}
          <div className="ms-1">Log Out</div>
        </Button>
      );
    } else {
      return (
        <Button
          size="sm"
          variant="outline-primary"
          className="d-flex align-items-center bar-button"
          onClick={() => {
            dispatch(onSignInClick);
          }}
        >
          {googleIcon}
          <div className="ms-1">Log In</div>
        </Button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const onSignInClick = () => {
  window.gapi.auth2.getAuthInstance().signIn();
};

const onSignOutClick = () => {
  window.gapi.auth2.getAuthInstance().signOut();
};

export default GoogleAuth;
