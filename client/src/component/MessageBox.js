import React from "react";
import styled from "styled-components";


export const MessageBox = ({message,setMessage}) => {

    React.useEffect(() => {
        setTimeout(() => {
          setMessage(""); 
          }, 5000);                    
      }, [message]);
  return <Message>{message}</Message>;
};

const Message = styled.div`
  
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-left: 30px;    
`;