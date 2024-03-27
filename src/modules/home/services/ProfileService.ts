import { httpClient } from 'libs/config/httpClient';
import { EditProfileDto } from 'modules/home/utils/types';

class ProfileService {
  private static _instance: ProfileService;

  constructor() {
    if (ProfileService._instance) {
      throw new Error('ProfileService instance does already exist!');
    }
  }

  public static getInstance(): ProfileService {
    if (!ProfileService._instance) {
      ProfileService._instance = new ProfileService();
    }

    return ProfileService._instance;
  }

  public async editProfile(dto: EditProfileDto) {
    const { data } = await httpClient.put('/profile/edit', dto);
    return data;
  }
}

export const profileService = ProfileService.getInstance();
