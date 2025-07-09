const fs = require('fs');
const path = require('path');

// Artists from seedSongs.js (artists with singles)
const artistsWithSingles = [
  'Hillsong Worship',
  'Hillsong UNITED', 
  'Chris Tomlin',
  'Matt Redman',
  'Cory Asbury',
  'Sinach',
  'Pat Barrett',
  'Elevation Worship',
  'Bethel Music',
  'All Sons & Daughters',
  'Phil Wickham',
  'Keith & Kristyn Getty',
  'Mosaic MSC',
  'Vertical Worship',
  'New Life Worship',
  'Here Be Lions',
  'Cody Carnes',
  'Charity Gayle',
  'Kristene DiMarco',
  'Hope Darst',
  'We The Kingdom',
  'for KING & COUNTRY',
  'Lauren Daigle',
  'Zach Williams',
  'Upper Room'
];

// Artists from seedAlbums.js (artists with albums only)
const artistsWithAlbumsOnly = [
  'Tauren Wells',
  'MercyMe',
  'Casting Crowns',
  'TobyMac',
  'Mandisa',
  'Matthew West',
  'Jeremy Camp',
  'Brandon Lake',
  'Steffany Gretzinger',
  'Brooke Ligertwood',
  'Passion',
  'Housefires',
  'Kirk Franklin',
  'Tasha Cobbs Leonard',
  'Travis Greene',
  'Jonathan McReynolds',
  'CeCe Winans',
  'Fernando Ortega',
  'Indelible Grace',
  'Page CXVI',
  'Kari Jobe',
  'Joyful Voices',
  'Faith Choir',
  'Modern Worship Collective',
  'Voices of Joy'
];

// All artists combined
const allArtists = [...artistsWithSingles, ...artistsWithAlbumsOnly];

// Function to convert artist name to folder name
function artistToFolderName(artistName) {
  return artistName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/&/g, 'and'); // Replace & with 'and'
}

// Function to create folder structure
function createFolderStructure() {
  const baseDir = path.join(__dirname, 'music-client', 'src', 'assets', 'audio', 'artists');
  
  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Create folders for all artists
  allArtists.forEach(artist => {
    const artistFolder = path.join(baseDir, artistToFolderName(artist));
    
    // Create artist folder
    if (!fs.existsSync(artistFolder)) {
      fs.mkdirSync(artistFolder, { recursive: true });
    }

    // Create subfolders
    const subfolders = ['albums', 'singles', 'previews', 'full-songs', 'downloads'];
    subfolders.forEach(subfolder => {
      const subfolderPath = path.join(artistFolder, subfolder);
      if (!fs.existsSync(subfolderPath)) {
        fs.mkdirSync(subfolderPath, { recursive: true });
      }
    });

    console.log(`✅ Created folder structure for: ${artist}`);
  });
}

// Function to move existing audio files
function moveExistingFiles() {
  const sourceDir = path.join(__dirname, 'music-client', 'src', 'assets', 'audio');
  const targetDir = path.join(__dirname, 'music-client', 'src', 'assets', 'audio', 'artists');

  // Mapping of file patterns to artists
  const fileToArtistMap = {
    'SINACH WAY MAKER': 'sinach',
    'Reckless Love': 'cory-asbury',
    'We The Kingdom - Holy Water': 'we-the-kingdom',
    'for KING + COUNTRY - God Only Knows': 'for-king-and-country',
    'Zach Williams - Chain Breaker': 'zach-williams',
    'Lauren Daigle - Rescue': 'lauren-daigle',
    'Lauren Daigle - You Say': 'lauren-daigle',
    'Surrounded ( Fight My Battles )': 'upper-room',
    'Pat Barrett - Build My Life': 'pat-barrett',
    'Chris Tomlin - How Great Is Our God': 'chris-tomlin',
    'Phil Wickham - House Of The Lord': 'phil-wickham',
    'Phil Wickham - Battle Belongs': 'phil-wickham',
    'Phil Wickham - Living Hope': 'phil-wickham',
    'Promises': 'maverick-city-music',
    'RATTLE!': 'elevation-worship',
    'Jireh': 'elevation-worship',
    'Same God': 'elevation-worship',
    'Graves Into Gardens': 'elevation-worship',
    'God of Revival': 'bethel-music',
    'No Longer Slaves': 'bethel-music',
    'Goodness Of God': 'bethel-music',
    'Oceans (Where Feet May Fail)': 'hillsong-united',
    'What A Beautiful Name': 'hillsong-worship'
  };

  // Read all files in source directory
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    if (file.endsWith('.mp3')) {
      let targetArtist = null;
      
      // Find matching artist
      for (const [pattern, artist] of Object.entries(fileToArtistMap)) {
        if (file.includes(pattern)) {
          targetArtist = artist;
          break;
        }
      }

      if (targetArtist) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, targetArtist, 'full-songs', file);
        
        // Create target directory if it doesn't exist
        const targetDirPath = path.dirname(targetPath);
        if (!fs.existsSync(targetDirPath)) {
          fs.mkdirSync(targetDirPath, { recursive: true });
        }

        // Move file
        try {
          fs.renameSync(sourcePath, targetPath);
          console.log(`✅ Moved: ${file} → ${targetArtist}/full-songs/`);
        } catch (error) {
          console.log(`❌ Error moving ${file}: ${error.message}`);
        }
      } else {
        console.log(`⚠️  No artist match found for: ${file}`);
      }
    }
  });
}

// Function to create README files
function createReadmeFiles() {
  const baseDir = path.join(__dirname, 'music-client', 'src', 'assets', 'audio', 'artists');
  
  allArtists.forEach(artist => {
    const artistFolder = path.join(baseDir, artistToFolderName(artist));
    const readmePath = path.join(artistFolder, 'README.md');
    
    const readmeContent = `# ${artist}

## Folder Structure

- \`albums/\` - Full album tracks
- \`singles/\` - Individual song releases
- \`previews/\` - 30-second preview clips
- \`full-songs/\` - Complete song files
- \`downloads/\` - Purchased/downloadable files

## File Naming Convention

- Album tracks: \`{track-number}-{track-title}.mp3\`
- Singles: \`{song-title}.mp3\`
- Previews: \`{song-title}-preview.mp3\`

## Usage

Audio files in this folder are used by the music platform for:
- Preview playback (30-second clips)
- Full song streaming (after purchase)
- Download functionality (after purchase)

## Database Reference

Artist ID: ${artist.replace(/\s+/g, '_').toLowerCase()}
`;

    fs.writeFileSync(readmePath, readmeContent);
    console.log(`📝 Created README for: ${artist}`);
  });
}

// Function to create index file
function createIndexFile() {
  const baseDir = path.join(__dirname, 'music-client', 'src', 'assets', 'audio');
  const indexPath = path.join(baseDir, 'index.js');
  
  const indexContent = `// Audio file organization index
// Generated automatically - do not edit manually

export const audioArtists = {
${allArtists.map(artist => `  "${artist}": "${artistToFolderName(artist)}"`).join(',\n')}
};

export const getAudioPath = (artist, songType = 'full-songs', fileName) => {
  const artistFolder = audioArtists[artist];
  if (!artistFolder) {
    console.warn(\`Artist not found: \${artist}\`);
    return null;
  }
  return \`/audio/artists/\${artistFolder}/\${songType}/\${fileName}\`;
};

export const getArtistAudioFolder = (artist) => {
  const artistFolder = audioArtists[artist];
  return artistFolder ? \`/audio/artists/\${artistFolder}\` : null;
};
`;

  fs.writeFileSync(indexPath, indexContent);
  console.log('📝 Created audio index file');
}

// Main execution
console.log('🎵 Starting audio file organization...\n');

try {
  // Step 1: Create folder structure
  console.log('📁 Creating folder structure...');
  createFolderStructure();
  console.log('');

  // Step 2: Move existing files
  console.log('🔄 Moving existing audio files...');
  moveExistingFiles();
  console.log('');

  // Step 3: Create README files
  console.log('📝 Creating README files...');
  createReadmeFiles();
  console.log('');

  // Step 4: Create index file
  console.log('📄 Creating index file...');
  createIndexFile();
  console.log('');

  console.log('✅ Audio file organization complete!');
  console.log('\n📊 Summary:');
  console.log(`- ${allArtists.length} artists organized`);
  console.log(`- Folder structure created`);
  console.log(`- Existing files moved`);
  console.log(`- Documentation added`);

} catch (error) {
  console.error('❌ Error during organization:', error);
} 