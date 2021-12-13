import React, { useState } from "react";
import styled from "styled-components";
import { Slideshow } from "./Slide";

export const Picture = ({ lodging }) => {
  const [pictures, setPictures] = useState(null);

  React.useEffect(() => {
    console.log("getting data pictures");
    fetch(`/api/pictures?idLodging=${lodging._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPictures(data.data);
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
        //setError(true)
      });
  }, []);
  return (
    <Wrapper>
      {pictures && (
        <>
        <div> <span>Adresse: {lodging.lodgingAddress.address}, </span>
        <span>{lodging.type}</span>
          </div>
          {pictures.map((picture) => {
              return(<Img src={picture.imageUrl} />);
            })}
         
        </>
      )}
    </Wrapper>
  );
};
// <Slideshow pictures={pictures}/>
const Wrapper = styled.div`
margin-top: 50px;
`;

const Img = styled.img`
  height: 300px;
  width: 400px;
`;
