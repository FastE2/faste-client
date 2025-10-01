import { BASE_URL } from '@/configs/api';
import { getLocalUserData } from '@/helpers/storage/get';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { usePathname, useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/use-auth';
import { createUrlQuery } from './create-query-url';
import { ROUTE_CONFIG } from '@/configs/router';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { clearLocalUserData } from '@/helpers/storage/clear';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { refreshToken } from '@/services/auth';

let _router: any = null;
let _setUser: any = null;
let _pathName: string | null = null;

export const injectAuthDependencies = (
  router: any,
  setUser: any,
  pathName: string,
) => {
  _router = router;
  _setUser = setUser;
  _pathName = pathName;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
});

const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  const decoded = jwtDecode<JwtPayload>(token);
  if (typeof decoded.exp === 'undefined') return true;
  return Date.now() >= decoded.exp * 1000;
};

const handleRedirectLogin = (
  router: AppRouterInstance,
  setUser: (data: { email: string } | null) => void,
  pathName: string,
) => {
  if (pathName !== '/') {
    router.replace(
      ROUTE_CONFIG.LOGIN + '?' + createUrlQuery('returnUrl', pathName),
    );
  } else {
    router.replace('/login');
  }
  setUser(null);
  clearLocalUserData();
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    console.log('OK');
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    const { accessToken } = getLocalUserData();
    // const router = useRouter(); // Retrieve auth token from localStorage
    // const { setUser } = useAuth();
    // const pathName = usePathname();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      if (isTokenExpired(accessToken)) {
        handleRedirectLogin(_router, _setUser, _pathName!);
        console.log('isTokenExpired');
        // try {
        //   const res = await refreshToken();
        //   config.headers.Authorization = `Bearer ${res.accessToken}`;
        // } catch (err) {
        //   console.log('handleRedirectLogin 1');
        //   handleRedirectLogin(_router, _setUser, _pathName!);
        // }
      }
    } else {
      console.log('handleRedirectLogin 2');
      // handleRedirectLogin(_router, _setUser, _pathName!);
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  // async (error: AxiosError & { config?: AxiosRequestConfig }) => {
  //   // const router = useRouter();
  //   // const { setUser } = useAuth();
  //   // const pathName = usePathname();
  //   const originalRequest = error.config;
  //   if (error.response?.status === 401 && !(originalRequest as any)._retry) {
  //     (originalRequest as any)._retry = true;
  //     try {
  //       const res = await refreshToken();
  //       if (originalRequest?.headers) {
  //         originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
  //       }
  //       return axiosInstance(originalRequest!);
  //     } catch (err) {
  //       console.error('Refresh token failed in response', err);
  //       handleRedirectLogin(_router, _setUser, _pathName!);
  //     }
  //   }
  //   return Promise.reject(error);
  // },
);

export default axiosInstance;
