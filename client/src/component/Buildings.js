import React,{useState} from "react";
import styled from "styled-components";


export const Buildings = () => {

    const [option,setOption]= useState("");

 const handleClickAdd = () =>{
     console.log("click add");
     setOption("ADD");
 }



  return <Wrapper>
      <Header>
          <Btn onClick={handleClickAdd}> Add Building</Btn>
          <Btn>Update Building</Btn>
          <Btn>Delete Building</Btn>
      </Header>
      <Main>

      </Main>

  </Wrapper>;
};

const Wrapper = styled.div`

height: 830px;
`;

const Header = styled.div`
background-color: #006bb6;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
height: 5%;
`;

const Btn = styled.button`
background-color:transparent;
color: white;
border:none;
margin-right: 5%;
&:hover {
 cursor:pointer;
}
`;

const Main = styled.div`
height: 99%;
margin-left: 251px;
border: 2px solid purple;
`;