import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PlayerStateManager } from '../src/utils/playerState.ts';

describe('PlayerStateManager Unit Tests', () => {
  describe('getCompletionPercentage', () => {
    test('calculates correct completion percentage', () => {
      assert.equal(PlayerStateManager.getCompletionPercentage(30, 120), 25);
      assert.equal(PlayerStateManager.getCompletionPercentage(60, 60), 100);
      assert.equal(PlayerStateManager.getCompletionPercentage(0, 100), 0);
    });

    test('handles 0 or negative duration safely', () => {
      assert.equal(PlayerStateManager.getCompletionPercentage(50, 0), 0);
      assert.equal(PlayerStateManager.getCompletionPercentage(50, -10), 0);
    });
  });

  describe('shouldShowInContinueWatching', () => {
    test('returns false if watched less than 3% (accidental click)', () => {
      // 2 seconds of 1000s duration = 0.2%
      assert.equal(PlayerStateManager.shouldShowInContinueWatching(2, 1000), false);
    });

    test('returns true for mid-movie watch progress', () => {
      // 500s of 1000s duration = 50%
      assert.equal(PlayerStateManager.shouldShowInContinueWatching(500, 1000), true);
    });

    test('returns false if watched past 92% (credits rolling)', () => {
      // 950s of 1000s duration = 95%
      assert.equal(PlayerStateManager.shouldShowInContinueWatching(950, 1000), false);
    });
  });

  describe('sanitizePlaybackRate', () => {
    test('allows supported playback rates', () => {
      assert.equal(PlayerStateManager.sanitizePlaybackRate(1.5), 1.5);
      assert.equal(PlayerStateManager.sanitizePlaybackRate(2.0), 2.0);
    });

    test('defaults invalid rates to 1.0', () => {
      assert.equal(PlayerStateManager.sanitizePlaybackRate(3.5), 1.0);
      assert.equal(PlayerStateManager.sanitizePlaybackRate(-1), 1.0);
    });
  });

  describe('formatTime', () => {
    test('formats MM:SS for durations under an hour', () => {
      assert.equal(PlayerStateManager.formatTime(65), '01:05');
      assert.equal(PlayerStateManager.formatTime(5), '00:05');
    });

    test('formats HH:MM:SS for durations over an hour', () => {
      assert.equal(PlayerStateManager.formatTime(3665), '01:01:05');
    });
  });
});
