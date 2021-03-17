import React, { useContext, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import AppShell from "./AppShell";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import FourOFour from "./pages/FourOFour";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Account = lazy(() => import("./pages/Account"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Settings = lazy(() => import("./pages/Settings"));
const Users = lazy(() => import("./pages/Users"));

const AuthRoute = ({ children, ...rest }) => {
  const authState = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        authState.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
        <AuthRoute path="/inventory">
          <Inventory />
        </AuthRoute>
        <AuthRoute path="/account">
          <Account />
        </AuthRoute>
        <AuthRoute path="/settings">
          <Settings />
        </AuthRoute>
        <AuthRoute path="/users">
          <Users />
        </AuthRoute>
        <Route path="*">
          <FourOFour />
        </Route>
      </Switch>
    </Suspense>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
