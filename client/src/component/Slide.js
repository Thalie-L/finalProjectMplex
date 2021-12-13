import React, { useState } from "react";
import styled from "styled-components";
import { Slide } from "react-slideshow-image";

const properties = {};

export const Slideshow = (pictures) => {
  return (
    <Container>
      <Slide {...properties}>
        {pictures &&
          pictures.map((picture, index) => {
            <EachSlide key={index}>
              <div>
                <img src={picture.imageUrl} alt="image" />
              </div>
            </EachSlide>;
          })}
      </Slide>
    </Container>
  );
};

const Container = styled.div``;

const EachSlide = styled.div``;
