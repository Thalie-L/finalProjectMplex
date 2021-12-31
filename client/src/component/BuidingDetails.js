import React, { useState } from "react";
import { useParams } from "react-router";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Lodging } from "./Lodging";
import { MessageBox } from "./MessageBox";

export const BuildingDetails = () => {
  const [lodgings, setLodgings] = useState(null);
  const param = useParams();
  const _id = param.buildingId;
  const [message, setMessage] = useState("");

  const history = useHistory();

  // this is to fetch a specific item with the id in the url
  React.useEffect(() => {
    console.log("getting building details");
    fetch(`/api/building/lodgings?idBuilding=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLodgings(data.data);
      });
  }, []);

  return (
    <Wrapper>
       <Header>
      {message && <MessageBox message={message} setMessage={setMessage}/>}
        
      </Header>
      <Main>
     
      {lodgings &&
        lodgings.map((lodging) => {
         
          return ( <DivLodgings><Lodging lodging={lodging} setMessage={setMessage} /></DivLodgings>);
        })}
            
            </Main>
           
    </Wrapper>
  );
};

const Wrapper = styled.div` 
  margin-top: 80px;
  margin-left: 250px;
  width: 85%;
  height: 850px;  
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Header = styled.div`
  background-color: #006bb6;
  display: flex;  
  align-items: center;
  height: 5%;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap; 
  width: 100%;
  height: 700px;
  padding-top: 100px; 
`;

const DivLodgings = styled.div`  
  width: 33%;
  height: 600px;
`;
