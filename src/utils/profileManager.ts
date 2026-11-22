/**
 * Netflix Profile Manager
 * Handles user profiles, Kids mode restrictions, language preferences, and profile switching.
 */

export interface UserProfile {
  id: string;
  name: string;
  isKids: boolean;
  language: string;
  avatarUrl: string;
}

export class ProfileManager {
  private profiles: UserProfile[];
  private activeProfileId: string;

  constructor(initialProfiles: UserProfile[] = []) {
    this.profiles = [...initialProfiles];
    if (this.profiles.length === 0) {
      const defaultProf = {
        id: 'p-default',
        name: 'Default User',
        isKids: false,
        language: 'en',
        avatarUrl: '/avatars/default.png',
      };
      this.profiles.push(defaultProf);
      this.activeProfileId = defaultProf.id;
    } else {
      this.activeProfileId = this.profiles[0].id;
    }
  }

  addProfile(name: string, isKids: boolean = false, language: string = 'en'): UserProfile | null {
    if (!name || !name.trim()) return null;
    if (this.profiles.length >= 5) return null; // Netflix max 5 profiles limit

    const newProfile: UserProfile = {
      id: `p-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      isKids,
      language,
      avatarUrl: isKids ? '/avatars/kids.png' : '/avatars/adult.png',
    };
    this.profiles.push(newProfile);
    return newProfile;
  }

  switchProfile(profileId: string): boolean {
    const found = this.profiles.find((p) => p.id === profileId);
    if (!found) return false;
    this.activeProfileId = found.id;
    return true;
  }

  getActiveProfile(): UserProfile {
    return this.profiles.find((p) => p.id === this.activeProfileId) || this.profiles[0];
  }

  listProfiles(): UserProfile[] {
    return [...this.profiles];
  }
}
