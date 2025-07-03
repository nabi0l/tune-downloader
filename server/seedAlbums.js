const mongoose = require('mongoose');
const Album = require('./models/Album');
const dotenv = require('dotenv');
const SpotifyService = require('./services/spotifyService');

dotenv.config();

// Christian artists and their albums to search for
const christianArtistsAndAlbums = [
  // Existing entries
  { artist: 'Hillsong Worship', album: 'Awake' },
  { artist: 'Chris Tomlin', album: 'After All These Years' },
  { artist: 'Lauren Daigle', album: 'Look Up Child' },
  { artist: 'Elevation Worship', album: 'Graves Into Gardens' },
  { artist: 'Bethel Music', album: 'Victory' },
  { artist: 'for KING & COUNTRY', album: 'Burn the Ships' },
  { artist: 'Phil Wickham', album: 'Living Hope' },
  { artist: 'Maverick City Music', album: 'Maverick City Vol. 3 Part 1' },
  { artist: 'Zach Williams', album: 'Chain Breaker' },
  { artist: 'Sinach', album: 'Way Maker' },
  { artist: 'Phil Wickham', album: 'Hymns of Heaven' },
  { artist: 'Tauren Wells', album: 'Citizen of Heaven' },
  { artist: 'We The Kingdom', album: 'Holy Water' },
  { artist: 'Kari Jobe', album: 'The Blessing' },
  { artist: 'MercyMe', album: 'Lifer' },
  { artist: 'Casting Crowns', album: 'Only Jesus' },
  { artist: 'TobyMac', album: 'The Elements' },
  { artist: 'Mandisa', album: 'Out of the Dark' },
  { artist: 'Matthew West', album: 'All In' },
  { artist: 'Jeremy Camp', album: 'The Answer' },
  
  // New additions - Worship
  { artist: 'Passion', album: 'Burn Bright' },
  { artist: 'Hillsong UNITED', album: 'Are We There Yet?' },
  { artist: 'Bethel Music', album: 'Homecoming' },
  { artist: 'Upper Room', album: 'Land of the Living' },
  { artist: 'Housefires', album: 'How To Start A Housefire' },
  
  // New additions - Gospel
  { artist: 'Kirk Franklin', album: 'LONG LIVE LOVE' },
  { artist: 'Tasha Cobbs Leonard', album: 'Hymns' },
  { artist: 'Travis Greene', album: 'Oil + Water' },
  { artist: 'Jonathan McReynolds', album: 'My Truth' },
  { artist: 'CeCe Winans', album: 'Believe For It' },
  
  // New additions - Hymns
  { artist: 'Keith & Kristyn Getty', album: 'Sing! Psalms' },
  { artist: "Sandra McCracken', album: 'God's Highway" },
  { artist: 'Fernando Ortega', album: 'The Shadow of Your Wings: Hymns and Sacred Songs' },
  { artist: 'Indelible Grace', album: 'Joy Beyond the Sorrow' },
  { artist: 'Page CXVI', album: 'Hymns IV' },
  
  // New additions - Popular/Contemporary
  { artist: 'Brandon Lake', album: 'House of Miracles' },
  { artist: 'Pat Barrett', album: 'Act Justly, Love Mercy, Walk Humbly' },
  { artist: 'Cory Asbury', album: 'To Love a Fool' },
  { artist: 'Steffany Gretzinger', album: 'Forever Amen' },
  { artist: 'Brooke Ligertwood', album: 'SEVEN' },
  
  // New additions - New Releases (2023-2024)
  { artist: 'Elevation Worship', album: 'Can You Imagine?' },
  { artist: 'Maverick City Music', album: 'The Maverick Way' },
  { artist: 'Hillsong Worship', album: 'These Same Skies' },
  { artist: 'Phil Wickham', album: 'I Believe' },
  { artist: 'for KING & COUNTRY', album: 'What Are We Waiting For?' }
];
// Fallback data in case Spotify API fails
const fallbackAlbums = [
  // Worship
  {
    title: 'Awake',
    artist: 'Hillsong Worship',
    releaseDate: new Date('2019-07-12'),
    genre: ['Worship'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b27379ba024c547dce59f192d3c3',
    price: 12.99,
    tracks: [
      { title: 'Awake My Soul', duration: 317, trackNumber: 1 },
      { title: 'King of Kings', duration: 287, trackNumber: 2 },
      { title: 'Good Grace', duration: 312, trackNumber: 3 }
    ],
    label: 'Hillsong Music',
    totalDuration: 3600,
    popularity: 92,
    isFeatured: true,
    categories: ['Worship'],
  },
  // Gospel (also new release)
  {
    title: 'Gospel Revival',
    artist: 'Joyful Voices',
    releaseDate: new Date(), // today, so it's a new release
    genre: ['Gospel'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://example.com/gospel-revival.jpg',
    price: 12.99,
    tracks: [
      { title: 'Sing Hallelujah', duration: 200, trackNumber: 1 },
      { title: 'Praise Him', duration: 180, trackNumber: 2 }
    ],
    label: 'Gospel Roots',
    totalDuration: 380,
    popularity: 80,
    isFeatured: true,
    categories: ['Gospel'],
  },
  // Hymn
  {
    title: 'Classic Hymns Vol. 1',
    artist: 'Faith Choir',
    releaseDate: new Date('2022-03-15'),
    genre: ['Hymn'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273classichymnsvol1',
    price: 9.99,
    tracks: [
      { title: 'Amazing Grace', duration: 180, trackNumber: 1 },
      { title: 'How Great Thou Art', duration: 200, trackNumber: 2 }
    ],
    label: 'Hymns Forever',
    totalDuration: 380,
    popularity: 70,
    isFeatured: false,
    categories: ['Hymn'],
  },
  // New Release (not gospel)
  {
    title: 'Fresh Worship 2024',
    artist: 'Modern Worship Collective',
    releaseDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // 1 month ago
    genre: ['Worship'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273freshworship2024',
    price: 11.99,
    tracks: [
      { title: 'Rise Up', duration: 210, trackNumber: 1 },
      { title: 'Shine', duration: 200, trackNumber: 2 }
    ],
    label: 'Worship Now',
    totalDuration: 410,
    popularity: 80,
    isFeatured: false,
    categories: ['Worship'],
  },
  // Popular (high popularity)
  {
    title: 'Look Up Child',
    artist: 'Lauren Daigle',
    releaseDate: new Date('2018-09-07'),
    genre: ['Contemporary Christian', 'Gospel'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273f450251e05b9ab74d11d9e53',
    price: 13.99,
    tracks: [
      { title: 'Still Rolling Stones', duration: 240, trackNumber: 1 },
      { title: 'Rescue', duration: 234, trackNumber: 2 },
      { title: 'You Say', duration: 257, trackNumber: 3 }
    ],
    label: 'Centricity Music',
    totalDuration: 4200,
    popularity: 95,
    isFeatured: true,
    categories: ['Contemporary', 'Gospel'],
  },
  // Hymns (future date for new release)
  {
    title: 'Hymns of Heaven',
    artist: 'Phil Wickham',
    releaseDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month in future
    genre: ['Hymn'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273philwickhamhymnsofheaven',
    price: 10.99,
    tracks: [
      { title: 'Hymns of Heaven', duration: 220, trackNumber: 1 },
      { title: 'Hymns of Heaven', duration: 220, trackNumber: 2 }
    ],
    label: 'Phil Wickham',
    totalDuration: 440,
    popularity: 70,
    isFeatured: false,
    categories: ['Hymn'],
  },
  {
    title: 'Gospel Power',
    artist: 'Voices of Joy',
    releaseDate: new Date('2023-11-10'),
    genre: ['Gospel'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273gospelpower',
    price: 10.99,
    tracks: [
      { title: 'He Reigns', duration: 220, trackNumber: 1 },
      { title: 'Glory', duration: 210, trackNumber: 2 }
    ],
    label: 'Gospel Roots',
    totalDuration: 430,
    popularity: 75,
    isFeatured: false,
    categories: ['Gospel'],
  },
  
  // New additions - Worship
  {
    title: 'Burn Bright',
    artist: 'Passion',
    releaseDate: new Date('2022-02-25'),
    genre: ['Worship', 'Contemporary Christian'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273passionburnbright',
    price: 12.99,
    tracks: [
      { title: 'Burn Bright', duration: 310, trackNumber: 1 },
      { title: 'All About You', duration: 290, trackNumber: 2 },
      { title: 'I Speak Jesus', duration: 320, trackNumber: 3 }
    ],
    label: 'Sixstepsrecords',
    totalDuration: 3500,
    popularity: 88,
    isFeatured: true,
    categories: ['Worship', 'Popular'],
  },
  {
    title: 'Are We There Yet?',
    artist: 'Hillsong UNITED',
    releaseDate: new Date('2023-07-14'),
    genre: ['Worship'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273hillsongunitedarewethereyet',
    price: 13.99,
    tracks: [
      { title: 'Are We There Yet?', duration: 240, trackNumber: 1 },
      { title: 'Know You Will', duration: 230, trackNumber: 2 }
    ],
    label: 'Hillsong Music',
    totalDuration: 2500,
    popularity: 85,
    isFeatured: true,
    categories: ['Worship', 'New Releases'],
  },
  
  // New additions - Gospel
  {
    title: 'LONG LIVE LOVE',
    artist: 'Kirk Franklin',
    releaseDate: new Date('2023-09-15'),
    genre: ['Gospel'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273kirkfranklonglivelove',
    price: 11.99,
    tracks: [
      { title: 'All Things', duration: 210, trackNumber: 1 },
      { title: 'Bless Me', duration: 220, trackNumber: 2 }
    ],
    label: 'Fo Yo Soul Entertainment',
    totalDuration: 2400,
    popularity: 90,
    isFeatured: true,
    categories: ['Gospel', 'Popular'],
  },
  {
    title: 'Hymns',
    artist: 'Tasha Cobbs Leonard',
    releaseDate: new Date('2021-03-26'),
    genre: ['Gospel', 'Hymn'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273tashacobbshymns',
    price: 10.99,
    tracks: [
      { title: 'Blessed Assurance', duration: 250, trackNumber: 1 },
      { title: 'Great Is Thy Faithfulness', duration: 260, trackNumber: 2 }
    ],
    label: 'Motown Gospel',
    totalDuration: 2700,
    popularity: 82,
    isFeatured: false,
    categories: ['Gospel', 'Hymn'],
  },
  
  // New additions - Hymns
  {
    title: 'Sing! Psalms',
    artist: 'Keith & Kristyn Getty',
    releaseDate: new Date('2023-05-19'),
    genre: ['Hymn'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273gettypsalms',
    price: 9.99,
    tracks: [
      { title: 'The Lord Is My Shepherd', duration: 180, trackNumber: 1 },
      { title: 'How Sweet the Name of Jesus Sounds', duration: 190, trackNumber: 2 }
    ],
    label: 'Getty Music',
    totalDuration: 2000,
    popularity: 75,
    isFeatured: false,
    categories: ['Hymn'],
  },
  
  // New additions - Popular/Contemporary
  {
    title: 'House of Miracles',
    artist: 'Brandon Lake',
    releaseDate: new Date('2021-06-25'),
    genre: ['Contemporary Christian'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273brandonlakehouseofmiracles',
    price: 12.99,
    tracks: [
      { title: 'Gratitude', duration: 240, trackNumber: 1 },
      { title: 'House of Miracles', duration: 230, trackNumber: 2 }
    ],
    label: 'Bethel Music',
    totalDuration: 2600,
    popularity: 93,
    isFeatured: true,
    categories: ['Popular', 'Contemporary'],
  },
  
  // New additions - New Releases (2023-2024)
  {
    title: 'Can You Imagine?',
    artist: 'Elevation Worship',
    releaseDate: new Date(new Date().setMonth(new Date().getMonth() - 2)), // 2 months ago
    genre: ['Worship'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273elevationworshipcanyouimagine',
    price: 13.99,
    tracks: [
      { title: 'Can You Imagine?', duration: 250, trackNumber: 1 },
      { title: 'Praise', duration: 240, trackNumber: 2 }
    ],
    label: 'Elevation Worship Records',
    totalDuration: 2700,
    popularity: 87,
    isFeatured: true,
    categories: ['New Releases', 'Worship'],
  },
  {
    title: 'The Maverick Way',
    artist: 'Maverick City Music',
    releaseDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // 1 month ago
    genre: ['Worship', 'Gospel'],
    type: 'studio',
    isSingle: false,
    coverImage: 'https://i.scdn.co/image/ab67616d0000b273maverickcitythemaverickway',
    price: 12.99,
    tracks: [
      { title: 'The Maverick Way', duration: 260, trackNumber: 1 },
      { title: 'New Thing', duration: 250, trackNumber: 2 }
    ],
    label: 'Maverick City Music',
    totalDuration: 2800,
    popularity: 89,
    isFeatured: true,
    categories: ['New Releases', 'Worship', 'Gospel'],
  }
];

async function searchAlbumOnSpotify(artistName, albumTitle) {
  try {
    const token = await SpotifyService.getAccessToken();
    const axios = require('axios');
    
    // Search for the album
    const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: `artist:"${artistName}" album:"${albumTitle}"`,
        type: 'album',
        limit: 5
      }
    });

    const albums = searchResponse.data.albums.items;
    
    if (albums.length === 0) {
      console.log(`No album found for ${artistName} - ${albumTitle}`);
      return null;
    }

    // Get the first (most relevant) result
    const album = albums[0];
    
    // Get detailed album information including tracks
    const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${album.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const detailedAlbum = albumResponse.data;
    
    // Transform Spotify data to our format
    let genres = detailedAlbum.genres && detailedAlbum.genres.length > 0 ? detailedAlbum.genres : [];
    // Heuristic: assign genre if missing based on artist or album title
    if (genres.length === 0) {
      const lowerArtist = detailedAlbum.artists[0].name.toLowerCase();
      const lowerTitle = detailedAlbum.name.toLowerCase();
      if (lowerArtist.includes('worship') || lowerTitle.includes('worship')) {
        genres = ['Worship'];
      } else if (lowerArtist.includes('gospel') || lowerTitle.includes('gospel')) {
        genres = ['Gospel'];
      } else if (lowerArtist.includes('hymn') || lowerTitle.includes('hymn')) {
        genres = ['Hymn'];
      } else {
        genres = ['Contemporary Christian'];
      }
    }
    return {
      title: detailedAlbum.name,
      artist: detailedAlbum.artists[0].name,
      releaseDate: new Date(detailedAlbum.release_date),
      genre: genres, // always an array
      type: detailedAlbum.album_type === 'single' ? 'single' : 'studio',
      isSingle: detailedAlbum.album_type === 'single',
      coverImage: detailedAlbum.images[0]?.url || '',
      price: Math.floor(Math.random() * 5) + 9.99, // Random price between 9.99 and 14.99
      tracks: detailedAlbum.tracks.items.map((track, index) => ({
        title: track.name,
        duration: Math.floor(track.duration_ms / 1000),
        trackNumber: index + 1
      })),
      label: detailedAlbum.label || 'Unknown Label',
      totalDuration: Math.floor(detailedAlbum.tracks.items.reduce((total, track) => total + track.duration_ms, 0) / 1000),
      popularity: detailedAlbum.popularity || Math.floor(Math.random() * 20) + 70,
      isFeatured: Math.random() > 0.5, // Randomly feature some albums
      categories: genres, // keep categories in sync with genre
      spotifyId: detailedAlbum.id,
      spotifyUrl: detailedAlbum.external_urls?.spotify || ''
    };
  } catch (error) {
    console.error(`Error searching for album ${artistName} - ${albumTitle}:`, error.message);
    return null;
  }
}

async function seedAlbumsFromSpotify() {
  try {
    console.log('Starting to fetch albums from Spotify...');
    
    const fetchedAlbums = [];
    
    for (const { artist, album } of christianArtistsAndAlbums) {
      console.log(`Searching for: ${artist} - ${album}`);
      
      const albumData = await searchAlbumOnSpotify(artist, album);
      
      if (albumData) {
        fetchedAlbums.push(albumData);
        console.log(`✓ Found: ${albumData.title} by ${albumData.artist}`);
      } else {
        console.log(`✗ Not found: ${album} by ${artist}`);
      }
      
      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return fetchedAlbums;
  } catch (error) {
    console.error('Error fetching albums from Spotify:', error);
    return [];
  }
}

async function seedAlbums() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Album.deleteMany({});
    console.log('Cleared existing albums');

    // Try to fetch albums from Spotify first
    let albumsToInsert = await seedAlbumsFromSpotify();
    
    // If Spotify fetch failed or returned no results, use fallback data
    if (albumsToInsert.length === 0) {
      console.log('No albums fetched from Spotify, using fallback data...');
      albumsToInsert = fallbackAlbums;
    } else {
      console.log(`Successfully fetched ${albumsToInsert.length} albums from Spotify`);
    }

    // Insert albums
    const createdAlbums = await Album.insertMany(albumsToInsert);
    console.log(`Inserted ${createdAlbums.length} albums`);

    // Log some details about the inserted albums
    createdAlbums.forEach(album => {
      console.log(`- ${album.title} by ${album.artist} (${album.tracks.length} tracks, ${album.coverImage ? 'Has image' : 'No image'})`);
    });

    console.log('Albums database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding albums database:', error);
    process.exit(1);
  }
}

// Only run this directly if this file is executed directly (not required)
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => seedAlbums())
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
}

module.exports = seedAlbums; 