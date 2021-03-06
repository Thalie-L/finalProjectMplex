import React, { useState } from "react";
import styled from "styled-components";
import Form from "./Form";
import { Link } from "react-router-dom";
import { MessageBox } from "./MessageBox";

import { CurrentUserContext } from "./CurrentUserContext";

const initialState = {
 // idOwner: "",
  buildingName: "",
  buildingDesc: "",

  lodgType1: "",
  address1: "",
  city1: "",
  province1: "",
  postcode1: "",
  pictures1: "",

  lodgType2: "",
  address2: "",
  city2: "",
  province2: "",
  postcode2: "",
  pictures2: "",

  lodgType3: "",
  address3: "",
  city3: "",
  province3: "",
  postcode3: "",
  pictures3: "",
};

export const Buildings = () => {
  const [buildings, setBuildings] = useState(null);
  const [option, setOption] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const { currentUser, setCurrentUser, role, setRole } =
    React.useContext(CurrentUserContext);

  React.useEffect(() => {
    console.log("getting data building");
    if(!currentUser)
    {
      console.log(sessionStorage.getItem("currentUser"));
      fetch(`/api/buildings?idOwner=${sessionStorage.getItem("currentUser")}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBuildings(data.data);
        setOption("Add");
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
      
      
      
    }
    if(currentUser)
    {
    fetch(`/api/buildings?idOwner=${currentUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBuildings(data.data);
        setOption("Add");
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
      });
    }
  }, []);

  React.useEffect(() => {
    Object.values(formData).includes("") || formData.lodgType1 === "undefined"
    || formData.lodgType2 === "undefined" || formData.lodgType3 === "undefined"
      ? setDisabled(true)
      : setDisabled(false);
  }, [formData, setDisabled]);

  const handleClickAdd = () => {
    console.log("click add");
    setOption("Add");
    console.log(React.version);
  };

  const handleClickUpdate = () => {
    console.log("click update");
    setOption("Update");
   //console.log(React.version);
  };

  const handleChangeAdd = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
    //if buildingName check if unique
  };

  const handleClickAddConfirm = (ev) => {
    ev.preventDefault();    

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
        const { status, error,message } = json;

        console.log(status);  
       

        if (status === 201) {
          console.log("success");
          setMessage("Last building added: "+formData.buildingName);
          handleReset();
          setDisabled(true);
        } else {
          console.log("error:", error);
          setMessage(message);
        }
       
      });

    //RESET ALL FIELDS   
   


  };

  const handleReset = () =>{
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    Array.from(document.querySelectorAll("textarea")).forEach(
      input => (input.value = "")
    );

    Array.from(document.querySelectorAll("option")).forEach(
      option => (option.value = "undefined")
    );
   
  }

  return (
    <Wrapper>
      <Header>
      {message && <MessageBox message={message} setMessage={setMessage}/>}
        <DivBtn>
         
          <Btn onClick={handleClickAdd}> Add Building</Btn>
          <Btn onClick={handleClickUpdate}>Update Building</Btn>
        </DivBtn>
      </Header>
      {option === "Add" && (
        <Main>
          <Form 
            formData={formData}
            handleChange={handleChangeAdd}
            handleClick={handleClickAddConfirm}
            disabled={disabled}
          />
        </Main>
      )}

      {option === "Update" && buildings && role === "Admin" && (
       
        <DivBuildings>
          <TabHeader>
            <Info>#</Info>
            <Info>Building name</Info>
            <Info> Building description</Info>
            <Info> Details</Info>
          </TabHeader>

          {buildings &&
            buildings.map((building, index) => {
              return (
                <>
                  <Container>
                    <Info> {index + 1}</Info>
                    <Info>{building._id}</Info>
                    <Info>{building.desc}</Info>
                    <Info>
                      <Link to={`/building/lodgings/${building._id}`}>
                        Details
                      </Link>
                    </Info>
                  </Container>
                </>
              );
            })}
        </DivBuildings>
        
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 830px;
  margin-left: 250px;
  margin-top: 80px;

  //border: 2px solid white;
`;

const Header = styled.div`
  background-color: #006bb6;
  display: flex;
  //flex-direction: row;
  //justify-content: flex-end;
  align-items: center;
  height: 5%;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const DivBtn = styled.div`
 margin-left: auto; //ajout
  display: flex;
  flex-direction: row;
  width:42%;
  
`;

const Btn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  margin-right: 145px;
  &:hover {
    cursor: pointer;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 850px;
`;

const DivBuildings = styled.div`
   
  padding-top: 100px;
  width: 80%;
  height: 100px;
`;

const TabHeader = styled.div`
  font-size: 28px;
  display: flex;
  height: 60px;

  flex-direction: row;
  width: 80%;
  color: white; //#1d4555;
  background-color: rgb(194, 201, 202);

  margin:0;
  margin-left: 5%;
`;

const Info = styled.div`
  margin-left: "10px";
  border: 2px solid white;
  width: 400px;  
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

const Button = styled.button`
  color: white;
  background-color: #006bb6;
  border-radius: 5px;
  padding: 12px;
  // width: 200px;
  border: none;
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
`;
