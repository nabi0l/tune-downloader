// Audio file organization index
// Generated automatically - do not edit manually

export const audioArtists = {
  "Hillsong Worship": "hillsong-worship",
  "Hillsong UNITED": "hillsong-united",
  "Chris Tomlin": "chris-tomlin",
  "Matt Redman": "matt-redman",
  "Cory Asbury": "cory-asbury",
  "Sinach": "sinach",
  "Pat Barrett": "pat-barrett",
  "Elevation Worship": "elevation-worship",
  "Bethel Music": "bethel-music",
  "All Sons & Daughters": "all-sons-daughters",
  "Phil Wickham": "phil-wickham",
  "Keith & Kristyn Getty": "keith-kristyn-getty",
  "Mosaic MSC": "mosaic-msc",
  "Vertical Worship": "vertical-worship",
  "New Life Worship": "new-life-worship",
  "Here Be Lions": "here-be-lions",
  "Cody Carnes": "cody-carnes",
  "Charity Gayle": "charity-gayle",
  "Kristene DiMarco": "kristene-dimarco",
  "Hope Darst": "hope-darst",
  "We The Kingdom": "we-the-kingdom",
  "for KING & COUNTRY": "for-king-country",
  "Lauren Daigle": "lauren-daigle",
  "Zach Williams": "zach-williams",
  "Upper Room": "upper-room",
  "Tauren Wells": "tauren-wells",
  "MercyMe": "mercyme",
  "Casting Crowns": "casting-crowns",
  "TobyMac": "tobymac",
  "Mandisa": "mandisa",
  "Matthew West": "matthew-west",
  "Jeremy Camp": "jeremy-camp",
  "Brandon Lake": "brandon-lake",
  "Steffany Gretzinger": "steffany-gretzinger",
  "Brooke Ligertwood": "brooke-ligertwood",
  "Passion": "passion",
  "Housefires": "housefires",
  "Kirk Franklin": "kirk-franklin",
  "Tasha Cobbs Leonard": "tasha-cobbs-leonard",
  "Travis Greene": "travis-greene",
  "Jonathan McReynolds": "jonathan-mcreynolds",
  "CeCe Winans": "cece-winans",
  "Fernando Ortega": "fernando-ortega",
  "Indelible Grace": "indelible-grace",
  "Page CXVI": "page-cxvi",
  "Kari Jobe": "kari-jobe",
  "Joyful Voices": "joyful-voices",
  "Faith Choir": "faith-choir",
  "Modern Worship Collective": "modern-worship-collective",
  "Voices of Joy": "voices-of-joy"
};

export const getAudioPath = (artist, songType = 'full-songs', fileName) => {
  const artistFolder = audioArtists[artist];
  if (!artistFolder) {
    console.warn(`Artist not found: ${artist}`);
    return null;
  }
  return `/audio/artists/${artistFolder}/${songType}/${fileName}`;
};

export const getArtistAudioFolder = (artist) => {
  const artistFolder = audioArtists[artist];
  return artistFolder ? `/audio/artists/${artistFolder}` : null;
};
