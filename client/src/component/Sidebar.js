import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { BsFiles } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { MdOutlineBedroomParent } from "react-icons/md";

import { BiBuildingHouse } from "react-icons/bi";

import { CurrentUserContext } from "./CurrentUserContext";

export const Sidebar = () => {
  const { currentUser, setCurrentUser, role, setRole } =
    React.useContext(CurrentUserContext);

  return (
    <Wrapper>
      <Links>
        <NavLink
          to="/"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "purple",
          }}
          style={linkStyle}
        >
          <Menu>
            <Icon>
              <FiHome size={32} />
            </Icon>
            <Span>Home</Span>
          </Menu>
        </NavLink>
        {role === "User" && (
          <NavLink
            to={"/tenants/" + currentUser._id}
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "purple",
            }}
            style={linkStyle}
          >
            <Menu>
              <Icon>
                <BiUser size={32} />
              </Icon>
              <Span>Profile</Span>
            </Menu>
          </NavLink>
        )}

        {role === "Admin" && (
          <NavLink
            to="/buildings"
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "purple",
            }}
            style={linkStyle}
          >
            <Menu>
              <Icon>
                <BiBuildingHouse size={32} />
              </Icon>
              <Span>Buildings</Span>
            </Menu>
          </NavLink>
        )}
        <NavLink
          to="/lodgings"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "purple",
          }}
          style={linkStyle}
        >
          <Menu>
            <Icon>
              <MdOutlineBedroomParent size={32} />
            </Icon>
            <Span>Lodgings</Span>
          </Menu>
        </NavLink>
        {role === "Admin" && (
          <NavLink
            to="/tenants"
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "purple",
            }}
            style={linkStyle}
          >
            <Menu>
              <Icon>
                <BsPeopleFill size={32} />
              </Icon>
              <Span>Tenants</Span>
            </Menu>
          </NavLink>
        )}

        <NavLink
          to="/payments"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "purple",
          }}
          style={linkStyle}
        >
          <Menu>
            <Icon>
              <BiDollarCircle size={32} />
            </Icon>
            <Span>Payments</Span>
          </Menu>
        </NavLink>

        <NavLink
          to="/Requests"
          exact
          activeStyle={{
            fontWeight: "bold",
            color: "purple",
          }}
          style={linkStyle}
        >
          <Menu>
            <Icon>
              <BsBookmark size={32} />
            </Icon>
            <Span>Requests</Span>
          </Menu>
        </NavLink>
        {role === "Admin" && (
          <NavLink
            to="/calendar"
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "purple",
            }}
            style={linkStyle}
          >
            <Menu>
              <Icon>
                <BiCalendar size={32} />
              </Icon>
              <Span>Calendar</Span>
            </Menu>
          </NavLink>
        )}
      </Links>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  top: 80px;
  //margin-top:250px;
  height: 100%;
  width: 250px;
  background-color: #2f4050;
  position: fixed;

  //margin-top: 80px;
`;

const Img = styled.img`
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Links = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10%;
`;

const Menu = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: row;
  margin: 0;
  color: white;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  &:hover {
    background-color: #b19cd9;
    cursor: pointer;
    background-color: #293846;
  }
`;

const Icon = styled.div`
  width: 100px;
  //flex:30%;
  //display: grid;
  text-align: center;
  place-items: center;
`;

const Span = styled.span`
  //margin-right: 10px;
  //flex:70%;
  font-size: 22px;
`;

const linkStyle = {
  textDecoration: "none",
  color: "blue",
};
