import React from "react";
import styled from "styled-components";
import {FiLogOut} from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const eraseSessionInfo = () =>{
    sessionStorage.setItem('currentUser', "");
  }

 
  return (
    
    <>
    <Container onClick={eraseSessionInfo}>
    <Wrapper onClick={() => logout({ returnTo: window.location.origin })}>
    <Title>Log out</Title>
    <Icon >         
      <FiLogOut size={32}/>
    </Icon>
   
    </Wrapper>
    </Container>
   
    </>
  );
};
/*
 <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>

    */

export default LogoutButton;

const Wrapper = styled.div` 
z-index:4;
 width: 100%;
 display: flex;
 flex-direction: row;
 justify-content: center;
 margin-right:5%;
 &:hover {
    cursor: pointer;
  }
 
`;

const Container = styled.div` 
z-index:4;
 width: 15%;
 display: flex;
 flex-direction: row;
 justify-content: center;
 margin-right:5%;
 &:hover {
    cursor: pointer;
  }
 
`;

const Title = styled.div `
width: 80px;
//height: 20px;
font-size: 22px;
margin-right: 5%;
color:white;

`;

const Icon = styled.div `
margin-right:10%;
color: white;

`;