import { KEY_STORAGE } from '@/constants/key-storage';

export const clearLocalUserData = () => {
  if (typeof window != 'undefined') {
    window.localStorage.removeItem(KEY_STORAGE.USER_DATA);
    window.localStorage.removeItem(KEY_STORAGE.ACCESS_TOKEN);
  }
};
