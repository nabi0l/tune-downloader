const API_BASE_URL = "http://localhost:5000/api";

// Mock data for development
const mockArtist = {
    id: '1',
    name: 'The Weeknd',
    biography: 'Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia, and is often inspired by personal experiences.',
    genres: ['R&B', 'Pop', 'Alternative R&B'],
    activeYears: '2010–present',
    website: 'https://www.theweeknd.com',
    image: 'https://i.scdn.co/image/ab6761610000e5eb0bae7cfd3b32b10154e0b8b3',
    socials: {
        facebook: 'https://www.facebook.com/theweeknd',
        twitter: 'https://twitter.com/theweeknd',
        instagram: 'https://www.instagram.com/theweeknd',
        youtube: 'https://www.youtube.com/theweeknd',
        spotify: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ',
        soundcloud: 'https://soundcloud.com/theweeknd'
    }
};

const mockTopTracks = [
    { id: '1', name: 'Blinding Lights', duration: '3:20', plays: '3.2B' },
    { id: '2', name: 'Save Your Tears', duration: '3:35', plays: '2.8B' },
    { id: '3', name: 'Starboy', duration: '3:50', plays: '2.9B' },
    { id: '4', name: 'Die For You', duration: '4:20', plays: '2.1B' },
    { id: '5', name: 'The Hills', duration: '3:41', plays: '2.7B' }
];

const mockAlbums = [
    { id: 'a1', title: 'After Hours', year: 2020, image: 'https://i.scdn.co/image/ab67616d00001e02c3b822b0f1b1e4a9e49e8c66', type: 'Album' },
    { id: 'a2', title: 'Dawn FM', year: 2022, image: 'https://i.scdn.co/image/ab67616d00001e02f7db43292a6a99b3b5a9c1a0', type: 'Album' },
    { id: 'a3', title: 'Starboy', year: 2016, image: 'https://i.scdn.co/image/ab67616d00001e02d5f4afc5dff43aef4b7e9e0f', type: 'Album' },
    { id: 'a4', title: 'Beauty Behind the Madness', year: 2015, image: 'https://i.scdn.co/image/ab67616d00001e02a3a2ea6f02d6f3f4dc11b6b3', type: 'Album' },
    { id: 's1', title: 'Save Your Tears', year: 2020, image: 'https://i.scdn.co/image/ab67616d00001e02c3b822b0f1b1e4a9e49e8c66', type: 'Single' },
    { id: 's2', title: 'Blinding Lights', year: 2019, image: 'https://i.scdn.co/image/ab67616d00001e02c3b822b0f1b1e4a9e49e8c66', type: 'Single' }
];

const mockSimilarArtists = [
    { id: '2', name: 'Bruno Mars', image: 'https://i.scdn.co/image/ab6761610000e5eb2e8f00c6c1f66a2f9c447202', genres: ['Pop', 'R&B', 'Funk'] },
    { id: '3', name: 'Drake', image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9', genres: ['Hip-Hop', 'Rap', 'R&B'] },
    { id: '4', name: 'Post Malone', image: 'https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2d3ca4', genres: ['Hip-Hop', 'Pop', 'Rap'] },
    { id: '5', name: 'Daft Punk', image: 'https://i.scdn.co/image/ab6761610000e5eb0b9d5388ac5fea467d9db660', genres: ['Electronic', 'House', 'Disco'] },
    { id: '6', name: 'Khalid', image: 'https://i.scdn.co/image/ab6761610000e5eb5f4b8de8c395362c4c2a11d4', genres: ['R&B', 'Pop', 'Soul'] },
    { id: '7', name: 'Ariana Grande', image: 'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc161db4c0ecae96', genres: ['Pop', 'R&B'] }
];

const mockEvents = [
    { id: 'e1', venue: { name: 'SoFi Stadium', city: 'Inglewood', country: 'USA' }, date: '2023-09-02T20:00:00', ticketUrl: '#' },
    { id: 'e2', venue: { name: 'MetLife Stadium', city: 'East Rutherford', country: 'USA' }, date: '2023-09-09T20:00:00', ticketUrl: '#' },
    { id: 'e3', venue: { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA' }, date: '2023-09-16T20:00:00', ticketUrl: '#' }
];

const mockMerchandise = [
    { id: 'm1', name: 'After Hours T-Shirt', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3', isNew: true },
    { id: 'm2', name: 'Dawn FM Hoodie', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3', isOnSale: true },
    { id: 'm3', name: 'Starboy Vinyl', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1598387992975-9d17fcc08fdb?ixlib=rb-4.0.3' },
    { id: 'm4', name: 'The Weeknd Hat', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3' }
];

// Mock songs for development
const mockSongs = [
    { id: 's1', title: 'Way Maker', duration: '5:06', album: 'Way Maker', year: 2019 },
    { id: 's2', title: 'I Know Who I Am', duration: '4:12', album: 'Way Maker', year: 2019 },
    { id: 's3', title: 'Great Are You Lord', duration: '4:45', album: 'Way Maker', year: 2019 },
    { id: 's4', title: 'The Name of Jesus', duration: '5:00', album: 'Way Maker', year: 2019 },
];

// Helper function to simulate API delay
const simulateApiCall = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), 300);
    });
};

export const fetchArtistDetails = async (artistId) => {
    if (!artistId) return simulateApiCall(mockArtist);
    
    try {
        // First get the basic artist data
        const artistResponse = await fetch(`${API_BASE_URL}/artists/${artistId}`);
        
        if (artistResponse.status === 404) {
            console.warn(`Artist with ID ${artistId} not found`);
            // Return mock data or null depending on your needs
            return mockArtist;
        }
        
        if (!artistResponse.ok) {
            throw new Error(`HTTP error! status: ${artistResponse.status}`);
        }
        
        const artistData = await artistResponse.json();
        
        // Only try to fetch Spotify data if the artist has a spotifyId
        if (artistData.spotifyId) {
            try {
                const spotifyResponse = await fetch(`${API_BASE_URL}/artists/${artistId}/spotify`);
                if (spotifyResponse.ok) {
                    const spotifyData = await spotifyResponse.json();
                    return { ...artistData, spotify: spotifyData };
                }
                console.warn('Spotify data not available for artist:', artistId);
            } catch (spotifyError) {
                console.warn('Could not fetch Spotify data:', spotifyError);
            }
        } else {
            console.warn('No Spotify ID found for artist:', artistId);
        }
        
        return artistData;
        
    } catch (error) {
        console.error('Error fetching artist details:', error);
        // Return mock data as fallback
        return mockArtist;
    }
};

export const fetchTopTracks = async (artistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/top-tracks`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.tracks || [];
    } catch {
        console.warn('Using mock data for top tracks');
        return mockTopTracks;
    }
};

export const fetchAlbums = async (artistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/albums`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.albums || [];
    } catch {
        console.warn('Using mock data for albums');
        return mockAlbums;
    }
};

export const fetchSimilarArtists = async (artistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/similar`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.artists || [];
    } catch {
        console.warn('Using mock data for similar artists');
        return mockSimilarArtists;
    }
};

export const fetchUpcomingEvents = async (artistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/events`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.events || [];
    } catch {
        console.warn('Using mock data for upcoming events');
        return mockEvents;
    }
};

export const fetchMerchandise = async (artistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/merchandise`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.merchandise || [];
    } catch {
        console.warn('Using mock data for merchandise');
        return mockMerchandise;
    }
};

// Fetch all artists from the backend
export const fetchArtists = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch artists:', error);
        return [];
    }
};

export const fetchAllAlbums = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/albums`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Failed to fetch albums:', error);
        return [];
    }
};

// Fetch songs for a given artist
export const fetchSongs = async (artistId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists/${artistId}/songs`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.songs || [];
    } catch {
        console.warn('Using mock data for songs');
        return mockSongs;
    }
};
