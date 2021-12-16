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
  idLodging:"",
  idUser: "",
};

export const TenantLease = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);

  const [formData, setFormData] = useState(initialStateTenantLease);
  const [lease, setLease] = useState(null);
  const [tenant,setTenant]=useState(null)
  const param = useParams();
  const _id = param.tenantId;
  //console.log("id:", _id);

  const history = useHistory();

  React.useEffect(() => {
    console.log("getting tenant leases");
    fetch(`/api/tenant?_id=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setTenant(data.data);
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
   formData.idUser= tenant._id;
  
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
      });
  };

  const handleClickSend = () => {
    let emailInfo = {
      email: tenant.email,
      message: `<br/><Div>Date start: ${lease.dateStart}</Div><br/><Div>Date end: ${lease.dateEnd}</Div></br><Div>Inclusion: ${lease.inclusion}</Div></br><Div>Rule: ${lease.rule}</Div><Div>Price: ${lease.price}</Div>",
      subject: "Lease confirmation`,
      name: tenant.firstName+tenant.lastName,
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
      });
  };

  return (
    <Wrapper>
      <Container>
        <InfoBox>
          {!lease && (
            <>
            

             

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
              <Data>
                <Span>Price:</Span>
                <Input
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={(ev) => handleChange(ev.target.value, "price")}
                />
              </Data>
              <Data>
                <Span># Lodging:</Span>
                <Input
                  type="text"
                  name="idLodging"
                  placeholder="idLodging"
                  onChange={(ev) => handleChange(ev.target.value, "idLodging")}
                />
              </Data>
              <Buttons>
                <Button onClick={handleClick}>Confirm</Button>
                <Button onClick={handleClickSend}>Send</Button>

                <Button>Cancel</Button>
              </Buttons>
            </>
          )}

          {lease && (
            <>
              

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
                <Span>{lease.price}</Span>
              </Data>
              <Data>
                <Span># Lodging:</Span>
                <Span>{lease.idLodging}</Span>
              </Data>
              <Buttons>
                <Button onClick={handleClick}>Confirm</Button>
                <Button onClick={handleClickSend}>Send</Button>
                <Button onClick={handleClick}>Cancel</Button>
              </Buttons>
            </>
          )}
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
  width: 700px;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 50px;
  
`;

const Span = styled.span`
  margin-right: "28px";
  font-size: 28px;
 
  

`;

const Data = styled.div`
  
  margin-left: "10px";
  margin-right: "8px";
  font-size: 17px;
  width:100%;
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
  border: none;
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
