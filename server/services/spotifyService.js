require('dotenv').config();
const axios = require('axios');
const fetch = require('node-fetch');

class SpotifyService {
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting Spotify access token:', error);
      throw new Error('Failed to authenticate with Spotify');
    }
  }

  async searchArtist(artistName) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          q: artistName,
          type: 'artist',
          limit: 1
        }
      });

      const artists = response.data.artists.items;
      return artists.length > 0 ? artists[0] : null;
    } catch (error) {
      console.error(`Error searching for artist ${artistName}:`, error);
      return null;
    }
  }

  async getArtistDetails(spotifyId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(`https://api.spotify.com/v1/artists/${spotifyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.error(`Error getting artist details for ${spotifyId}:`, error);
      return null;
    }
  }

  async getArtistTopTracks(spotifyId, country = 'US') {
    try {
      const token = await this.getAccessToken();
      
      console.log(`Fetching top tracks for artist ${spotifyId} in market ${country}`);
      const response = await axios.get(`https://api.spotify.com/v1/artists/${spotifyId}/top-tracks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          market: country
        }
      });

      // Log track preview URLs for debugging
      console.log('Spotify API returned tracks:');
      response.data.tracks.forEach((track, index) => {
        console.log(`${index + 1}. ${track.name} - Preview URL: ${track.preview_url || 'None'}`);
      });

      return response.data.tracks;
    } catch (error) {
      console.error(`Error getting top tracks for ${spotifyId}:`, error);
      return [];
    }
  }

  async getArtistAlbums(spotifyId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(`https://api.spotify.com/v1/artists/${spotifyId}/albums`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          include_groups: 'album,single',
          limit: 20
        }
      });

      return response.data.items;
    } catch (error) {
      console.error(`Error getting albums for ${spotifyId}:`, error);
      return [];
    }
  }

  async getRelatedArtists(spotifyId) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(`https://api.spotify.com/v1/artists/${spotifyId}/related-artists`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return response.data.artists;
    } catch (error) {
      console.error(`Error getting related artists for ${spotifyId}:`, error);
      return [];
    }
  }

  async getAlbumTracks(albumId) {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          limit: 50
        }
      });
      return response.data.items;
    } catch (error) {
      console.error(`Error getting tracks for album ${albumId}:`, error);
      return [];
    }
  }

  // Helper method to transform Spotify artist data to our format
  transformSpotifyArtist(spotifyArtist) {
    return {
      name: spotifyArtist.name,
      bio: spotifyArtist.bio || '',
      genre: spotifyArtist.genres || [],
      origin: spotifyArtist.origin || '',
      yearsActive: spotifyArtist.yearsActive || '',
      website: spotifyArtist.external_urls?.spotify || '',
      imageUrl: spotifyArtist.images?.[0]?.url || '',
      spotifyId: spotifyArtist.id,
      popularity: spotifyArtist.popularity || 0,
      followers: spotifyArtist.followers?.total || 0,
      socialMedia: {
        spotify: spotifyArtist.external_urls?.spotify || ''
      }
    };
  }

  // Fetch genres (categories) from Spotify
  async getSpotifyGenres() {
    try {
      const token = await this.getAccessToken();
      const response = await axios.get('https://api.spotify.com/v1/browse/categories?limit=50', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Transform to frontend format
      return response.data.categories.items.map(cat => ({
        id: cat.id,
        name: cat.name,
        image: cat.icons[0]?.url || '',
        description: cat.name // Spotify categories don't have descriptions
      }));
    } catch (error) {
      console.error('Error fetching Spotify genres:', error);
      throw new Error('Failed to fetch genres from Spotify');
    }
  }

  // Fetch playlists for a genre (category)
  async getPlaylistsForGenre(genreId) {
    const token = await this.getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=10`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.playlists.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      image: playlist.images[0]?.url || '',
      description: playlist.description,
      url: playlist.external_urls.spotify
    }));
  }

  // Fetch top artists for a genre (by name)
  async getArtistsForGenre(genreName) {
    const token = await this.getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: `genre:"${genreName}"`,
        type: 'artist',
        limit: 10
      }
    });
    return response.data.artists.items.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url || '',
      followers: artist.followers.total,
      url: artist.external_urls.spotify
    }));
  }

  // Fetch top albums for a genre (by name)
  async getAlbumsForGenre(genreName) {
    const token = await this.getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: `genre:"${genreName}"`,
        type: 'album',
        limit: 10
      }
    });
    return response.data.albums.items.map(album => ({
      id: album.id,
      name: album.name,
      image: album.images[0]?.url || '',
      artist: album.artists[0]?.name || '',
      url: album.external_urls.spotify
    }));
  }
}

module.exports = new SpotifyService(); 