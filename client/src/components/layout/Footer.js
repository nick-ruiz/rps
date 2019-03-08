import React from "react";
import classnames from "classnames";

export default () => {
  return (
    <div>
      <footer
        className={classnames("bg-dark text-white mt-5 p-4 text-center", {
          "fixed-bottom": document.getElementById("stick")
        })}
      >
        Copyright &copy; {new Date().getFullYear()} Rick's Pool Service
      </footer>
    </div>
  );
};
