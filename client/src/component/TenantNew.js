import React, { useState } from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { CurrentUserContext } from "./CurrentUserContext";


export const initialStateTenantNew = {
  firstName: "",
  lastName: "",
  role: "",
  telephone: "",
  email: "",
  idLodging: "",
  idOwner: "",
};

export const TenantNew = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);

  const [formData, setFormData] = useState(initialStateTenantNew);

  const history = useHistory();

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

  const handleClick = () => {
    formData._id = uuidv4();
    formData.role = "User";
    formData.idOwner = currentUser._id;
      fetch("/api/tenant", {
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
    <Wrapper>
      <Container>
        <ImageBox>
          <ItemImage src="/person-icon.png" />
        </ImageBox>
        <InfoBox>
          <Data>
            <Span>Firstname:</Span>
            <Input
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={(ev) => handleChange(ev.target.value, "firstName")}
            />
          </Data>

          <Data>
            <Span>Lastname:</Span>
            <Input
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={(ev) => handleChange(ev.target.value, "lastName")}
            />
          </Data>

          <Data>
            <Span>Telephone:</Span>
            <Input
              type="text"
              name="telephone"
              placeholder="Telephone"
              onChange={(ev) => handleChange(ev.target.value, "telephone")}
            />
          </Data>

          <Data>
            <Span>Email:</Span>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(ev) => handleChange(ev.target.value, "email")}
            />
          </Data>
          <Data>
            <Span>Id Lodging:</Span>
            <Input
              type="text"
              name="idLodging"
              placeholder="Id Lodging"
              onChange={(ev) => handleChange(ev.target.value, "idLodging")}
            />
          </Data>

          <Button onClick={handleClick}>Modify</Button>
        </InfoBox>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 250px;
  width: 85%;
  height: 800px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: row;
  align-items: center;
  color: white;
  background-color: rgb(194, 201, 202);
  border-radius: 5px;
  margin: 2%;
  margin-left: 5%;
`;

const ItemImage = styled.img`
  height: 500px;
  width: 500px;
`;
const ImageBox = styled.div`
  margin-top: 10px;
  width: 500px;

  border: 3px solid;
  height: 500px;
  border: none;
  border-radius: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 70px;
  margin-right: 70px;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
`;

const Span = styled.span`
  margin-right: "28px";
  font-size: 28px;
`;

const Data = styled.div`
  margin-left: "10px";
  margin-right: "8px";
  font-size: 17px;
  width: 500px;
  margin-bottom: 5%;
  font-size: 28px;
`;
const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #e4e8eb;
  box-sizing: border-box;
  color: #464a5c;
  font-size: 15px;
  font-weight: 300;
  height: 36px;
  padding: 8px 12px 10px 12px;
  width: 50%;
`;

const Button = styled.button`
  color: white;
  background-color: #006bb6;
  border-radius: 5px;
  padding: 12px;
  width: 300px;
  border: none;
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
`;
