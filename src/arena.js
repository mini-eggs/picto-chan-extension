import bus from "busa";
import createElement from "ogle-tr-122b";
import { fetchPosts } from "./constants";
import createMedia from "./media";
import preload from "image-preload";

let classes = styles`
  .arena {
    z-index: 999999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
  }
`;

export default () => {
  let el;
  let index = 0;
  let posts = [];

  fetchPosts().then(res => {
    posts = res;
    bus.on("right", move(1, 0));
    bus.on("left", move(-1, posts.length - 1));
    el.replaceWith(render());
    preload(res.filter(item => [".png", ".jpg", ".jpeg", ".gif"].includes(item.ext)).map(item => item.big));
  });

  let move = (dir, backup) => () => {
    if (document.contains(el)) {
      let potential = index + dir;
      let next = posts[potential] ? potential : backup;
      index = next;
      el.replaceWith(render());
    }
  };

  let render = () => {
    let current = posts[index];
    return (el = createElement("div")
      .setAttribute("class", classes.arena)
      .appendChild(current ? createMedia(current) : createElement("div")));
  };

  return render();
};
