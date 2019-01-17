import keybinds from "keybinds";
import bus from "busa";
import createApp from "./app";
import { eventStop } from "./constants";

keybinds([], 39, () => bus.emit("right"));
keybinds([], 37, () => bus.emit("left"));
keybinds([], 27, eventStop(() => bus.emit("toggleDisplay")));
keybinds([], 32, () => bus.emit("togglePlayback"));
keybinds([17], 83, eventStop(() => bus.emit("download")));

document.body.appendChild(createApp());
