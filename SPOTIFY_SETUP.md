# Spotify API Setup Guide

This guide will help you set up Spotify API integration to fetch real artist data.

## Step 1: Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (or create one if you don't have it)
3. Click "Create App"
4. Fill in the app details:
   - **App name**: `Christian Music Platform` (or any name you prefer)
   - **App description**: `A platform for Christian music artists`
   - **Website**: `http://localhost:3000` (or your domain)
   - **Redirect URI**: `http://localhost:3000/callback` (we won't use this for now)
   - **API/SDKs**: Select "Web API"
5. Click "Save"
6. You'll see your **Client ID** and **Client Secret**

## Step 2: Add Credentials to Environment Variables

1. Create or edit the `.env` file in your server directory
2. Add these lines:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

Replace `your_client_id_here` and `your_client_secret_here` with the actual values from your Spotify app.

## Step 3: Run the Spotify Artist Seeding Script

```bash
cd server
npm run seed:artists:spotify
```

This script will:
- Connect to Spotify API
- Search for Christian artists
- Fetch their real data including:
  - Profile images
  - Follower counts
  - Popularity scores
  - Top tracks
  - Albums
  - Related artists
- Save all data to your MongoDB database

## Step 4: Verify the Results

After running the script, you should see:
- Real artist profile images from Spotify
- Accurate follower counts
- Popularity scores
- Top tracks and albums

## Troubleshooting

### "Spotify credentials not found" error
- Make sure you've added the credentials to your `.env` file
- Restart your server after adding the credentials

### "Rate limit exceeded" error
- The script includes delays to avoid rate limiting
- If you still get this error, wait a few minutes and try again

### "Artist not found" messages
- Some artists might not be found on Spotify
- The script will continue with other artists
- You can manually add missing artists later

## What You Get

With this setup, your platform will have:
- ✅ Real artist profile images from Spotify
- ✅ Accurate follower counts and popularity data
- ✅ Top tracks for each artist
- ✅ Album information
- ✅ Related artist suggestions
- ✅ Professional-looking artist profiles

## Next Steps

After running the script, your artist images should display properly throughout your application. The images will be served directly from Spotify's CDN, so they'll load quickly and look professional.

If you want to add more artists, you can:
1. Edit the `christianArtists` array in `seedArtistsFromSpotify.js`
2. Run the script again (it will clear existing data first)
3. Or create a separate script to add individual artists 