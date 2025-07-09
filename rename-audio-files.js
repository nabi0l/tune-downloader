const fs = require('fs');
const path = require('path');

// Map of current file names to new file names for each artist
const renameMap = {
  'hillsong-worship': {
    'What A Beautiful Name - Hillsong Worship - Hillsong Worship.mp3': 'What A Beautiful Name - Hillsong Worship.mp3',
    'King of Kings - Hillsong Worship.mp3': 'King of Kings - Hillsong Worship.mp3',
    'Who You Say I Am - Hillsong Worship - Hillsong Worship.mp3': 'Who You Say I Am - Hillsong Worship.mp3',
    'Cornerstone - Live  Hillsong Worship - Hillsong Worship.mp3': 'Cornerstone - Hillsong Worship.mp3',
  },
  'hillsong-united': {
    'Oceans (Where Feet May Fail) - Hillsong UNITED.mp3': 'Oceans (Where Feet May Fail) - Hillsong UNITED.mp3',
  },
  'chris-tomlin': {
    'Good Good Father - Chris Tomlin.mp3': 'Good Good Father - Chris Tomlin.mp3',
    'Chris Tomlin - How Great Is Our God (Lyrics And Chords) - ChrisTomlinVEVO (1).mp3': 'How Great Is Our God - Chris Tomlin.mp3',
    'Amazing Grace - Chris Tomlin.mp3': 'Amazing Grace - Chris Tomlin.mp3',
  },
  'matt-redman': {
    'Matt Redman - 10,000 Reasons (Bless the Lord) - MattRedmanVEVO.mp3': '10,000 Reasons (Bless the Lord) - Matt Redman.mp3',
  },
  'cory-asbury': {
    'Reckless Love (Live with story) - Cory Asbury Heaven Come 2017 - Bethel Music.mp3': 'Reckless Love - Cory Asbury.mp3',
  },
  'sinach': {
    'SINACH WAY MAKER - SINACH.mp3': 'SINACH WAY MAKER - SINACH.mp3',
  },
  'pat-barrett': {
    'Build My Life - Pat Barrett.mp3': 'Build My Life - Pat Barrett.mp3',
  },
  'elevation-worship': {
    'Do It Again  Live - Elevation Worship.mp3': 'Do It Again - Elevation Worship.mp3',
    'Graves Into Gardens  Live  Elevation Worship - Elevation Worship.mp3': 'Graves Into Gardens - Elevation Worship.mp3',
    'Here Again - Elevation Worship.mp3': 'Here Again - Elevation Worship.mp3',
    'Jireh - Elevation Worship.mp3': 'Jireh - Elevation Worship.mp3',
    'RATTLE! - Elevation Worship.mp3': 'RATTLE! - Elevation Worship.mp3',
    'Resurrecting - Elevation Worship.mp3': 'Resurrecting - Elevation Worship.mp3',
    'Same God - Elevation Worship.mp3': 'Same God - Elevation Worship.mp3',
  },
  'kari-jobe': {
    'The Blessing with Kari Jobe & Cody Carnes - Live From Elevation Ballantyne - Elevation Worship.mp3': 'The Blessing with Kari Jobe.mp3',
  },
  'bethel-music': {
    'No Longer Slaves (Official Lyric Video) - Jonathan David and Melissa Helser We Will Not Be Shaken - Bethel Music.mp3': 'No Longer Slaves - Bethel Music.mp3',
    'Raise a Hallelujah - Bethel Music.mp3': 'Raise a Hallelujah - Bethel Music.mp3',
    'Goodness Of God (LIVE) - Jenn Johnson VICTORY - Bethel Music.mp3': 'Goodness Of God - Bethel Music.mp3',
    'God of Revival - Bethel Music, Brian Johnson, Jenn Johnson - Bethel Music.mp3': 'God of Revival - Bethel Music.mp3',
  },
  'all-sons-daughters': {
    'All Sons & Daughters - Great Are You Lord (Lyric Video) - AllSonsDaughtersVEVO.mp3': 'Great Are You Lord - All Sons & Daughters.mp3'
  },
  'phil-wickham': {
    'Phil Wickham - This Is Amazing Grace (Official Music Video) - PhilWickhamVEVO.mp3': 'This Is Amazing Grace - PhilWickhamVEVO.mp3',
    'Great Things - PhilWickhamVEVO.mp3': 'Great Things - PhilWickhamVEVO.mp3',
    'Phil Wickham - Living Hope (Official Music Video) - PhilWickhamVEVO.mp3': 'Living Hope - PhilWickhamVEVO.mp3',
    'Phil Wickham - Battle Belongs (Official Music Video) - PhilWickhamVEVO.mp3': 'Battle Belongs - PhilWickhamVEVO.mp3',
    'Hymn of Heaven - Phil Wickham.mp3': 'Hymn of Heaven - Phil Wickham.mp3',
    'Phil Wickham - House Of The Lord (Official Music Video) - PhilWickhamVEVO.mp3': 'House Of The Lord - PhilWickhamVEVO.mp3',
  },
  'keith-and-kristyn-getty': {
    'In Christ Alone - Keith & Kristyn Getty, CityAlight (Official Lyric Video) - KeithandKristyn Getty.mp3': 'In Christ Alone - KeithandKristyn Getty.mp3',
  },
  'maverick-city-music': {
    'Promises (feat. Joe L Barnes & Naomi Raine) - Maverick City Music - TRIBL.mp3': 'Promises - Maverick City Music.mp3',
    'Man of Your Word (feat. Chandler Moore & KJ Scriven)  Maverick City Music  TRIBL - TRIBL.mp3': 'Man of Your Word - Maverick City Music.mp3',
    'Refiner (feat. Chandler Moore & Steffany Gretzinger) - Maverick City Music - TRIBL.mp3': 'Refiner - Maverick City Music.mp3',
  },
  'mosaic-msc': {
    'MOSAIC MSC- Tremble (Official Audio) - Mosaic MSC.mp3': 'Tremble - Mosaic MSC.mp3',
  },
  'vertical-worship': {
    'Vertical Worship - Yes I Will (Official Lyric Video) - Vertical Worship.mp3': 'Yes I Will - Vertical Worship.mp3',
  },
  'new-life-worship': {
    'Great I Am - New Life Worship.mp3': 'Great I Am - New Life Worship.mp3',
  },
  'here-be-lions': {
    'I Speak Jesus - Here Be Lions.mp3': 'I Speak Jesus - Here Be Lions.mp3',
  },
  'cody-carnes': {
    "Firm Foundation - Cody Carnes.mp3": "Firm Foundation - Cody Carnes.mp3"
  },
  'charity-gayle': {
    "Thank You Jesus for the Blood - Charity Gayle.mp3": "Thank You Jesus for the Blood - Charity Gayle.mp3"
  },
  'kristene-dimarco': {
    "I Am No Victim - Kristene DiMarco.mp3": "I Am No Victim - Kristene DiMarco.mp3"
  },
  'hope-darst': {
    "Peace Be Still - Hope Darst.mp3": "Peace Be Still - Hope Darst.mp3"
  },
  'we-the-kingdom': {
    "We The Kingdom - Holy Water (Live) - We The Kingdom.mp3": "Holy Water - We The Kingdom.mp3"
  },
  'for-king-and-country': {
    "for KING & COUNTRY - God Only Knows (Official Lyric Video) - for KING & COUNTRY.mp3": "God Only Knows - for KING & COUNTRY.mp3"
  },
  'lauren-daigle': {
    "Lauren Daigle - You Say (Official Music Video) - Lauren Daigle.mp3": "You Say - Lauren Daigle.mp3",
    "Lauren Daigle - Rescue (Official Music Video) - Lauren Daigle.mp3": "Rescue - Lauren Daigle.mp3"
  },
  'zach-williams': {
    "Control - Zach Williams.mp3": "Control - Zach Williams.mp3",
    "Zach Williams - Chain Breaker (Official Lyric Video) - zachwilliamsVEVO.mp3": "Zach Williams - Chain Breaker (Official Lyric Video) - zachwilliamsVEVO.mp3",
    "The Blessing - Zach Williams.mp3": "The Blessing - Zach Williams.mp3"
  },
  'upper-room': {
    "Surrounded (Fight My Battles) - UPPERROOM.mp3": "Surrounded - Upper Room.mp3"
  }
};

const baseDir = path.join(__dirname, 'music-client', 'public', 'audio', 'artists');

for (const [artist, files] of Object.entries(renameMap)) {
  const artistDir = path.join(baseDir, artist, 'full-songs');
  for (const [oldName, newName] of Object.entries(files)) {
    const oldPath = path.join(artistDir, oldName);
    const newPath = path.join(artistDir, newName);
    if (fs.existsSync(oldPath)) {
      if (!fs.existsSync(newPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldName} -> ${newName}`);
      } else {
        console.log(`Skipped (target exists): ${newName}`);
      }
    } else {
      console.log(`File not found: ${oldName}`);
    }
  }
}

console.log('Renaming complete!'); 