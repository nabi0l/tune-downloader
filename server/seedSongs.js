const mongoose = require('mongoose');
const Song = require('./models/Song');
require('dotenv').config();

const christianSongs = [
  {
    title: 'What a Beautiful Name',
    artist: 'Hillsong Worship',
    album: 'Let There Be Light',
    genre: 'Worship',
    duration: 257,
    audioUrl: 'https://example.com/songs/what-a-beautiful-name.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273a0c48b2a6eab12b6bca444b0',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Oceans (Where Feet May Fail)',
    artist: 'Hillsong UNITED',
    album: 'Zion',
    genre: 'Worship',
    duration: 537,
    audioUrl: 'https://example.com/songs/oceans.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273042d5acb63b1125a1f0749ba',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Good Good Father',
    artist: 'Chris Tomlin',
    album: 'The Worship Initiative',
    genre: 'Worship',
    duration: 234,
    audioUrl: 'https://example.com/songs/good-good-father.mp3',
    coverImage: 'https://cdn-images.dzcdn.net/images/cover/21c068f89666be9d8bff115f05988437/0x1900-000000-80-0-0.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: '10,000 Reasons (Bless the Lord)',
    artist: 'Matt Redman',
    album: '10,000 Reasons',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/10000-reasons.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Matt_Redman_10.000Reasons.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Reckless Love',
    artist: 'Cory Asbury',
    album: 'Reckless Love',
    genre: 'Worship',
    duration: 335,
    audioUrl: 'https://example.com/songs/reckless-love.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/83/Reckless_Love_Cory_Asbury_%28Official_Album_Cover%29.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Way Maker',
    artist: 'Sinach',
    album: 'Way Maker',
    genre: 'Worship',
    duration: 420,
    audioUrl: 'https://example.com/songs/way-maker.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273e8b96817df667273c14a7415',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Build My Life',
    artist: 'Pat Barrett',
    album: 'Pat Barrett',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/build-my-life.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b27342a3464c6d3266f8260d120e',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Graves Into Gardens',
    artist: 'Elevation Worship',
    album: 'Graves Into Gardens',
    genre: 'Worship',
    duration: 334,
    audioUrl: 'https://example.com/songs/graves-into-gardens.mp3',
    coverImage: 'https://www.datocms-assets.com/60663/1643727856-giga_final_cover-1.jpeg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'King of Kings',
    artist: 'Hillsong Worship',
    album: 'Awake',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/king-of-kings.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b2734f75c1a0de4d60e722f7badf',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'The Blessing',
    artist: 'Kari Jobe, Cody Carnes, Elevation Worship',
    album: 'The Blessing',
    genre: 'Worship',
    duration: 423,
    audioUrl: 'https://example.com/songs/the-blessing.mp3',
    coverImage: 'https://www.capitolcmglabelgroup.com/wp-content/uploads/sites/2071/2022/10/KariBlessing_Digital.-compressed-scaled.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Who You Say I Am',
    artist: 'Hillsong Worship',
    album: 'There Is More',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/who-you-say-i-am.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Who_You_Say_I_Am_by_Hillsong_Worship_%28Official_Single_Cover%29.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'No Longer Slaves',
    artist: 'Bethel Music',
    album: 'We Will Not Be Shaken',
    genre: 'Worship',
    duration: 348,
    audioUrl: 'https://example.com/songs/no-longer-slaves.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/7/7e/No_Longer_Slaves_by_Bethel_Music.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Great Are You Lord',
    artist: 'All Sons & Daughters',
    album: 'All Sons & Daughters',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/great-are-you-lord.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b27370691e47ee2b3288592ad4a8',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'This Is Amazing Grace',
    artist: 'Phil Wickham',
    album: 'The Ascension',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/this-is-amazing-grace.mp3',
    coverImage: 'https://i1.sndcdn.com/artworks-KEQ4Mqe7gZQW-0-t500x500.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'How Great Is Our God',
    artist: 'Chris Tomlin',
    album: 'Arriving',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/how-great-is-our-god.mp3',
    coverImage: 'https://m.media-amazon.com/images/I/91pUVqOwjtL._UF1000,1000_QL80_.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Amazing Grace (My Chains Are Gone)',
    artist: 'Chris Tomlin',
    album: 'See the Morning',
    genre: 'Hymn',
    duration: 287,
    audioUrl: 'https://example.com/songs/amazing-grace.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273b7453db4f45dd173ef334fb6',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'In Christ Alone',
    artist: 'Keith & Kristyn Getty',
    album: 'In Christ Alone',
    genre: 'Hymn',
    duration: 302,
    audioUrl: 'https://example.com/songs/in-christ-alone.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273309663fb0a6f374fb53d31ad',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Cornerstone',
    artist: 'Hillsong Worship',
    album: 'Cornerstone',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/cornerstone.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Hillsong-Cornerstone.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Great Things',
    artist: 'Phil Wickham',
    album: 'Living Hope',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/great-things.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/98/Living_Hope_by_Phil_Wickham_%28Official_Album_Cover%29.png',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Living Hope',
    artist: 'Phil Wickham',
    album: 'Living Hope',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/living-hope.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/98/Living_Hope_by_Phil_Wickham_%28Official_Album_Cover%29.png',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Resurrecting',
    artist: 'Elevation Worship',
    album: 'There Is a Cloud',
    genre: 'Worship',
    duration: 334,
    audioUrl: 'https://example.com/songs/resurrecting.mp3',
    coverImage: 'https://www.datocms-assets.com/60663/1644331482-hereasinheavecover.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Do It Again',
    artist: 'Elevation Worship',
    album: 'There Is a Cloud',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/do-it-again.mp3',
    coverImage: 'https://www.datocms-assets.com/60663/1644331482-hereasinheavecover.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Here Again',
    artist: 'Elevation Worship',
    album: 'Hallelujah Here Below',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/here-again.mp3',
    coverImage: 'https://www.datocms-assets.com/60663/1641406088-ew-hhbe_2-1.jpeg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Raise a Hallelujah',
    artist: 'Bethel Music',
    album: 'Victory',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/raise-a-hallelujah.mp3',
    coverImage: 'https://i1.sndcdn.com/artworks-oxSwC5p7xLSZ-0-t500x500.png',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'The Goodness of God',
    artist: 'Bethel Music',
    album: 'Victory',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/the-goodness-of-god.mp3',
    coverImage: 'https://transforms.cdn.bethelmusic.com/production/albums/goodness-of-god-radio-version.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'God of Revival',
    artist: 'Bethel Music',
    album: 'Revival\'s in the Air',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/god-of-revival.mp3',
    coverImage: 'https://transforms.cdn.bethelmusic.com/production/albums/Revivals-in-the-Air-album.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Surrounded (Fight My Battles)',
    artist: 'Upper Room',
    album: 'Surrounded',
    genre: 'Worship',
    duration: 420,
    audioUrl: 'https://example.com/songs/surrounded.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b2734181a3e250b78583467db4f3',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Battle Belongs',
    artist: 'Phil Wickham',
    album: 'Hymn of Heaven',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/battle-belongs.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/49/Battle_Belongs_by_Phil_Wickham_%28Official_Single_Cover%29.png',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Hymn of Heaven',
    artist: 'Phil Wickham',
    album: 'Hymn of Heaven',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/hymn-of-heaven.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/d/db/Hymn_of_Heaven_-_Phil_Wickham.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Same God',
    artist: 'Elevation Worship',
    album: 'LION',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/same-god.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/8c/Lion_by_Elevation_Worship.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Jireh',
    artist: 'Elevation Worship',
    album: 'LION',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/jireh.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Jireh_-_Elevation_Worship_and_Maverick_City_Music.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'RATTLE!',
    artist: 'Elevation Worship',
    album: 'LION',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/rattle.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Rattle_by_Elevation_Worship.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Promises',
    artist: 'Maverick City Music',
    album: 'Maverick City Vol. 3 Part 1',
    genre: 'Worship',
    duration: 420,
    audioUrl: 'https://example.com/songs/promises.mp3',
    coverImage: 'https://www.worshiptogether.com/media/yuwhim01/maverick-city-vol3.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Man of Your Word',
    artist: 'Maverick City Music',
    album: 'Maverick City Vol. 3 Part 1',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/man-of-your-word.mp3',
    coverImage: 'https://cdn-images.dzcdn.net/images/cover/5c77785ed7a1e4352be5a8ca24bf8547/0x1900-000000-80-0-0.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Refiner',
    artist: 'Maverick City Music',
    album: 'Maverick City Vol. 3 Part 1',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/refiner.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273e598ddc6735ed933b07edb83',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Tremble',
    artist: 'Mosaic MSC',
    album: 'Glory & Wonder',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/tremble.mp3',
    coverImage: 'https://www.air1.com/_next/image?url=https%3A%2F%2Fcdn.corpemf.com%2Fmusic%2F72374.jpeg&w=1080&q=75',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Yes I Will',
    artist: 'Vertical Worship',
    album: 'Bright Faith Bold Future',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/yes-i-will.mp3',
    coverImage: 'https://cdn-images.dzcdn.net/images/cover/96652e9289daff7a85ca14321e57b9c1/0x1900-000000-80-0-0.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Great I Am',
    artist: 'New Life Worship',
    album: 'You Hold It All',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/great-i-am.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b27350c63268a7e07dbb8f546768',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'I Speak Jesus',
    artist: 'Here Be Lions',
    album: 'I Speak Jesus',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/i-speak-jesus.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d00001e024f75c1a0de4d60e722f7badf',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'House of the Lord',
    artist: 'Phil Wickham',
    album: 'Hymn of Heaven',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/house-of-the-lord.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/c9/House_of_the_Lord_-_Phil_Wickham.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Firm Foundation (He Won\'t)',
    artist: 'Cody Carnes',
    album: 'Firm Foundation',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/firm-foundation.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/2/24/Firm_Foundation_%28He_Won%27t%29_-_Cody_Carnes.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Thank You Jesus for the Blood',
    artist: 'Charity Gayle',
    album: 'Thank You Jesus for the Blood',
    genre: 'Worship',
    duration: 420,
    audioUrl: 'https://example.com/songs/thank-you-jesus.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273e8b96817df667273c14a7415',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'I Am No Victim',
    artist: 'Kristene DiMarco',
    album: 'Mighty',
    genre: 'Worship',
    duration: 312,
    audioUrl: 'https://example.com/songs/i-am-no-victim.mp3',
    coverImage: 'http://images.genius.com/fb41ab4125e9af5ca84380948f6d32bd.1000x1000x1.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Peace Be Still',
    artist: 'Hope Darst',
    album: 'Peace Be Still',
    genre: 'Worship',
    duration: 287,
    audioUrl: 'https://example.com/songs/peace-be-still.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273d96a5ad83997650fe5bcad44',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Holy Water',
    artist: 'We The Kingdom',
    album: 'Holy Water',
    genre: 'Worship',
    duration: 302,
    audioUrl: 'https://example.com/songs/holy-water.mp3',
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Holy_Water_by_We_the_Kingdom_%28Official_Single_Cover%29.png',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'God Only Knows',
    artist: 'for KING & COUNTRY',
    album: 'Burn the Ships',
    genre: 'Contemporary Christian',
    duration: 234,
    audioUrl: 'https://example.com/songs/god-only-knows.mp3',
    coverImage: 'https://i1.sndcdn.com/artworks-cVHoyZuzMUwxvjBV-i3Uz6g-t500x500.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'You Say',
    artist: 'Lauren Daigle',
    album: 'Look Up Child',
    genre: 'Contemporary Christian',
    duration: 257,
    audioUrl: 'https://example.com/songs/you-say.mp3',
    coverImage: 'https://i1.sndcdn.com/artworks-DNWDXrlFr4qw-0-t500x500.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Rescue',
    artist: 'Lauren Daigle',
    album: 'Look Up Child',
    genre: 'Contemporary Christian',
    duration: 234,
    audioUrl: 'https://example.com/songs/rescue.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b2736055c47958328a8c30f89e88',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Control',
    artist: 'Zach Williams',
    album: 'Rescue Story',
    genre: 'Contemporary Christian',
    duration: 245,
    audioUrl: 'https://example.com/songs/control.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273ec3db5825471d1c0f8bc3619',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'Chain Breaker',
    artist: 'Zach Williams',
    album: 'Chain Breaker',
    genre: 'Contemporary Christian',
    duration: 234,
    audioUrl: 'https://example.com/songs/chain-breaker.mp3',
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273ec3db5825471d1c0f8bc3619',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  },
  {
    title: 'The Blessing',
    artist: 'Zach Williams, Dolly Parton',
    album: 'The Blessing',
    genre: 'Contemporary Christian',
    duration: 245,
    audioUrl: 'https://example.com/songs/the-blessing-zach.mp3',
    coverImage: 'https://images.squarespace-cdn.com/content/v1/62da96301d540a1760e3bc61/b74e3817-831d-4d59-889f-397661adf04b/ZW_Spring23_1920x1080.jpg',
    playCount: Math.floor(Math.random() * 10000),
    likes: [],
    lastPlayed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    isSingle: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Song.deleteMany({});
    console.log('Cleared existing songs');

    // Insert Christian songs
    const createdSongs = await Song.insertMany(christianSongs);
    console.log(`Inserted ${createdSongs.length} Christian songs`);

    // Update trend scores for all songs
    for (const song of createdSongs) {
      await song.updateTrendScore();
    }
    console.log('Updated trend scores for all songs');

    console.log('Christian music database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();