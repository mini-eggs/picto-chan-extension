import bus from "busa";
import createElement from "ogle-tr-122b";
import { fetchPosts } from "./constants";
import createMedia from "./media";

let classes = styles`
  .arena {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black; 

    > img {
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
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

    el = createElement("div").setAttribute("class", classes.arena);

    if (current) {
      el.appendChild(createMedia(current));
    }

    return el;
  };

  return render();
};
