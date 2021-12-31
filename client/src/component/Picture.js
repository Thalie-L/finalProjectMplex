import React, { useState } from "react";
import styled from "styled-components";
import { Slideshow } from "./Slide";
import { CurrentUserContext } from "./CurrentUserContext";


export const Picture = ({ lodging }) => {
  const [pictures, setPictures] = useState(null);
  const { currentUser, setCurrentUser, role, setRole } =
React.useContext(CurrentUserContext);



  React.useEffect(() => {
    console.log("getting data pictures");
    fetch(`/api/pictures?idLodging=${lodging._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPictures(data.data);
        console.log("lodgings: ",lodging.lodgingAddress.address);
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
        //setError(true)
      });
  }, []);
  return (
    <Wrapper>
      {pictures && lodging.lodgingAddress.address && (
        <>
        <Info>  Adresse: {lodging.lodgingAddress.address}, {lodging.type} - 
        {role==="Admin" && <> Id: {lodging._id}, isAvailable: {lodging.isAvailable && "Yes"} {!lodging.isAvailable && "No"}</>}
        </Info>
          {pictures.map((picture) => {
              return(<Img src={picture.imageUrl} />);
            })}
         
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
margin-top: 50px;
`;

const Img = styled.img`
  height: 300px;
  width: 400px;
`;

const Info = styled.div `
font-size: 22px;
font-weight: bold;
margin-bottom: 10px;
`;
