import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const initialStateRequest = {
  _id: "",
  date:"",
  description: "",
  idUser: "",
  idOwner: ""
};

export const Request = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);
  const [requests, setRequests] = useState(null);
  const [option, setOption] = useState("");

  const [formData, setFormData] = useState(initialStateRequest);
  const history = useHistory();

  React.useEffect(() => {
    console.log("getting data request");
    fetch("/api/requests/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRequests(data.data);
        setOption("View");
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
        //setError(true);
      });
  }, []);

  const handleClickView = () => {
    console.log("click add");
    setOption("View");
  };

  const handleClickAdd = () => {
    console.log("click add");
    setOption("Add");
   
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    
  };

  const handleClick = () => {
      let d = new Date();
    formData._id = uuidv4();
    formData.date = d.getFullYear().toString()+"-"+
    d.getMonth()+"-"+d.getDay().toString();
    formData.idOwner = currentUser.idOwner;
      fetch("/api/request", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const { status, data, message } = json;
          console.log(status, data, message);
        });
  };

  return (
    <>
      <Wrapper>
        <Header>
            <DivBtn>
          {role==="Admin" && <Btn onClick={handleClickView}> View Requests</Btn>}
          {role==="Admin" && <Btn onClick={handleClickAdd}>Add Requests</Btn>}
          </DivBtn>
        </Header>
        <Main>

        <DivRequests>
        {requests && role==="Admin" &&
            option === "View" &&
            <TabHeader>
                <Info>#</Info>
                <Info>Date</Info>
                <Info> Requests</Info>
                <Info>Name</Info>
                <Info>Telephone</Info>
                </TabHeader>
  }
          {requests && role==="Admin" &&
            option === "View" &&
            requests.map((request,index) => {
              return (
                <>
              
                  <Container>
                     <Info> {index+1}</Info>
                      <Info>{request.date}</Info>
                      <Info>{request.description}</Info>
                      <Info>{request.user.firstName}</Info>
                      <Info>{request.user.telephone}</Info>
                      
                      </Container>
                      
                </>
              );
            })}
            </DivRequests>

          {option === "Add" && role==="Admin" &&(
            <>
                <Container>
                <Span>Request:</Span>
                <Column>
                <Textarea
                  name="description"
                  onChange={(ev) =>
                    handleChange(ev.target.value, "description")
                  }
                />
                 <Button onClick={handleClick}>Confirm</Button>
                </Column>
               
              </Container>
            </>
            
          )}
        </Main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 830px;
  margin-left: 250px;
  margin-top: 80px;
  display: absolute; 

  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Header = styled.div`
  background-color: #006bb6;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 5%;
  position: fixed;
  width:100%;
`;

const DivBtn = styled.div`  
  display: flex;
  flex-direction: row;  
  width: 40%;     
`;

const Btn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  margin-right: 110px;
  &:hover {
    cursor: pointer;
  }
`;

const Main = styled.div`

  display: flex;
  flex-direction: column;
  border-radius: 5px;
  
`;

const DivRequests = styled.div`
margin-top: 100px;
 
 
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width:80%;
`;


const Span = styled.span`
  margin-left: "10px";
  margin-right: "8px";
  margin: 3%;
`;

const Info = styled.div`

  margin-left: "10px";
  border: 2px solid white;
  width: 300px;
  
`;

const Textarea = styled.textarea`
 margin: 3%;
  border-radius: 3px;
    border: 1px solid #e4e8eb;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 15px;
    font-weight: 300;
    height: 100px;
    padding: 8px 12px 10px 12px;
    width: 100%;
`;

const Button = styled.button`
  color: white;
  background-color: #006bb6;
  border-radius: 5px;
  padding: 12px;
  width: 200px;
  border: none;
  margin-top: 5px;
  margin-left: 83%;
  margin-bottom:5px;
  font-size: 17px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`

  font-size: 28px;
  display: flex;
  width: 100%;

  flex-direction: row;
  
  color: white; //#1d4555;
  background-color: rgb(194, 201, 202);
  
  
 
  margin-left: 5%;
 

  width: 80%;
  height: 80%;

`;

const TabHeader = styled.div`

  font-size: 28px;
  display: flex;
 
  flex-direction: row;
  width: 80%;
  color: white; //#1d4555;
  background-color: rgb(194, 201, 202);
  
  
  margin: 0;
  margin-left: 5%;
  border-bottom: 2 px black;
 

  

`;


