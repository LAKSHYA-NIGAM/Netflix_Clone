/**
 * Adaptive Bitrate Streaming (ABR) Ladder Selector
 * Dynamically selects video resolution (4K, 1080p, 720p, 480p, 360p) based on network bandwidth and buffer health.
 */

export interface BitrateProfile {
  resolution: string;
  minBandwidthKbps: number;
  bitrateKbps: number;
}

export const BITRATE_LADDER: BitrateProfile[] = [
  { resolution: '4K', minBandwidthKbps: 20000, bitrateKbps: 15000 },
  { resolution: '1080p', minBandwidthKbps: 5000, bitrateKbps: 4000 },
  { resolution: '720p', minBandwidthKbps: 2500, bitrateKbps: 2000 },
  { resolution: '480p', minBandwidthKbps: 1000, bitrateKbps: 800 },
  { resolution: '360p', minBandwidthKbps: 0, bitrateKbps: 400 },
];

export function selectBitrateProfile(bandwidthKbps: number, bufferSec: number = 10): BitrateProfile {
  const bandwidth = Math.max(0, Number(bandwidthKbps) || 0);

  // If buffer is critically low (< 3 seconds), downgrade by 1 tier to prevent buffering stutter
  const penalty = bufferSec < 3 ? 0.6 : 1.0;
  const effectiveBandwidth = bandwidth * penalty;

  for (const profile of BITRATE_LADDER) {
    if (effectiveBandwidth >= profile.minBandwidthKbps) {
      return profile;
    }
  }

  return BITRATE_LADDER[BITRATE_LADDER.length - 1];
}
