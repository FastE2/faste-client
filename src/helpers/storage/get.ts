import { KEY_STORAGE } from '@/constants/key-storage';

export const getLocalUserData = () => {
  if (typeof window != 'undefined') {
    return {
      userData: window.localStorage.getItem(KEY_STORAGE.USER_DATA),
      accessToken: window.localStorage.getItem(KEY_STORAGE.ACCESS_TOKEN),
    };
  }

  return {
    userData: '',
    accessToken: '',
  };
};
