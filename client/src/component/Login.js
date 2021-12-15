import React from "react";
import styled from "styled-components";
import { MdOutlineLogin } from "react-icons/md";
import { MdLogout} from "react-icons/md";
import { Home } from "./Home";
import {LoginButton} from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";


export const Login = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

  return (
      <>
    <Wrapper>
        <DivImg>
    <Img src="/Logo.png" />
   
       
   
    </DivImg>
    <User>
    {isAuthenticated && (
        <Welcome style={{"margin-right":"100px"}}>
          Welcome {user.name} 
        </Welcome>
      )}
      </User> 
      {!isAuthenticated &&(<LoginButton/>)}
    {isAuthenticated && (<LogoutButton/>)}
        
    </Wrapper>
    {!isAuthenticated && <Home/>}
    </>
  );
};
/*
-{user.email}
 <Title>Log in</Title>
      <Icon>         
        <MdOutlineLogin size={32}/>
      </Icon>
      */
const Wrapper = styled.div`

 position:fixed;
 z-index:1;
 top:0;


 height: 80px;
 width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #2F4050;
  border-bottom: 2px solid black;
`;

const User = styled.div `

font-size: 22px;
margin-right: 1%;
color:white;
`;

const Welcome = styled.div `
width: 650px;
display: flex;
flex-direction: row;
justify-content: center;
font-size: 22px;
margin-right: 1%;
color:white;
margin-left:30%;

`;

const Icon = styled.div `
margin-right:5%;
color: white;
`;

const DivImg = styled.div `
//add
position:absolute;
//display: inline-block;

height: 100%;
width: 100%;



`;

const Img = styled.img`

  width: 250px;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 20px;
`;


