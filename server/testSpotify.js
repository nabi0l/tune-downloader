const spotifyService = require('./services/spotifyService');
require('dotenv').config();

async function testSpotifyIntegration() {
  try {
    console.log('🧪 Testing Spotify API Integration...\n');

    // Check if credentials are available
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
      console.error('❌ Spotify credentials not found in environment variables');
      console.log('Please add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to your .env file');
      return;
    }

    console.log('✅ Spotify credentials found');

    // Test 1: Get access token
    console.log('\n1️⃣ Testing access token...');
    const token = await spotifyService.getAccessToken();
    console.log('✅ Access token obtained successfully');

    // Test 2: Search for an artist
    console.log('\n2️⃣ Testing artist search...');
    const artist = await spotifyService.searchArtist('Chris Tomlin');
    if (artist) {
      console.log(`✅ Found artist: ${artist.name}`);
      console.log(`   - Followers: ${artist.followers?.total?.toLocaleString() || 0}`);
      console.log(`   - Popularity: ${artist.popularity}/100`);
      console.log(`   - Genres: ${artist.genres?.join(', ') || 'None'}`);
      console.log(`   - Image: ${artist.images?.[0]?.url ? 'Available' : 'Not available'}`);
    } else {
      console.log('❌ Artist not found');
    }

    // Test 3: Get artist details
    if (artist) {
      console.log('\n3️⃣ Testing artist details...');
      const details = await spotifyService.getArtistDetails(artist.id);
      if (details) {
        console.log(`✅ Artist details retrieved for: ${details.name}`);
      } else {
        console.log('❌ Failed to get artist details');
      }

      // Test 4: Get top tracks
      console.log('\n4️⃣ Testing top tracks...');
      const topTracks = await spotifyService.getArtistTopTracks(artist.id);
      if (topTracks && topTracks.length > 0) {
        console.log(`✅ Found ${topTracks.length} top tracks`);
        console.log('   Top tracks:');
        topTracks.slice(0, 3).forEach((track, index) => {
          console.log(`   ${index + 1}. ${track.name} (${track.album.name})`);
        });
      } else {
        console.log('❌ No top tracks found');
      }

      // Test 5: Get albums
      console.log('\n5️⃣ Testing albums...');
      const albums = await spotifyService.getArtistAlbums(artist.id);
      if (albums && albums.length > 0) {
        console.log(`✅ Found ${albums.length} albums`);
        console.log('   Recent albums:');
        albums.slice(0, 3).forEach((album, index) => {
          console.log(`   ${index + 1}. ${album.name} (${album.album_type})`);
        });
      } else {
        console.log('❌ No albums found');
      }

      // Test 6: Get related artists
      console.log('\n6️⃣ Testing related artists...');
      const relatedArtists = await spotifyService.getRelatedArtists(artist.id);
      if (relatedArtists && relatedArtists.length > 0) {
        console.log(`✅ Found ${relatedArtists.length} related artists`);
        console.log('   Related artists:');
        relatedArtists.slice(0, 3).forEach((related, index) => {
          console.log(`   ${index + 1}. ${related.name}`);
        });
      } else {
        console.log('❌ No related artists found');
      }
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run seed:artists:spotify');
    console.log('2. Check your database for the seeded artists');
    console.log('3. Start your frontend to see the real artist images!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your Spotify credentials in .env file');
    console.log('2. Make sure you have internet connection');
    console.log('3. Verify your Spotify app is properly configured');
  }
}

// Run the test
testSpotifyIntegration(); 