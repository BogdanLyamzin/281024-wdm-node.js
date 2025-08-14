"use client";

import { useState, useCallback } from "react";

import styles from "./ToggleText.module.css";

const ToggleText = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = useCallback(()=> setOpen(prevOpen => !prevOpen), []);

    const textClassName = open ? `${styles.truncatedText} ${styles.open}` : styles.truncatedText;

  return (
    <div>
      <p className={textClassName}>{children}</p>
      <button
      onClick={toggleOpen}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
        type="button"
      >
        {open ? "hide text" : "show all text"}
      </button>
    </div>
  );
};

export default ToggleText;
