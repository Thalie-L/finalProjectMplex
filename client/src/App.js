import React,{useState} from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "./component/GlobalStyles";
import { Sidebar } from "./component/Sidebar";
import { Login } from "./component/Login";
import { Buildings } from "./component/Buildings";

import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "./component/CurrentUserContext";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { currentUser, setCurrentUser,role,setRole } = React.useContext(CurrentUserContext);
  

  React.useEffect(() => {
    console.log("getting data user");
    if(user)
    {
    fetch(`/api/user?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCurrentUser(data.data);
        setRole(data.data.role);
       
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
       
        {role==="Admin" &&  <Sidebar /> }
        <Sidebar />
      
        <Switch>
          <Route exact path="/"></Route>
          <Route path="/buildings">
            <Buildings />
          </Route>
          <Route path="/lodgings/:lodgingId"></Route>
          <Route path="/tenants"></Route>
          <Route path="/tenants/:tenantId"></Route>
          <Route path="/payments"></Route>
          <Route path="/leases"></Route>
          <Route path="/requests"></Route>
          <Route path="/screenerror"></Route>
          <Route path="/:profileId"></Route>
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
