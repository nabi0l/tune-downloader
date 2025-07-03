# Trending Songs Feature

This feature provides trending songs based on various factors like play count, recent plays, and likes.

## API Endpoints

### Get Trending Songs
```
GET /api/songs/trending
```

**Query Parameters:**
- `limit`: Number of songs to return (default: 20)
- `offset`: Number of songs to skip (default: 0)

**Example Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "60d5ec9f4b3f8b3f3c3e3e3e",
      "title": "Blinding Lights",
      "artist": "The Weeknd",
      "album": "After Hours",
      "genre": "Pop",
      "duration": 203,
      "playCount": 8542,
      "trendScore": 0.92,
      "coverImage": "https://example.com/covers/after-hours.jpg",
      "lastPlayed": "2023-06-23T09:34:50.123Z"
    },
    ...
  ]
}
```

### Record a Song Play
```
POST /api/songs/:id/play
```

**Headers:**
- `Authorization: Bearer <jwt_token>`

**Response:**
```json
{
  "success": true,
  "message": "Play recorded",
  "playCount": 8543
}
```

## How Trending Works

The trending algorithm considers:
1. **Recency of plays** - More recent plays have higher weight
2. **Total play count** - More popular songs get a boost
3. **Likes** - Songs with more likes trend higher

The trend score is calculated using the formula:
```
trendScore = (recencyWeight * 0.4) + (popularityWeight * 0.4) + (likeWeight * 0.2)
```

## Setup

1. Make sure MongoDB is running
2. Install dependencies:
   ```
   npm install
   ```
3. Seed the database with sample songs:
   ```
   node seedSongs.js
   ```
4. Start the server:
   ```
   node server.js
   ```

## Testing

You can test the trending endpoint using curl or Postman:

```bash
# Get trending songs
curl http://localhost:5000/api/songs/trending

# Record a play (requires authentication)
curl -X POST http://localhost:5000/api/songs/60d5ec9f4b3f8b3f3c3e3e3e/play \
  -H "Authorization: Bearer your_jwt_token"
```
