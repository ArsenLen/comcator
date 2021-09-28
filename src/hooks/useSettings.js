import React, { useContext, createContext, useState, useEffect } from 'react'
import ServiceApi from '../services/ServiceApi'

const SettingsContext = createContext()

const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState(null)
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)

  useEffect(() => {
    ServiceApi.getSettings()
      .then(setSettings)
      .finally(() => setIsLoadingSettings(false))
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, isLoadingSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export {
  SettingsContext,
  SettingsContextProvider
}

export default function useSettings () {
  return useContext(SettingsContext)
}
