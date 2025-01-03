/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInterceptorOptions, AxiosStatic } from 'axios'
import { AuthModel, BackOfficeAuthenticatedUserDto, IdentityUser } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'irancard-panel-auth'
const USER_LOCAL_STORAGE_KEY = 'irancard-panel-user'
const getAuth = (): AuthModel | undefined => {
  //console.log('getAuth');

  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)

  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  //console.log('setAuth');

  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  //console.log('removeAuth');

  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const getUser = (): IdentityUser | undefined => {
  //console.log('getUser');

  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: IdentityUser = JSON.parse(lsValue) as IdentityUser
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('USER LOCAL STORAGE PARSE ERROR', error)
  }
}

const setUser = (auth: IdentityUser) => {
  //console.log('setUser');

  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('USER LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeUser = () => {
  //console.log('removeUser');

  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('USER LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: AxiosStatic) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config) => {
      config.baseURL = import.meta.env.VITE_APP_API_URL;

      const auth = getAuth()
      console.log('setupAxios auth > ', auth);
      
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`
      }

      return config
    },
    (err: any) => {
      // console.log('err > ', err);

      Promise.reject(err)
    }
  )
  axios.interceptors.response.use(
    function (response: any) {
      console.log('response > ', response);
      
      return response;
    },
    function (error) {
      console.log('error > ', error);

      if (!!error && !!error.response && error.response.status === 401 && !error.response.config.url.includes('Auth/Login')) {
        localStorage.clear();
        setTimeout(() => {
          window.location.reload()
        }, 300);
      }
            
      return Promise.reject(error?.response?.data);
    }
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY, getUser, setUser, removeUser, USER_LOCAL_STORAGE_KEY }
