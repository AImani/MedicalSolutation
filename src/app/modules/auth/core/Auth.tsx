/* eslint-disable react-refresh/only-export-components */
import { FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction, useMemo } from 'react'
import { LayoutSplashScreen } from '@/_metronic/layout/core'
import { AuthModel, IdentityUser } from './_models'
import * as authHelper from './AuthHelpers'
import { WithChildren } from '@/_metronic/helpers'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: IdentityUser | undefined
  saveUser(user: IdentityUser | undefined): void
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  saveUser: () => { },
  logout: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>()
  const [currentUser, setCurrentUser] = useState<IdentityUser | undefined>()

  useEffect(() => {
    saveAuth(authHelper.getAuth());
    saveUser(authHelper.getUser());
  }, [])

  const saveAuth = (auth: AuthModel | undefined) => {
    console.log('auth > ', auth);
    
    setAuth(auth)
    if (auth) authHelper.setAuth(auth)
    else authHelper.removeAuth()
  }

  const saveUser = (auth: IdentityUser | undefined) => {
    setCurrentUser(auth)
    if (auth) authHelper.setUser(auth)
    else authHelper.removeUser()
  }

  const logout = () => {
    saveAuth(undefined)
    saveUser(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, saveUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, saveUser } = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {

    // const requestUser = async (apiToken: string) => {
    //   try {
    //     if (!currentUser) {
    //       const { data } = await getUserByToken(apiToken)
    //       if (data)
    //         setCurrentUser(data)
    //     }
    //   } catch (error) {
    //     console.error(error)
    //     if (currentUser)
    //       logout()
    //   } finally {
    //     setShowSplashScreen(false)
    //   }
    // }

    if (auth && auth.api_token) {
      console.log('AuthInit: auth , currentUser > ', auth, currentUser);
    } else {
      console.log('AuthInit: auth , currentUser > ', auth, currentUser);

      // logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
