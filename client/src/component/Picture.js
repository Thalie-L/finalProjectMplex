import React, { useState } from "react";
import styled from "styled-components";

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
         
          <Img src={pictures[0].imageUrl} />
          <span>{lodging.type}</span>-
          <span>{lodging.lodgingAddress.address}</span>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Img = styled.img`
  height: 300px;
  width: 400px;
`;
