import React from "react";

const Navigation = ({ changeRoute, isAuthed }) => {
  if (isAuthed) {
    return (
      <nav className="flex justify-end">
        <div
          onClick={() => changeRoute("signIn")}
          className="b f4 link dim black pointer underline pa3"
        >
          Log Out
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end">
        <div
          onClick={() => changeRoute("")}
          className="b f4 link dim black pointer underline pa3"
        >
          Register
        </div>
        <div
          onClick={() => changeRoute("signIn")}
          className="b f4 link dim black pointer underline pa3"
        >
          Sign In
        </div>
      </nav>
    );
  }
};

export default Navigation;
