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

  bus.on("toggleDisplay", () => {
    if (el.firstChild) {
      el.removeChild(el.firstChild);
    } else {
      el.appendChild(createArena());
    }
  });

  return el;
};
