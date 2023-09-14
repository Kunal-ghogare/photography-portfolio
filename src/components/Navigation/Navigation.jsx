import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Contact from "../Contact/Contact";
import Landing from "../Landing/Landing";
import styles from "./Navigation.module.scss";
import data from "../../data/info2";
import Section from "../Section/Section";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile = width <= 768;

  return (
    <Router>
      {isMobile ? (
        <nav>
          <h2>
            <Link to="/">Kunal Ghogare</Link>
          </h2>
          {!isOpen && (
            <button
              className={styles.hamburger}
              onClick={() => setIsOpen(!isOpen)}
            >
              ≡
            </button>
          )}
          {isOpen && (
            <div className={styles.mobile_menu}>
              <button className={styles.close} onClick={() => setIsOpen(false)}>
                X
              </button>
              <ul>
                <li onClick={() => setIsOpen(false)}>
                  <Link to="/">Work</Link>
                </li>
                <li onClick={() => setIsOpen(false)}>
                  {" "}
                  <Link to="/Contact">Contact</Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      ) : (
        <nav>
          <h2>
            <Link to="/">Kunal Ghogare</Link>
          </h2>
          <ul>
            <li>
              <Link to="/">Work</Link>
            </li>
            <li>
              {" "}
              <Link to="/Contact">Contact</Link>
            </li>
          </ul>
        </nav>
      )}

      <Switch>
        {data.map((d) => (
          <Route path={`/${d.title}`}>
            <Section information={d} />
          </Route>
        ))}
        <Route path="/Contact">
          <Contact />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
};

export default Navigation;
