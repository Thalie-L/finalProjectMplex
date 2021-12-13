import React, { useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import {Picture} from "./Picture";

export const Lodgings = () => {
  const [lodgings, setLodgings] = useState(null);


  React.useEffect(() => {
    console.log("getting data lodgings and address");
    fetch("/api/lodgings")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLodgings(data.data);
      })
      .catch((err) => {
        console.log("Error Reading data " + err);
        //setError(true)
      });
  }, []);

  return (
    <Wrapper>
      {lodgings && <Map lodgings={lodgings} />}
      {lodgings &&
        lodgings.map((lodging, key) => {
          return (
            <>
              <div key={lodging.key}>
                  <Picture lodging={lodging}/>
               
              </div>
            </>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 830px;
  margin-left: 250px;
  border: 2px solid red;
`;
