import React, { useState } from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router";
import { CurrentUserContext } from "./CurrentUserContext";
import { MessageBox } from "./MessageBox";

export const initialStateTenantLease = {
  _id: "",
  dateStart: "",
  dateEnd: "",
  inclusion: "",
  rule: "",
  price: "",
  idLodging: "",
  idUser: "",
};

export const TenantLease = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);

  const [formData, setFormData] = useState(initialStateTenantLease);
  const [lease, setLease] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [name, setName] = useState(null);
  const param = useParams();
  const _id = param.tenantId;
  const [message, setMessage] = useState("");
  //console.log("id:", _id);

  const history = useHistory();

  React.useEffect(() => {
    console.log("getting tenant leases");
    fetch(`/api/tenant?_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTenant(data.data);
          setName(data.data.firstName+" "+data.data.lastName)
          fetch(`/api/lease?idUser=${_id}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                setLease(data.data);
              }
            });
        }
      });
  }, []);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

  const handleClick = () => {
    formData._id = uuidv4();
    formData.idUser = tenant._id;

    formData.idOwner = currentUser._id;
    fetch("/api/leases", {
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
        setMessage("Lease added - wait until it saved please");
        setTimeout(() => {
          window.location.reload();
          }, 2000);     
        
      });
  };

  const handleClickSend = () => {
    let emailInfo = {
      email: tenant.email,
      message: `<br/><Div>Date start: ${lease.dateStart}</Div><br/><Div>Date end: ${lease.dateEnd}</Div></br><Div>Inclusion: ${lease.inclusion}</Div></br><Div>Rule: ${lease.rule}</Div><Div>Price: ${lease.price}</Div>",
      subject: "Lease confirmation`,
      name: tenant.firstName + tenant.lastName,
    };

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
        setMessage("Lease has been send by email");             
      });
  };

  

  return (
    <Wrapper>
      <Header>
        {message && <MessageBox message={message} setMessage={setMessage} />}
      </Header>
      <DivTenant>
      <Container>
       
            {!lease && tenant && (
              <>
               <ColumnBoxes>
          <ColumnBox>
                <InfoBox>
                <Data>
                    <Span>Name:</Span>
                  </Data>
                  <Data>
                    <Span>Date start:</Span>
                  </Data>

                  <Data>
                    <Span>Date end:</Span>
                  </Data>

                  <Data>
                    <Span>Inclusion:</Span>
                  </Data>

                  <Data>
                    <Span>Rule:</Span>
                  </Data>

                  <Data>
                    <Span>Price:</Span>
                  </Data>

                  <Data>
                    <Span># Lodging:</Span>
                  </Data>
                </InfoBox>
                <InfoBoxRight>
                
                <Data>
                <Input
                      type="text"
                      name="dateStart"
                      placeholder={name}                  
                    />
                  </Data>
               
                  <Data>
                    <Input
                      type="text"
                      name="dateStart"
                      placeholder="Date Start"
                      onChange={(ev) =>
                        handleChange(ev.target.value, "dateStart")
                      }
                    />
                  </Data>

                  <Data>
                    <Input
                      type="text"
                      name="dateEnd"
                      placeholder="Date end"
                      onChange={(ev) =>
                        handleChange(ev.target.value, "dateEnd")
                      }
                    />
                  </Data>
                  <Data>
                    <Input
                      type="text"
                      name="inclusion"
                      placeholder="Inclusion"
                      onChange={(ev) =>
                        handleChange(ev.target.value, "inclusion")
                      }
                    />
                  </Data>

                  <Data>
                    <Input
                      type="text"
                      name="rule"
                      placeholder="Rule"
                      onChange={(ev) => handleChange(ev.target.value, "rule")}
                    />
                  </Data>
                  <Data>
                    <Input
                      type="text"
                      name="price"
                      placeholder="Price"
                      onChange={(ev) => handleChange(ev.target.value, "price")}
                    />
                  </Data>
                  <Data>
                    <Input
                      type="text"
                      name="idLodging"
                      placeholder="idLodging"
                      onChange={(ev) =>
                        handleChange(ev.target.value, "idLodging")
                      }
                    />
                  </Data>
                </InfoBoxRight>
                </ColumnBox>
                 <ButtonBox>
                
                     <Button onClick={handleClick}>Confirm</Button>
                  
                 </ButtonBox>
                 </ColumnBoxes>
              </>
                
            )}
           

         
            {lease && tenant && (
              <>
              <ColumnBoxes>
               <ColumnBox>
                <InfoBox>
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
                  <Data>
                    <Span>Price:</Span>
                    <Span>{lease.price}$</Span>
                  </Data>
                  <Data>
                    <Span># Lodging:</Span>
                    <Span>{lease.idLodging}</Span>
                  </Data>
               
                </InfoBox>
                </ColumnBox>
          <ButtonBox>
            <Buttons>
              <Button onClick={handleClickSend}>Send</Button>              
            </Buttons>
          </ButtonBox>
          </ColumnBoxes>
              </>
            )}
            
   
      </Container>
      </DivTenant>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 830px;
  margin-left: 250px;
  margin-top: 80px;
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

const Container = styled.div`
  display: flex;
  width: 55%;
  height: 80%;
  flex-direction: row;
  align-items: center;
  color: white;
  background-color: rgb(194, 201, 202);
  border-radius: 5px;
  margin-top: 80px;
  margin-left: 5%; 
`;

const DivTenant = styled.div`
  //margin-top: 100px;
  height:100%;
  border: 2px solid transparent;
`;

const InfoBox = styled.div`
  height: 100%;
  width: 300px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;  
`;
const InfoBoxRight = styled.div`
  height: 100%;
  width: 500px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;  
`;

const Span = styled.span`
  margin-right: "18px";
  font-size: 28px;
  height:100%;
`;

const Data = styled.div`
  
  margin-left: "10px";
  margin-right: "5px";
  font-size: 17px;
  width:100%;
  margin-bottom: 5%;
  font-size: 28px;
  display: flex;
  align-items: center;
  height: 100%;
 
 
`;
const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #e4e8eb;
  box-sizing: border-box;
  color: #464a5c;
  font-size: 15px;
  font-weight: 300;
  height: 100%;
  padding: 8px 12px 10px 12px;
  width: 100%;
  
`;

const Buttons = styled.button`
  display: flex;

  flex-direction: row;
  justify-content: center;
  margin-left: 50px;
  background-color: transparent;
  border: none;
`;

const Button = styled.button`
  color: white;
  background-color: #006bb6;
  border-radius: 5px;
  padding: 12px;
  width: 300px;
  border: none;
  margin-top: 30px;
  font-size: 17px;
  font-weight: bold;
  margin-left: 50px; 
`;

const ColumnBoxes = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-right: 100px;

`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: row;
  height:450px;
 
`;

const ButtonBox = styled.div`
width: 100%;
display: flex:
align-items: center;
justify-content:center;


`;
