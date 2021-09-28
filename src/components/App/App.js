import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserContextProvider } from '../../hooks/useUser'
import { SettingsContextProvider } from '../../hooks/useSettings'
import HomePage from '../../pages/HomePage'
import TenderPage from '../../pages/TenderPage'
import RegistrationPage from '../../pages/RegistrationPage'
import CustomPages from '../../pages/CustomPages'
import LoginPage from '../../pages/LoginPage'
import ProfilesPage from '../../pages/ProfilesPage'
import AboutPage from '../../pages/AboutPage'
import ForgotPasswordPage from '../../pages/ForgotPasswordPage'
import MyPage from '../../pages/MyPage'
import MyBidsPage from '../../pages/MyBidsPage'
import MySettingsPage from '../../pages/MySettingsPage'
import LogoutPage from '../../pages/LogoutPage'
import RulesPage from '../../pages/RulesPage'
import NotFoundPage from '../../pages/NotFoundPage'
import PublishedPage from '../../pages/PublishedPage'


export default function App () {
  return (
    <UserContextProvider>
      <SettingsContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/tenders/:id">
              <TenderPage />
            </Route>
            <Route path="/pages/:id">
              <CustomPages />
            </Route>

            <Route path="/registration">
              <RegistrationPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/profiles/:id">
              <ProfilesPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/logout">
              <LogoutPage />
            </Route>
            <Route path="/my">
              <MyPage />
            </Route>
            <Route path="/my/bids">
              <MyBidsPage />
            </Route>
            <Route path="/my/settings/">
              <MySettingsPage />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/published/:id">
              <PublishedPage />
            </Route>
            <Route path="/rules">
              <RulesPage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>

          </Switch>
        </Router>
      </SettingsContextProvider>
    </UserContextProvider>
  )
}
