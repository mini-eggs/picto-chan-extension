import createElement from "ogle-tr-122b";
import bus from "busa";
import { uni } from "./constants";

let video = [".webm"];

let classes = styles`
  .container {
    > * {
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

export default item => {
  let id = uni(); // to pause video in dom from extension, hax

  let el = createElement("div")
    .setAttribute("class", classes.container)
    .appendChild(
      video.includes(item.ext)
        ? createElement("video")
            .setAttribute("id", id)
            .setAttribute("autoplay", true)
            .setAttribute("loop", true)
            .setAttribute("style", `background-image: url(${item.sml})`)
            .setAttribute("src", item.big)
        : createElement("img")
            .setAttribute("style", `background-image: url(${item.sml})`)
            .setAttribute("src", item.big)
    );

  bus.on("mouseActive", () => {
    if (document.contains(el) && video.includes(item.ext)) {
      let vid = Element.prototype.querySelector.call(el, "video");
      vid.setAttribute("controls", "controls");
    }
  });

  bus.on("mouseInactive", () => {
    if (document.contains(el) && video.includes(item.ext)) {
      let vid = Element.prototype.querySelector.call(el, "video");
      vid.removeAttribute("controls");
    }
  });

  bus.on("download", () => {
    /**
     * This doesn't work anymore?
     * Why do Chrome extension not allow us to do this?
     */
    if (document.contains(el)) {
      let el = createElement("a")
        .setAttribute("download", item.filename)
        .setAttribute("target", "_blank")
        .setAttribute("href", item.big);
      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    }
  });

  bus.on("togglePlayback", () => {
    /**
     * Again, what?
     * Why can't a pause a video in a Chrome extension?
     * I swear we could do this at some point...
     */
    if (document.contains(el) && el.querySelector("video")) {
      let script = document.createElement("script");
      script.innerHTML = `
        var vid_${id} = document.getElementById("${id}")
        if(vid_${id}.paused){
          vid_${id}.play()
        }
        else {
          vid_${id}.pause()
        }
      `;
      document.body.appendChild(script);
      setTimeout(() => document.body.removeChild(script));
    }
  });

  return el;
};
