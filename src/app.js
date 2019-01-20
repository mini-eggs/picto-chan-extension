import bus from "busa";
import createElement from "ogle-tr-122b";
import createArena from "./arena";

let classes = styles`
  .app {
    button {
      position: fixed;
      top: 50px;
      right: 50px;
    }
  }
`;

export default () => {
  let el = createElement("div").setAttribute("class", classes.app);

  let previousOverflow;

  bus.on("toggleDisplay", () => {
    if (el.firstChild) {
      document.body.style.overflow = previousOverflow;
      el.removeChild(el.firstChild);
    } else {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      el.appendChild(createArena());
    }
  });

  return el;
};
