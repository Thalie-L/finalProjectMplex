import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";

export const initialStateRequest = {
  _id: "",
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
    //history.push(`/tenants/tenantNew`);
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

  return (
    <>
      <Wrapper>
        <Header>
          {role==="Admin" && <Btn onClick={handleClickView}> View Requests</Btn>}
          {role==="User" && <Btn onClick={handleClickAdd}>Add Requests</Btn>}
        </Header>
        <Main>
          {requests && role==="Admin" &&
            option === "View" &&
            requests.map((request) => {
              return (
                <>
                  <Container>{request.description}</Container>
                </>
              );
            })}

          {option === "Add" && role==="Admin" &&(
            <>
              <Info>
                <Span>Request:</Span>
                <textarea
                  name="description"
                  onChange={(ev) =>
                    handleChange(ev.target.value, "description")
                  }
                />
              </Info>
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
  background-color: transparent;
  color: white;
  border: none;
  margin-right: 5%;
  &:hover {
    cursor: pointer;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
  border: 1px solid;
  height: 100px;
  width: 95%;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 30px;
  box-shadow: 5px 10px #888888;
`;

const Span = styled.span`
  margin-left: "10px";
  margin-right: "8px";
`;

const Data = styled.div`
  margin-left: "10px";
  margin-right: "8px";
  font-size: 17px;
  width: 200px;
`;

const Button = styled.button`
  color: white;
  background-color: #006bb6;
  border-radius: 5px;
  padding: 12px;
  width: 200px;
  border: none;
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white; //#1d4555;
  background-color: rgb(194, 201, 202);
  //#98a1a5;
  //rgba(49, 165, 157, 0.8);
  border-radius: 5px;
  margin: 2%;
  margin-left: 10%;
  margin-bottom: 20px;

  width: 350px;
  height: 450px;
`;

const ItemImage = styled.img`
  object-fit: fill;
  overflow: hidden;
  height: 200px;
  width: 200px;
`;
const ImageBox = styled.div`
  margin-top: 10px;
  min-width: 200px;
  max-width: 200px;
  border: 3px solid;
  min-height: 200px;
  max-height: 200px;
  flex-basis: 40%;
  /* border-color: var(--color-dark-border); */
  border: none;
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
