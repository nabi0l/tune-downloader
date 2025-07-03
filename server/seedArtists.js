const mongoose = require('mongoose');
const Artist = require('./models/Artist'); // Assuming you have an Artist model
console.log('Artist model:', Artist);
require('dotenv').config();

const christianArtists = [
  {
    name: 'Hillsong Worship',
    bio: 'Australian worship group from Hillsong Church, known for contemporary worship music.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Sydney, Australia',
    yearsActive: '1983-present',
    members: [
      { name: 'Brooke Ligertwood', role: 'Vocals' },
      { name: 'Ben Fielding', role: 'Vocals, Guitar' }
    ],
    website: 'https://hillsong.com/worship',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460e731eee',
    socialMedia: {
      facebook: 'https://www.facebook.com/hillsongworship',
      instagram: 'https://www.instagram.com/hillsongworship',
      twitter: 'https://twitter.com/hillsongworship',
      youtube: 'https://www.youtube.com/c/HillsongWorship'
    },
    popularity: 95,
    isFeatured: true
  },
  {
    name: 'Chris Tomlin',
    bio: 'American contemporary Christian music singer, songwriter, and worship leader.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Grand Saline, Texas, USA',
    yearsActive: '1995-present',
    website: 'https://www.christomlin.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebdff18efeee3cf9a76b7295ef',
    socialMedia: {
      facebook: 'https://www.facebook.com/christomlin',
      instagram: 'https://www.instagram.com/christomlin',
      twitter: 'https://twitter.com/christomlin',
      youtube: 'https://www.youtube.com/user/christomlinmusic'
    },
    popularity: 90,
    isFeatured: true
  },
  {
    name: 'Lauren Daigle',
    bio: 'Grammy Award-winning contemporary Christian music singer and songwriter.',
    genre: ['Contemporary Christian', 'Gospel'],
    origin: 'Lafayette, Louisiana, USA',
    yearsActive: '2010-present',
    website: 'https://www.laurendaigle.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5dab6c0a9b5d5a0e3b5e5e5e',
    socialMedia: {
      facebook: 'https://www.facebook.com/laurendaigle',
      instagram: 'https://www.instagram.com/lauren_daigle',
      twitter: 'https://twitter.com/lauren_daigle',
      youtube: 'https://www.youtube.com/channel/UCZhNgM_Rl3NULCkgHoi_UZQ'
    },
    popularity: 92,
    isFeatured: true
  },
  {
    name: 'Elevation Worship',
    bio: 'American worship band from Elevation Church in Charlotte, North Carolina.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Charlotte, North Carolina, USA',
    yearsActive: '2007-present',
    members: [
      { name: 'Chris Brown', role: 'Vocals' },
      { name: 'Mack Brock', role: 'Vocals' }
    ],
    website: 'https://www.elevationworship.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb750cf05b8b670b7d2c056822',
    socialMedia: {
      facebook: 'https://www.facebook.com/elevationworship',
      instagram: 'https://www.instagram.com/elevationworship',
      twitter: 'https://twitter.com/elevation_wrshp',
      youtube: 'https://www.youtube.com/c/elevationworship'
    },
    popularity: 88,
    isFeatured: true
  },
  {
    name: 'Bethel Music',
    bio: 'Worship group from Bethel Church in Redding, California.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Redding, California, USA',
    yearsActive: '2001-present',
    members: [
      { name: 'Brian Johnson', role: 'Vocals' },
      { name: 'Jenn Johnson', role: 'Vocals' }
    ],
    website: 'https://bethelmusic.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebf0c4a4f3e3d5e5e5e5e5e5e5',
    socialMedia: {
      facebook: 'https://www.facebook.com/bethelmusic',
      instagram: 'https://www.instagram.com/bethelmusic',
      twitter: 'https://twitter.com/bethelmusic',
      youtube: 'https://www.youtube.com/c/bethelmusic'
    },
    popularity: 85,
    isFeatured: true
  },
  {
    name: 'for KING & COUNTRY',
    bio: 'Australian Christian pop duo composed of brothers Joel and Luke Smallbone.',
    genre: ['Contemporary Christian', 'Pop'],
    origin: 'Sydney, Australia',
    yearsActive: '2007-present',
    members: [
      { name: 'Luke Smallbone', role: 'Vocals' },
      { name: 'Joel Smallbone', role: 'Vocals' }
    ],
    website: 'https://www.forkingandcountry.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb6X2aRjzOX6Riv3KnQrKtA6',
    socialMedia: {
      facebook: 'https://www.facebook.com/forkingandcountry',
      instagram: 'https://www.instagram.com/forkingandcountry',
      twitter: 'https://twitter.com/4kingandcountry',
      youtube: 'https://www.youtube.com/c/forKINGcountry'
    },
    popularity: 87,
    isFeatured: true
  },
  {
    name: 'Phil Wickham',
    bio: 'Contemporary Christian musician and worship leader.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'San Diego, California, USA',
    yearsActive: '2003-present',
    website: 'https://philwickham.com',
    imageUrl: 'https://i.scdn.co/image/ab67616100005174669414d1264e100bb0f513f7',
    socialMedia: {
      facebook: 'https://www.facebook.com/philwickham',
      instagram: 'https://www.instagram.com/philwickham',
      twitter: 'https://twitter.com/philwickham',
      youtube: 'https://www.youtube.com/user/philwickham'
    },
    popularity: 82,
    isFeatured: false
  },
  {
    name: 'Maverick City Music',
    bio: 'Diverse collective of musicians and songwriters creating worship music.',
    genre: ['Worship', 'Gospel'],
    origin: 'Atlanta, Georgia, USA',
    yearsActive: '2018-present',
    members: [
      { name: 'Chandler Moore', role: 'Vocals' },
      { name: 'Naomi Raine', role: 'Vocals' }
    ],
    website: 'https://www.maverickcitymusic.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb58r1rB5t3VF5X6yXPKequ5',
    socialMedia: {
      facebook: 'https://www.facebook.com/maverickcitymusic',
      instagram: 'https://www.instagram.com/maverickcitymusic',
      twitter: 'https://twitter.com/mavericycitymusic',
      youtube: 'https://www.youtube.com/c/maverickcitymusic'
    },
    popularity: 84,
    isFeatured: true
  },
  {
    name: 'Casting Crowns',
    bio: 'Contemporary Christian and Christian rock band.',
    genre: ['Contemporary Christian', 'Christian Rock'],
    origin: 'Daytona Beach, Florida, USA',
    yearsActive: '1999-present',
    members: [
      { name: 'Mark Hall', role: 'Lead vocals' },
      { name: 'Juan DeVevo', role: 'Guitar' }
    ],
    website: 'https://www.castingcrowns.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb6eJqAWJdd8JhAN1pqvH41f',
    socialMedia: {
      facebook: 'https://www.facebook.com/castingcrowns',
      instagram: 'https://www.instagram.com/castingcrowns',
      twitter: 'https://twitter.com/castingcrowns',
      youtube: 'https://www.youtube.com/user/castingcrowns'
    },
    popularity: 83,
    isFeatured: false
  },
  {
    name: 'Tasha Cobbs Leonard',
    bio: 'American gospel singer, songwriter, and worship leader.',
    genre: ['Gospel', 'Worship'],
    origin: 'Jesup, Georgia, USA',
    yearsActive: '2010-present',
    website: 'https://www.tashacobbsleonard.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb7YvEJuoFKTIdEb0K6cyXVB',
    socialMedia: {
      facebook: 'https://www.facebook.com/tashacobbsleonard',
      instagram: 'https://www.instagram.com/tashacobbsleonard',
      twitter: 'https://twitter.com/tashacobbs',
      youtube: 'https://www.youtube.com/c/TashaCobbsLeonard'
    },
    popularity: 80,
    isFeatured: false
  },
  {
    name: 'Kirk Franklin',
    bio: 'American gospel musician, choir director, and author.',
    genre: ['Gospel', 'Urban Contemporary Gospel'],
    origin: 'Fort Worth, Texas, USA',
    yearsActive: '1992-present',
    website: 'https://www.kirkfranklin.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5kvqmWmZtG4u2mqwnyi96T',
    socialMedia: {
       facebook: 'https://www.facebook.com/KirkFranklin',
       instagram: 'https://www.instagram.com/kirkfranklin',
       twitter: 'https://twitter.com/kirkfranklin',
       youtube: 'https://www.youtube.com/user/kirkfranklin'
     },
    popularity: 88,
    isFeatured: true
  },
  {
    name: 'Hillsong UNITED',
    bio: 'Australian worship band from Hillsong Church.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Sydney, Australia',
    yearsActive: '1998-present',
    members: [
      { name: 'Joel Houston', role: 'Vocals' },
      { name: 'Taya Smith', role: 'Vocals' }
    ],
    website: 'https://hillsong.com/united',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5cbpDtfG9RDOe0D9A09v0V',
    socialMedia: {
      facebook: 'https://www.facebook.com/hillsongunited',
      instagram: 'https://www.instagram.com/hillsongunited',
      twitter: 'https://twitter.com/hillsongunited',
      youtube: 'https://www.youtube.com/c/hillsongunited'
    },
    popularity: 89,
    isFeatured: true
  },
  {
    name: 'Kari Jobe',
    bio: 'American contemporary Christian music singer and worship leader.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Waco, Texas, USA',
    yearsActive: '2004-present',
    website: 'https://karijobe.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5XfSDEqxlMg1ht2GryM4bd',
    socialMedia: {
      facebook: 'https://www.facebook.com/officialkarijobe',
      instagram: 'https://www.instagram.com/karijobe',
      twitter: 'https://twitter.com/karijobe',
      youtube: 'https://www.youtube.com/c/karijobe'
    },
    popularity: 81,
    isFeatured: false
  },
  {
    name: 'Zach Williams',
    bio: 'American contemporary Christian music singer and songwriter.',
    genre: ['Contemporary Christian', 'Christian Rock'],
    origin: 'Jonesboro, Arkansas, USA',
    yearsActive: '2016-present',
    website: 'https://www.zachwilliams.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb6g10FMmuvO7QJEoDsv2u5f',
    socialMedia: {
      facebook: 'https://www.facebook.com/zachwilliamsmusic',
      instagram: 'https://www.instagram.com/zachwilliamsmusic',
      twitter: 'https://twitter.com/zachwilliams',
      youtube: 'https://www.youtube.com/c/zachwilliams'
    },
    popularity: 79,
    isFeatured: false
  },
  {
    name: 'CeCe Winans',
    bio: 'American gospel singer and eight-time Grammy Award winner.',
    genre: ['Gospel', 'Contemporary Christian'],
    origin: 'Detroit, Michigan, USA',
    yearsActive: '1982-present',
    website: 'https://www.cecewinans.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb3cnHv9naGNIZrJ6v15et1q',
    socialMedia: {
      facebook: 'https://www.facebook.com/officialcecewinans',
      instagram: 'https://www.instagram.com/cecewinans',
      twitter: 'https://twitter.com/cecewinans',
      youtube: 'https://www.youtube.com/c/cecewinans'
    },
    popularity: 84,
    isFeatured: true
  },
  {
    name: 'MercyMe',
    bio: 'American contemporary Christian music band.',
    genre: ['Contemporary Christian', 'Christian Rock'],
    origin: 'Edmond, Oklahoma, USA',
    yearsActive: '1994-present',
    members: [
      { name: 'Bart Millard', role: 'Lead vocals' },
      { name: 'Barry Graul', role: 'Guitar' }
    ],
    website: 'https://mercyme.org',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb6udimYCoY145iUZJ28pqpO',
    socialMedia: {
      facebook: 'https://www.facebook.com/mercyme',
      instagram: 'https://www.instagram.com/mercyme',
      twitter: 'https://twitter.com/mercyme',
      youtube: 'https://www.youtube.com/c/mercyme'
    },
    popularity: 82,
    isFeatured: false
  },
  {
    name: 'Tauren Wells',
    bio: 'American Christian musician, singer, and songwriter.',
    genre: ['Contemporary Christian', 'Pop'],
    origin: 'Battle Creek, Michigan, USA',
    yearsActive: '2011-present',
    website: 'https://www.taurenwells.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb3jJQSt4hlmOjAsnZa7ZxIR',
    socialMedia: {
      facebook: 'https://www.facebook.com/taurenwellsofficial',
      instagram: 'https://www.instagram.com/taurenwells',
      twitter: 'https://twitter.com/taurenwells',
      youtube: 'https://www.youtube.com/c/taurenwells'
    },
    popularity: 80,
    isFeatured: false
  },
  {
    name: 'Sinach',
    bio: 'Nigerian gospel singer and songwriter known for "Way Maker".',
    genre: ['Gospel', 'Worship'],
    origin: 'Lagos, Nigeria',
    yearsActive: '1990s-present',
    website: 'https://www.sinach.org',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb6hdaqGWBcd1nCNgoW5o7gB',
    socialMedia: {
      facebook: 'https://www.facebook.com/sinach',
      instagram: 'https://www.instagram.com/sinach',
      twitter: 'https://twitter.com/sinach',
      youtube: 'https://www.youtube.com/c/sinach'
    },
    popularity: 83,
    isFeatured: true
  },
  {
    name: 'TobyMac',
    bio: 'American Christian hip hop recording artist, music producer, and songwriter.',
    genre: ['Christian Hip Hop', 'Pop'],
    origin: 'Fairfax, Virginia, USA',
    yearsActive: '1987-present',
    website: 'https://www.tobymac.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5VXUT4Iq3Sv92EjZFCZbGS',
    socialMedia: {
      facebook: 'https://www.facebook.com/tobymac',
      instagram: 'https://www.instagram.com/tobymac',
      twitter: 'https://twitter.com/tobymac',
      youtube: 'https://www.youtube.com/c/tobymac'
    },
    popularity: 85,
    isFeatured: true
  },
  {
    name: 'Matt Maher',
    bio: 'Canadian contemporary Christian music artist and worship leader.',
    genre: ['Worship', 'Contemporary Christian'],
    origin: 'Newfoundland, Canada',
    yearsActive: '2001-present',
    website: 'https://mattmahermusic.com',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb7a2AgdZpTRgoFqPvPcYd5h',
    socialMedia: {
      facebook: 'https://www.facebook.com/mattmahermusic',
      instagram: 'https://www.instagram.com/mattmahermusic',
      twitter: 'https://twitter.com/mattmahermusic',
      youtube: 'https://www.youtube.com/c/mattmahermusic'
    },
    popularity: 78,
    isFeatured: false
  }
];

async function seedArtists() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Artist.deleteMany({});
    console.log('Cleared existing artists');

    // Insert Christian artists
    const createdArtists = await Artist.insertMany(christianArtists);
    console.log(`Inserted ${createdArtists.length} Christian artists`);

    console.log('Christian artists database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding artists database:', error);
    process.exit(1);
  }
}

seedArtists();