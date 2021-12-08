import React from "react";
import styled from "styled-components";
import { MdOutlineLogin } from "react-icons/md";
import { MdLogout} from "react-icons/md";
import { Home } from "./Home";
import {LoginButton} from "./LoginButton";
import LogoutButton from "./LogoutButton"


export const Login = () => {
  return (
      <>
    <Wrapper>
        <DivImg>
    <Img src="/Logo.png" />
   
       
   
    </DivImg>
    <LoginButton/>
    <LogoutButton/>
         <Title>Log in</Title>
      <Icon>         
        <MdOutlineLogin size={32}/>
      </Icon>
    </Wrapper>
    <Home/>
    </>
  );
};

const Wrapper = styled.div`
 
 height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: #2F4050;
  border-bottom: 2px solid black;
`;

const Title = styled.div `
width: 70px;
font-size: 22px;
margin-right: 1%;
color:white;
`;

const Icon = styled.div `
margin-right:5%;
color: white;
`;

const DivImg = styled.div `
height: 100%;
width: 100%;


`;

const Img = styled.img`
  width: 250px;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 20px;
`;


