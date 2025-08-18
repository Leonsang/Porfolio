// Simple audio configuration validator for public/sounds and AudioPlayer playlist
// Usage: npm run check-audio
// Requirements: Node 18+

import { promises as fs } from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const soundsDir = path.join(repoRoot, 'public', 'sounds');
const audioPlayerPath = path.join(repoRoot, 'src', 'components', 'AudioPlayer.ts');

async function main() {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1) Check sounds directory exists and list files
  let soundFiles: string[] = [];
  try {
    const entries = await fs.readdir(soundsDir);
    soundFiles = entries.filter((f) => /\.(mp3|wav|ogg|m4a)$/i.test(f));
    if (soundFiles.length === 0) {
      warnings.push('No audio files found in public/sounds/.');
    }
  } catch (e) {
    errors.push(`Sounds directory not found: ${soundsDir}`);
  }

  // 2) Parse AudioPlayer.ts for playlist URLs
  let audioPlayerSrc = '';
  try {
    audioPlayerSrc = await fs.readFile(audioPlayerPath, 'utf-8');
  } catch (e) {
    errors.push(`Cannot read AudioPlayer.ts at ${audioPlayerPath}`);
  }

  const urlRegex = /url:\s*'([^']+)'/g;
  const playlistUrls: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(audioPlayerSrc)) !== null) {
    playlistUrls.push(match[1]);
  }

  // 3) Validate each playlist URL maps to an existing file under public
  const missing: string[] = [];
  for (const u of playlistUrls) {
    const normalized = u.startsWith('/') ? u.slice(1) : u; // remove leading slash
    const full = path.join(repoRoot, 'public', normalized);
    try {
      await fs.access(full);
    } catch {
      missing.push(u);
    }
  }

  // 4) Report
  console.log('Audio check report');
  console.log('------------------');
  console.log(`Found ${soundFiles.length} audio file(s) in public/sounds`);
  if (soundFiles.length) {
    console.log('Files:', soundFiles.join(', '));
  }
  console.log(`Playlist URLs in AudioPlayer.ts: ${playlistUrls.length}`);
  if (playlistUrls.length) {
    console.log('URLs:', playlistUrls.join(', '));
  }

  if (missing.length) {
    console.log('');
    console.log('Missing files referenced by playlist:');
    for (const m of missing) console.log(' - ' + m);
    errors.push(`${missing.length} playlist URL(s) do not map to existing files under public/`);
  }

  // Exit code
  if (errors.length) {
    console.error('\nErrors:');
    for (const e of errors) console.error(' - ' + e);
    process.exit(1);
  } else {
    if (warnings.length) {
      console.warn('\nWarnings:');
      for (const w of warnings) console.warn(' - ' + w);
    }
    console.log('\nOK: Audio configuration looks good.');
  }
}

main().catch((e) => {
  console.error('Unexpected failure:', e);
  process.exit(1);
});

