import React, { useState } from "react";
import { useParams } from "react-router";

import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Lodging } from "./Lodging";

export const BuildingDetails = () => {
  const [lodgings, setLodgings] = useState(null);
  const param = useParams();
  const _id = param.buildingId;
  console.log("id:", _id);

  const history = useHistory();

  // this is to fetch a specific item with the id in the url
  React.useEffect(() => {
    console.log("getting building details");
    fetch(`/api/building/lodgings?idBuilding=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setLodgings(data.data);
      });
  }, []);

  return (
    <Wrapper>
      {lodgings &&
        lodgings.map((lodging) => {
          return <Lodging lodging={lodging} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 120px;
  margin-left: 250px;
  width: 30%;
  height: 600px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;
