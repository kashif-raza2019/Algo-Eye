# Sound Files Instructions

To add sound effects to the Algorithm Visualizer, place the following audio files in this directory:

## Required Files

### 1. ping.mp3
- **Purpose**: Played when traversing or searching through array elements
- **Duration**: Recommended 100-200ms
- **Type**: Short beep or ping sound
- **Format**: MP3 audio file
- **Volume Level**: Should be around -10dB to -15dB

**Example sounds that work well:**
- Simple sine wave beep
- Soft chime sound
- Electronic ping
- Game-like coin sound (softer version)

### 2. swap.mp3
- **Purpose**: Played when swapping two elements during sorting
- **Duration**: Recommended 150-300ms
- **Type**: Slightly more prominent sound than ping
- **Format**: MP3 audio file
- **Volume Level**: Should be around -8dB to -12dB

**Example sounds that work well:**
- Whoosh or swish sound
- Soft metallic clang
- Electronic swap sound
- Game-like power-up sound

## How to Add Sound Files

1. Create or download the audio files as MP3 format
2. Place them in this `/public/sounds/` directory
3. Ensure filenames are exactly: `ping.mp3` and `swap.mp3`
4. Test the visualizer - sounds should play automatically

## Recommended Audio Specifications

- **Format**: MP3 (most compatible)
- **Sample Rate**: 44100 Hz or higher
- **Bitrate**: 128 kbps or higher
- **Channels**: Mono or Stereo
- **Compression**: Compressed for web delivery

## Alternative Sources

You can find royalty-free sound effects at:
- **Freesound.org** - Free community sound effects
- **Zapsplat.com** - Free sound effects library
- **Pixabay.com** - Free music and sound effects
- **OpenGameArt.org** - Game assets including sounds

## Testing

Once you add the audio files:
1. Start the visualizer
2. Click the "Run Algorithm" button
3. You should hear:
   - **Ping sounds** for each comparison/traversal
   - **Swap sounds** when elements are swapped
4. Use the **Sound ON/OFF** button to toggle audio

## Browser Audio Limitations

- Some browsers may block audio playback until user interaction occurs
- Audio must be played within the same origin (HTTPS or localhost)
- Volume is set to 30% by default to avoid being too loud
- Failed audio playback is silently handled to not break the visualizer

## Customizing Sound Volume

To adjust the volume in the code, edit `/src/App.js`:
- Find `pingAudioRef.current.volume = 0.3;`
- Change `0.3` to your desired level (0.0 = silent, 1.0 = maximum)

## Notes

- The visualizer will work perfectly fine without these sound files
- If sound files are not found, the app will continue to function with just visual feedback
- All audio errors are caught and logged for debugging
