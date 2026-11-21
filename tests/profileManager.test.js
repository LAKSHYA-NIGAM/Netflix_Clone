import assert from 'node:assert';
import test from 'node:test';
import { ProfileManager } from '../src/utils/profileManager.ts';

test('ProfileManager: initializes with default and allows adding profiles', () => {
  const pm = new ProfileManager();
  assert.strictEqual(pm.listProfiles().length, 1);
  assert.strictEqual(pm.getActiveProfile().name, 'Default User');

  const kids = pm.addProfile('Junior', true);
  assert.ok(kids);
  assert.strictEqual(kids.isKids, true);
  assert.strictEqual(kids.avatarUrl, '/avatars/kids.png');
  assert.strictEqual(pm.listProfiles().length, 2);
});

test('ProfileManager: switches active profile', () => {
  const pm = new ProfileManager();
  const adult = pm.addProfile('Work Profile', false);
  assert.ok(adult);

  const switched = pm.switchProfile(adult.id);
  assert.strictEqual(switched, true);
  assert.strictEqual(pm.getActiveProfile().name, 'Work Profile');
});

test('ProfileManager: enforces 5 profiles maximum limit', () => {
  const pm = new ProfileManager();
  pm.addProfile('P2');
  pm.addProfile('P3');
  pm.addProfile('P4');
  pm.addProfile('P5');
  assert.strictEqual(pm.listProfiles().length, 5);

  const overflow = pm.addProfile('P6');
  assert.strictEqual(overflow, null);
  assert.strictEqual(pm.listProfiles().length, 5);
});
