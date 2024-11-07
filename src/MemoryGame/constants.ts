import moto1 from "../../public/gameImages/1.jpg";
import moto2 from "../../public/gameImages/2.jpg";
import moto3 from "../../public/gameImages/3.jpg";
import moto4 from "../../public/gameImages/4.jpg";

export const GAME_DATA = [
  { title: "400", text: "Bad Request", imgUrl: moto1 },
  { title: "401", text: "Unauthorized", imgUrl: moto2 },
  { title: "403", text: "Forbidden", imgUrl: moto3 },
  { title: "404", text: "Not Found", imgUrl: moto4 },
  { title: "500", text: "Server Error", imgUrl: moto1 },
  { title: "502", text: "Bad Gateway", imgUrl: moto2 },
] as const;

export const CARD_FLIP_DELAY = 1000;
export const MESSAGE_DURATION = 1500;
export const CONFETTI_DURATION = 5000;
