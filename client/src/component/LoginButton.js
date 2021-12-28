import React from "react";
import styled from "styled-components";
import { MdOutlineLogin } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (<>
  <Wrapper onClick={() => loginWithRedirect()}>
  <Title>Log in</Title>
  <Icon >         
    <MdOutlineLogin size={32}/>
  </Icon>
  </Wrapper>
  </>
  );
};
//<button onClick={() => loginWithRedirect()}>Log In</button>
export default LoginButton;

const Wrapper = styled.div` 
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
width: 70px;
font-size: 22px;
margin-right: 5%;
color:white;
`;

const Icon = styled.div `
margin-right:10%;
color: white;
`;
