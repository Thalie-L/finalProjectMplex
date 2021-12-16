import React from "react";
import styled from "styled-components";
import { MdOutlineLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export const Home = () => {
  return (
    <Wrapper>
      <DivImg>
        <Img src="./genevrier.jpg" />
      </DivImg>
      <DivSpan>
        <center>
          <Span>Welcome to MPLEX MANAGEMENT</Span>
        </center>
      </DivSpan>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 850px;
  position: relative;
`;
const DivImg = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  opacity: 0.78;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  opacity: 0.78;
`;

const DivSpan = styled.span`
  margin-top: 20px;
  postion: absolute;
  top: 360px;
  z-index: 2;
  font-size: 32px;
  height: 100%;
  width: 100%;
  opacity: 0.78;
`;

const Span = styled.span`
  align-items: center;
  color: #2f4050; //white;
  font-weight: bold;
`;
