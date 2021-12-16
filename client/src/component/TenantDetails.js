import React, { useState } from "react";
import { useParams } from "react-router";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const initialStateTenant = {
  _id: "",
  firstName: "",
  lastName: "",
  telephone: "",
  email: "",
};

export const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  const param = useParams();
  const _id = param.tenantId;
  console.log("id:", _id);

  const [formData, setFormData] = useState(initialStateTenant);

  const history = useHistory();

  // this is to fetch a specific item with the id in the url
  React.useEffect(() => {
    console.log("getting tenant details");
    fetch(`/api/tenant?_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setTenant(data.data);
      });
  }, []);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

  const handleClick = () => {
    formData._id = tenant._id;
    console.log(formData);
    if(formData.firstName==="")
    { formData.firstName = tenant.firstName}
    if(formData.lastName==="")
    { formData.lastName = tenant.lastName}
    if(formData.telephone==="")
    { formData.telephone = tenant.telephone}
    if(formData.email==="")
    { formData.email = tenant.email}

    fetch("/api/tenant", {
      method: "PUT",
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
      {tenant && (
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
                placeholder={tenant.firstName}
                onChange={(ev) => handleChange(ev.target.value, "firstName")}
              />
            </Data>

            <Data>
              <Span>Lastname:</Span>
              <Input
                type="text"
                name="lastName"
                placeholder={tenant.lastName}
                onChange={(ev) => handleChange(ev.target.value, "lastName")}
              />
            </Data>

            <Data>
              <Span>Telephone:</Span>
              <Input
                type="text"
                name="telephone"
                placeholder={tenant.telephone}
                onChange={(ev) => handleChange(ev.target.value, "telephone")}
              />
            </Data>

            <Data>
              <Span>Email:</Span>
              <Input
                type="text"
                name="email"
                placeholder={tenant.email}
                onChange={(ev) => handleChange(ev.target.value, "email")}
              />
            </Data>

            <Button onClick={handleClick}>Modify</Button>
          </InfoBox>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 120px;
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
