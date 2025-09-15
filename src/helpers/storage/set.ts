import { KEY_STORAGE } from '@/constants/key-storage';

export const setLocalUserData = (accessToken: string) => {
  if (typeof window != 'undefined') {
    window.localStorage.setItem(KEY_STORAGE.USER_DATA, '');
    window.localStorage.setItem(KEY_STORAGE.ACCESS_TOKEN, accessToken);
  }
};
