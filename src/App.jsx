import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Helmet } from "react-helmet";

// import Users from "./user/Pages/Users";
//import NewPlace from "./places/Pages/NewPlace";
//import UsersPlaces from "./places/Pages/UserPlaces";
//import UpdatePlace from "./places/Pages/UpdatePlace";
//import Auth from "./user/Pages/Auth";
import MainNevigation from "./shared/Components/Nevigation/MainNevigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/Components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/Pages/Users"));
const NewPlace = React.lazy(() => import("./places/Pages/NewPlace"));
const UsersPlaces = React.lazy(() => import("./places/Pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/Pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/Pages/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();
  let route;
  if (token) {
    route = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UsersPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UsersPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <link rel="manifest" href="../public/manifest.json" />
        <link rel="icon" href="../public/direction.png" />
      </Helmet>
      <AuthContext.Provider
        value={{
          isLogin: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <MainNevigation />
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {route}
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
