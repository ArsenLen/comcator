import React, { useContext, createContext, useState, useEffect } from 'react'
import ServiceApi from '../services/ServiceApi'

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    ServiceApi.me()
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserContextProvider
}

export default function useUser () {
  return useContext(UserContext)
}
