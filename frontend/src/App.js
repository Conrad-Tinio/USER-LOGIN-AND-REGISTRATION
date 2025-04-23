// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'

// Remove Homepage import
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import Dashboard from './views/Dashboard'
import Navbar from './views/Navbar'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Switch>
          <PrivateRoute path="/dashboard" exact>
              <Dashboard />
          </PrivateRoute>
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App