import React, { createContext, useState, useCallback, useContext } from 'react'

type Props = {
  store: IStore<string, string | null>;
  children: React.ReactNode;
}

type State = boolean
type Context = {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
} | undefined

const initialState = false
const AuthContext = createContext<Context>(undefined)
const { Provider, Consumer } = AuthContext;

function AuthProvider({ children, store }: Props) {

  const getInitState = useCallback(() => {
    const auth = store.get('isAuth') !== 'true' && false
    return auth && initialState
  }, [store])

  const [isAuth, setAuth] = useState<State>(getInitState())

  const login = useCallback(() => {
    store.set('isAuth', 'true')
    setAuth(true)
  }, [store])

  const logout = useCallback(() => {
    store.set('isAuth', '')
    setAuth(false)
  }, [store])

  return (
    <Provider value={{ isAuth, login, logout }} >
      {children}
    </Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used with AuthProvider')
  }
  return context
}

export { AuthProvider, Consumer as AuthConsumer, useAuth }
