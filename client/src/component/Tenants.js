import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";

export const initialStateTenant = {
  firstName: "",
  lastName: "",
  telephone: "",
  email: "",
  address: "",
  province: "",
  postcode: "",
  country: "",
};

export const Tenants = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);
  const [tenants, setTenants] = useState(null);
  const [option, setOption] = useState("");

  const [formData, setFormData] = useState(initialStateTenant);
  const history = useHistory();

  React.useEffect(() => {
    console.log("getting data tenant");
    fetch("/api/tenants")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTenants(data.data);
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
    history.push(`/tenants/tenantNew`);
  };

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

  return (
    <>
      {role === "Admin" && (
        <Wrapper>
          <Header>
            <Btn onClick={handleClickView}> View Tenants</Btn>
            <Btn onClick={handleClickAdd}>Add Tenants</Btn>
          </Header>
          <Main>
            {tenants &&
              option === "View" &&
              tenants.map((tenant) => {
                return (
                  <>
                    <DivTenants>
                      <Container>
                        <ImageBox>
                          <ItemImage src="/person-icon.png" />
                        </ImageBox>

                        <Data>
                          
                          <Span>Firstname:</Span>
                          {tenant.firstName}
                        </Data>

                        <Data>
                          {" "}
                          <Span>Lastname:</Span>
                          {tenant.lastName}
                        </Data>

                        <Data>
                          {" "}
                          <Span>Telephone:</Span>
                          {tenant.telephone}
                        </Data>

                        <Data>
                          {" "}
                          <Span>Email:</Span>
                          {tenant.email}
                        </Data>
                        <Link to={`/tenants/${tenant._id}`}>
                            <Button>Modify</Button>
                        </Link>
                        <Link to={`/tenant/Lease/${tenant._id}`}>
                            <Button>Lease</Button>
                        </Link>
                       
                      </Container>
                    </DivTenants>
                  </>
                );
              })}

            {tenants && option === "Add" && (
              <>
                <Info>
                  <Span>Firstname:</Span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={(ev) =>
                      handleChange(ev.target.value, "firstName")
                    }
                  />
                  <Span>Lastname:</Span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    onChange={(ev) => handleChange(ev.target.value, "lastName")}
                  />

                  <Span>Telephone:</Span>
                  <input
                    type="text"
                    name="telephone"
                    placeholder="XXX-XXX-XXXX"
                    onChange={(ev) =>
                      handleChange(ev.target.value, "telephone")
                    }
                  />
                  <Span>Email:</Span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={(ev) => handleChange(ev.target.value, "email")}
                  />
                </Info>
              </>
            )}
          </Main>
        </Wrapper>
      )}
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

const DivTenants = styled.div`
  display: flex;
  flex-wrap: wrap;
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
