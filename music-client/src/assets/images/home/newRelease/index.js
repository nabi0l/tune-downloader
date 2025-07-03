import thankfull from "./thankfull and blessed.jpeg";
import tobyMac from "./TobyMac_Heaven_On_My_Mind.jpg";
import stillWaters from "./still waters.jpeg";
import childOfGod from "./child of god.jpeg";
import blinded from "./blinded.jpeg";
import thankGod from "./thank-God.jpeg"; // Matches DB's 'thank-God'
import wildflowers from "./windflowers.jpeg"; // Matches DB's 'windflowers'
import light from "./light.jpeg";
import defaultAlbum from "./default-album.jpg";

// Export as an object with keys matching your DB's `image_url`
export default {
  "blinded": blinded,
  "thank-God": thankGod, // Matches DB's hyphenated key
  "windflowers": wildflowers, // Matches DB's 'windflowers'
  "light": light,
  "thankfull and blessed": thankfull, // Matches DB's spaced key
  "TobyMac_Heaven_On_My_Mind": tobyMac,
  "still waters": stillWaters,
  "child of god": childOfGod,
  "default": defaultAlbum,
};
