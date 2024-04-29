import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";

import MStyles from "./navbar.module.css";

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    detectPrefersDarkMode(),
  );
  const [unixtime, setUnixtime] = useState(getUnixtime());

  applyDarkMode(isDarkMode);

  useEffect(() => {
    const id = setInterval(() => setUnixtime(getUnixtime()), 1000);
    return () => clearInterval(id);
  }, [unixtime]);

  return (
    <nav className="navbar is-info">
      <div className="navbar-brand">
        <h2 className="navbar-item title">
          JWT Payload Decoder
          <span className="subtitle has-text-black ml-5">
            (unixtime: {unixtime})
          </span>
        </h2>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <span
            className={classNames(
              "icon",
              "mr-5",
              MStyles.NavbarIcon,
              MStyles.CursorPointer,
            )}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
          </span>
          <a
            href="https://github.com/sinofseven/jwt-decoder"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames("icon", "has-text-black", MStyles.NavbarIcon)}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </div>
    </nav>
  );
}

function detectPrefersDarkMode(): boolean {
  const match = window.matchMedia("(prefers-color-scheme: dark)");
  return match.matches;
}

function applyDarkMode(isDarkMode: boolean) {
  const elm = document.getElementsByTagName("html")[0];
  elm.setAttribute("data-theme", isDarkMode ? "dark" : "light");
}

function getUnixtime(): number {
  const date = new Date();
  return Math.floor(date.getTime() / 1000);
}
