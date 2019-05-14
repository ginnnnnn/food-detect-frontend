import React from "react";

const Rank = ({ user }) => {
  return (
    <div className="tc">
      <div className="blue f3 f1-ns mt0 b">
        Hi {user.username} show me what you eat
      </div>
      <div className="white f3 f1-ns mt0 fw7">
        you have show me {user.entries} times
      </div>
    </div>
  );
};

export default Rank;
