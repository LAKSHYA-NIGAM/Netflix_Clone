/**
 * Video Player Playback State Manager
 * Tracks playback timestamps, resume thresholds, and playback rates.
 */

export interface PlaybackState {
  movieId: string;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isPaused: boolean;
  updatedAt: number;
}

export class PlayerStateManager {
  static readonly ALLOWED_RATES = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  /**
   * Calculates watch completion percentage.
   */
  static getCompletionPercentage(currentTime: number, duration: number): number {
    if (duration <= 0) return 0;
    const pct = (currentTime / duration) * 100;
    return Math.min(100, Math.max(0, Math.round(pct * 10) / 10));
  }

  /**
   * Determines if a movie qualifies for the "Continue Watching" shelf.
   * Typically between 3% (avoiding accidental clicks) and 92% (excluding credits).
   */
  static shouldShowInContinueWatching(currentTime: number, duration: number): boolean {
    const pct = this.getCompletionPercentage(currentTime, duration);
    return pct >= 3 && pct <= 92;
  }

  /**
   * Validates and sets playback rate.
   */
  static sanitizePlaybackRate(rate: number): number {
    if (this.ALLOWED_RATES.includes(rate)) {
      return rate;
    }
    return 1.0;
  }

  /**
   * Formats seconds into HH:MM:SS or MM:SS display.
   */
  static formatTime(seconds: number): string {
    const totalSec = Math.max(0, Math.floor(seconds));
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    const pad = (n: number) => String(n).padStart(2, '0');

    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  }
}
