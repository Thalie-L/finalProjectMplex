import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyles";
import { Sidebar } from "./component/Sidebar";
import { Login } from "./component/Login";
import { Buildings } from "./component/Buildings";

import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "./component/CurrentUserContext";
import { Lodgings } from "./component/Lodgings";
import { Tenants } from "./component/Tenants";
import { TenantDetails } from "./component/TenantDetails";
import { TenantNew } from "./component/TenantNew";
import { TenantLease } from "./component/TenantLease";

import { Profile } from "./component/Profile";
import { Home } from "./component/Home";
import { Payments } from "./component/Payments";
import { Request } from "./component/Request";
import { BuildingDetails } from "./component/BuidingDetails";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { currentUser, setCurrentUser, role, setRole } =
    React.useContext(CurrentUserContext);

  React.useEffect(() => {
    console.log("getting data user");
    if (user) {
      fetch(`/api/user?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setCurrentUser(data.data);
          setRole(data.data.role);
          sessionStorage.setItem('currentUser', data.data._id);
        })
        .catch((err) => {
          console.log("Error Reading data " + err);
          //setError(true);
        });
    }
  }, [user]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Login />
        {isAuthenticated && <Sidebar />}
        {/*<Sidebar />*/}

        <Switch>
          <Route exact path="/"></Route>

          <Route path="/buildings">
            <Buildings />
          </Route>
          <Route path="/building/lodgings/:buildingId">
            <BuildingDetails />
          </Route>

          <Route path="/lodgings/">
            <Lodgings />
          </Route>
          <Route path="/tenants/tenantNew">
            <TenantNew />
          </Route>
          <Route path="/tenant/Lease/:tenantId">
            <TenantLease />
          </Route>
          <Route path="/tenants/:tenantId">
            <TenantDetails />
          </Route>

          <Route path="/tenants">
            <Tenants />
          </Route>
          <Route path="/payments">
            <Payments />
          </Route>
          <Route path="/leases"></Route>
          <Route path="/requests">
            <Request />
          </Route>
          <Route path="/screenerror"></Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

//  <Sidebar /> <h1>New app Mplex</h1>

export default App;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
