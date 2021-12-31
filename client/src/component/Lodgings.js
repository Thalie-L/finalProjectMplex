import React, { useState } from "react";
import styled from "styled-components";
import Map from "./Map";
import { Picture } from "./Picture";
import { CurrentUserContext } from "./CurrentUserContext";


export const Lodgings = () => {
  const [lodgings, setLodgings] = useState(null);
  const { currentUser, setCurrentUser, role, setRole } =
React.useContext(CurrentUserContext);

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
      });
  }, []);

  return (
    <Wrapper>
      {lodgings && <Map lodgings={lodgings} />}
      {lodgings &&
        lodgings.map((lodging, key) => {
          return (
            <>
            {lodging.isAvailable && role==="User" &&
              <div key={lodging.key}>
                <Picture lodging={lodging} />
              </div>
              }
               {role==="Admin" &&
              <div key={lodging.key}>
                <Picture lodging={lodging} />
              </div>
              }
            </>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 830px;
  margin-left: 250px;
  margin-top: 100px;
  display: absolute;
`;
