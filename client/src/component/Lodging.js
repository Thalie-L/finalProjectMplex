import React, { useState } from "react";
import styled from "styled-components";

export const initialStateBuildingDetail = {
  _id: "",

  isAvailable: "",
};

export const Lodging = ({ lodging }) => {
  const [formData, setFormData] = useState(initialStateBuildingDetail);

  console.log(lodging);
  const handleChange = (value, name) => {
    console.log(value, name);
    formData._id = lodging._id;
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

  const handleClick = () => {
    fetch("/api/lodging", {
      method: "PUT",
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
  return (
    <Container>
      <InfoBox>
        <Data>
          <Span>Identifier:</Span>
          <Span>{lodging._id}</Span>
        </Data>

        <Data>
          <Span>Type:</Span>
          <Span>{lodging.type}</Span>
        </Data>

        <Data>
          <Span>Adress:</Span>
          <Span>{lodging.lodgingAddress.address}</Span>
        </Data>

        <Data>
          <Span>City:</Span>
          <Span>{lodging.lodgingAddress.city}</Span>
        </Data>
        <Data>
          <Span>Province:</Span>
          <Span>{lodging.lodgingAddress.province}</Span>
        </Data>
        <Data>
          <Span>Postcode:</Span>
          <Span>{lodging.lodgingAddress.postcode}</Span>
        </Data>

        <Data>
          <Label htmlFor="isAvailable">Available: </Label>
          <select
            onChange={(ev) => handleChange(ev.target.value, "isAvailable")}
          >
            <option value="Change status" disabled selected>
              {lodging.isAvailable}
            </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <input
            type="checkbox"
            value={lodging.isAvailable}
            name="isAvailable"
            checked={lodging.isAvailable}
            onChange={(ev) => handleChange(ev.target.value, "isAvailable")}
          />{" "}
          Available
        </Data>

        <Button onClick={handleClick}>Modify</Button>
      </InfoBox>
    </Container>
  );
};

const Wrapper = styled.div`
  margin: 100px;
`;

const Container = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
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
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
`;

const Span = styled.span`
  margin-left: 20px;
  margin-right: "28px";
  font-size: 17px;
`;

const Label = styled.label`
  margin-left: 20px;
  margin-right: "28px";
  font-size: 17px;
`;

const Data = styled.div`
  margin-left: "10px";
  margin-right: "8px";
  font-size: 17px;
  width: 500px;
  margin-bottom: 5%;
`;
const Input = styled.label`
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

const Button = styled.button`
  margin-left: 20px;
  color: white;
  background-color: #006bb6;
  border-radius: 5px;
  padding: 12px;
  width: 300px;
  border: none;
  margin-top: 10px;
  font-size: 17px;
  font-weight: bold;
`;
