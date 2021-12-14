import React, { useState } from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router";
import { CurrentUserContext } from "./CurrentUserContext";

export const initialStateTenantLease = {
  _id: "",
  dateStart: "",
  dateEnd: "",
  inclusion: "",
  rule: "",
  price: "",
  idUser: "",
};

export const TenantLease = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);

  const [formData, setFormData] = useState(initialStateTenantLease);
  const[lease,setLease]= useState();
  const param = useParams();
  const _id = param.tenantId;
  //console.log("id:", _id);

  const history = useHistory();

  React.useEffect(() => {
    console.log("getting tenant leases");
    fetch(`/api/tenant/Lease?_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLease(data.data);
      });
  }, []);


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


  const handleClickSend = () => {
    let emailInfo ={
        email:"thalie_l@hotmail.com",
        message:"Message test",
        subject:"Sujet test",
        name:"Nathalie",

    }
   
    fetch("/mail", {
      method: "POST",
      body: JSON.stringify(emailInfo),
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
        <InfoBox>
            {!lease &&
            <>
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
            <Span>Date start:</Span>
            <Input
              type="text"
              name="dateStart"
              placeholder="Date Start"
              onChange={(ev) => handleChange(ev.target.value, "dateStart")}
            />
          </Data>

          <Data>
            <Span>Date end:</Span>
            <Input
              type="text"
              name="dateEnd"
              placeholder="Date end"
              onChange={(ev) => handleChange(ev.target.value, "dateEnd")}
            />
          </Data>
          <Data>
            <Span>Inclusion:</Span>
            <Input
              type="text"
              name="inclusion"
              placeholder="Inclusion"
              onChange={(ev) => handleChange(ev.target.value, "inclusion")}
            />
          </Data>

          <Data>
            <Span>Rule:</Span>
            <Input
              type="text"
              name="rule"
              placeholder="Rule"
              onChange={(ev) => handleChange(ev.target.value, "rule")}
            />
          </Data>
            <Buttons>
          <Button onClick={handleClick}>Confirm</Button>
          <Button onClick={handleClickSend}>Send</Button> 

           <Button onClick={handleClick}>Cancel</Button>
          </Buttons>
          </>
}

{lease &&
            <>
          <Data>
            <Span>Firstname:</Span>
           <Span>{lease.idUser}</Span>
          </Data>

          <Data>
            <Span>Lastname:</Span>
            <Span>{lease.idUser}</Span>
            
          </Data>

          <Data>
            <Span>Date start:</Span>
           <Span>{lease.dateStart}</Span>
          </Data>

          <Data>
            <Span>Date end:</Span>
            <Span>{lease.dateEnd}</Span>
          </Data>
          <Data>
            <Span>Inclusion:</Span>
            <Span>{lease.inclusion}</Span>
          </Data>

          <Data>
            <Span>Rule:</Span>
            <Span>{lease.rule}</Span>
          </Data>
            <Buttons>
          <Button onClick={handleClick}>Confirm</Button> 
          <Button onClick={handleClickSend}>Send</Button> 
          <Button onClick={handleClick}>Cancel</Button>
          </Buttons>
          </>
}
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

const Buttons = styled.button`
display: flex;

flex-direction: row;
margin-left: 50px;
background-color: transparent;
border:none;
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
  margin-left: 50px;
`;
