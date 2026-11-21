import assert from 'node:assert';
import test from 'node:test';
import { selectBitrateProfile } from '../src/utils/bandwidthAdaptor.ts';

test('selectBitrateProfile: selects 4K on high-speed connection', () => {
  const profile = selectBitrateProfile(25000, 10);
  assert.strictEqual(profile.resolution, '4K');
});

test('selectBitrateProfile: selects 1080p and 720p at standard rates', () => {
  assert.strictEqual(selectBitrateProfile(8000).resolution, '1080p');
  assert.strictEqual(selectBitrateProfile(3000).resolution, '720p');
  assert.strictEqual(selectBitrateProfile(1500).resolution, '480p');
  assert.strictEqual(selectBitrateProfile(300).resolution, '360p');
});

test('selectBitrateProfile: downgrades tier during low buffer health', () => {
  // 6000Kbps usually qualifies for 1080p (min 5000).
  // But with buffer < 3 sec, effective bandwidth is 6000 * 0.6 = 3600 -> drops to 720p.
  const profile = selectBitrateProfile(6000, 2);
  assert.strictEqual(profile.resolution, '720p');
});
