import React, { useState } from "react";
import styled from "styled-components";
import Form from "./Form";
//import uuid from "react-uuid";
import { CurrentUserContext } from "./CurrentUserContext";

const initialState = {
  idOwner:"",
  buildingName: "",
  buildingDesc: "",

  lodgType1: "",
  address1: "",
  city1: "",
  province1: "",
  postcode1: "",
  pictures1:"",

  lodgType2: "",
  address2: "",
  city2: "",
  province2: "",
  postcode2: "",
  pictures2:"",

  lodgType3: "",
  address3: "",
  city3: "",
  province3: "",
  postcode3: "",
  pictures3:"",
};

export const Buildings = () => {
  const [option, setOption] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const { currentUser, setCurrentUser, role, setRole } =
    React.useContext(CurrentUserContext);

  const handleClickAdd = () => {
    console.log("click add");
    setOption("ADD");
  };

  const handleChangeAdd = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrMessage("");
  };

  const handleClickAddConfirm = (ev) => {
    ev.preventDefault();
    //setSubStatus("pending");

 /*   const building = {
      _id: initialState.buildingName,
      desc: initialState.buildingDesc,
      status: "active",
      idOwner: currentUser._id,
    };

    fetch("/api/building", {
      method: "POST",
      body: JSON.stringify(building),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status, error } = json;
        if (status === "success") {
          //setSubStatus("confirmed");
          console.log("success");
        } else if (error) {
          console.log("error:", error);
          // setSubStatus("error");
          // setErrMessage(errorMessages[error]);
        }
      });
*/
    formData.idOwner = currentUser._id;
    
      fetch("/api/lodging/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          const { status, error } = json;
          if (status === "success") {
            //setSubStatus("confirmed");
            console.log("success");
          } else if (error) {
            console.log("error:", error);
            // setSubStatus("error");
            // setErrMessage(errorMessages[error]);
          }
        });
    
    

    //RESET ALL FIELDS
  };

  return (
    <Wrapper>
      <Header>
        <Btn onClick={handleClickAdd}> Add Building</Btn>
        <Btn>Update Building</Btn>
        <Btn>Delete Building</Btn>
      </Header>
      {option === "ADD" && (
        <Main>
          <Form
            formData={formData}
            handleChange={handleChangeAdd}
            handleClick={handleClickAddConfirm}
            disabled={disabled}
          />
        </Main>
      )}
    </Wrapper>
  );
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

  margin-left: 250px;
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
  height: 99%;
  margin-left: 251px;
`;
