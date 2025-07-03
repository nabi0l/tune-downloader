const mongoose = require('mongoose');
const Artist = require('./models/Artist');
const spotifyService = require('./services/spotifyService');
require('dotenv').config();

// List of Christian artists to fetch from Spotify
const christianArtists = [
  'Hillsong Worship',
  'Chris Tomlin',
  'Lauren Daigle',
  'Elevation Worship',
  'Bethel Music',
  'for KING & COUNTRY',
  'Phil Wickham',
  'Maverick City Music',
  'Casting Crowns',
  'Tasha Cobbs Leonard',
  'Kirk Franklin',
  'Hillsong UNITED',
  'Kari Jobe',
  'Zach Williams',
  'CeCe Winans',
  'MercyMe',
  'Tauren Wells',
  'Sinach',
  'TobyMac',
  'Matt Maher',
  'Passion',
  'Hillsong Young & Free',
  'Crowder',
  'We The Kingdom',
  'Brandon Lake',
  'Elevation Worship',
  'Maverick City Music',
  'Chandler Moore',
  'Naomi Raine',
  'Dante Bowe',
  'Travis Greene',
  'Kierra Sheard',
  'Tye Tribbett',
  
];

async function fetchArtistFromSpotify(artistName) {
  try {
    console.log(`Searching for: ${artistName}`);
    
    // Search for the artist on Spotify
    const spotifyArtist = await spotifyService.searchArtist(artistName);
    
    if (!spotifyArtist) {
      console.log(`❌ Artist not found: ${artistName}`);
      return null;
    }

    // Get additional details
    const artistDetails = await spotifyService.getArtistDetails(spotifyArtist.id);
    const topTracks = await spotifyService.getArtistTopTracks(spotifyArtist.id);
    const albums = await spotifyService.getArtistAlbums(spotifyArtist.id);
    const relatedArtists = await spotifyService.getRelatedArtists(spotifyArtist.id);

    // Transform the data to our format
    const artistData = {
      name: spotifyArtist.name,
      bio: `Christian artist with ${spotifyArtist.followers?.total?.toLocaleString() || 0} followers on Spotify.`,
      genre: spotifyArtist.genres || [],
      origin: '', // Spotify doesn't provide origin
      yearsActive: '', // Spotify doesn't provide years active
      website: spotifyArtist.external_urls?.spotify || '',
      imageUrl: spotifyArtist.images?.[0]?.url || '',
      spotifyId: spotifyArtist.id,
      popularity: spotifyArtist.popularity || 0,
      followers: spotifyArtist.followers?.total || 0,
      socialMedia: {
        spotify: spotifyArtist.external_urls?.spotify || '',
        instagram: '', // Would need to be manually added
        twitter: '', // Would need to be manually added
        youtube: '', // Would need to be manually added
        facebook: '' // Would need to be manually added
      },
      isFeatured: spotifyArtist.popularity > 70,
      // Additional data from Spotify - ensure these are arrays of objects
      spotifyData: {
        topTracks: topTracks.slice(0, 5).map(track => ({
          name: track.name,
          duration: track.duration_ms,
          album: track.album.name,
          image: track.album.images?.[0]?.url || ''
        })),
        albums: albums.slice(0, 10).map(album => ({
          name: album.name,
          type: album.album_type,
          releaseDate: album.release_date,
          image: album.images?.[0]?.url || ''
        })),
        relatedArtists: relatedArtists.slice(0, 6).map(artist => ({
          name: artist.name,
          image: artist.images?.[0]?.url || '',
          spotifyId: artist.id
        }))
      }
    };

    // Debug: Log the albums data structure
    console.log(`✅ Found: ${spotifyArtist.name} (${spotifyArtist.followers?.total?.toLocaleString() || 0} followers)`);
    console.log(`📊 Albums data type: ${typeof artistData.spotifyData.albums}`);
    console.log(`📊 Albums length: ${artistData.spotifyData.albums.length}`);
    console.log(`📊 First album:`, JSON.stringify(artistData.spotifyData.albums[0], null, 2));
    
    return artistData;

  } catch (error) {
    console.error(`❌ Error fetching ${artistName}:`, error.message);
    return null;
  }
}

async function seedArtistsFromSpotify() {
  try {
    // Check if Spotify credentials are available
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      console.error('❌ Spotify credentials not found in environment variables');
      console.log('Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env file');
      console.log('You can get these from: https://developer.spotify.com/dashboard');
      process.exit(1);
    }

    // Connect to MongoDB with fallback URI
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/christian_music_platform';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Artist.deleteMany({});
    console.log('🗑️  Cleared existing artists');

    const successfulArtists = [];
    const failedArtists = [];

    // Fetch artists from Spotify
    for (const artistName of christianArtists) {
      const artistData = await fetchArtistFromSpotify(artistName);
      
      if (artistData) {
        try {
          // Create a new Artist instance to ensure proper schema validation
          const artist = new Artist(artistData);
          
          // Validate the document before saving
          const validationError = artist.validateSync();
          if (validationError) {
            console.error(`❌ Validation error for ${artistName}:`, validationError.message);
            failedArtists.push(artistName);
            continue;
          }
          
          const createdArtist = await artist.save();
          successfulArtists.push(createdArtist);
          console.log(`💾 Saved: ${artistData.name}`);
        } catch (error) {
          console.error(`❌ Error saving ${artistName}:`, error.message);
          failedArtists.push(artistName);
        }
      } else {
        failedArtists.push(artistName);
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n📊 Summary:');
    console.log(`✅ Successfully fetched and saved: ${successfulArtists.length} artists`);
    console.log(`❌ Failed to fetch: ${failedArtists.length} artists`);

    if (failedArtists.length > 0) {
      console.log('\n❌ Failed artists:');
      failedArtists.forEach(artist => console.log(`   - ${artist}`));
    }

    if (successfulArtists.length > 0) {
      console.log('\n✅ Successfully saved artists:');
      successfulArtists.forEach(artist => {
        console.log(`   - ${artist.name} (${artist.followers?.toLocaleString() || 0} followers)`);
      });
    }

    console.log('\n🎉 Spotify artist seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding artists from Spotify:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedArtistsFromSpotify(); 