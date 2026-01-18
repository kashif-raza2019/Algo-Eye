/**
 * Sound generation utility using Web Audio API
 * This generates sounds programmatically if audio files are not available
 */

export const createAudioContext = () => {
  if (typeof window !== 'undefined' && window.AudioContext) {
    return new (window.AudioContext || window.webkitAudioContext)();
  }
  return null;
};

export const playPingTone = (audioContext) => {
  if (!audioContext) return;
  
  try {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Quick high-pitched beep
    oscillator.frequency.setValueAtTime(1000, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  } catch (err) {
    console.log('Could not play ping tone:', err.message);
  }
};

export const playSwapTone = (audioContext) => {
  if (!audioContext) return;
  
  try {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Sweeping whoosh sound
    oscillator.frequency.setValueAtTime(400, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.15);
    
    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    
    oscillator.start(now);
    oscillator.stop(now + 0.15);
  } catch (err) {
    console.log('Could not play swap tone:', err.message);
  }
};
