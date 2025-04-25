import React, { JSX } from "react";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <ul className="navbar">
      <li>
        <a href="/">Play</a>
      </li>
      <li>
        <a href="/highscores">Highscores</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
  );
};

export default Navbar;
