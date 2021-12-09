import React from "react";
import styled from "styled-components";

const TextArea = ({ name, placeholder, row, cols, handleChange }) => {
  return (
    <Wrapper>
      <label htmlFor={name}>{placeholder}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        row={row}
        cols={cols}
        onChange={(ev) => handleChange(ev.target.value, name)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 6px;
  width: 100%;
  position: relative;

  label {
    display: none;
  }

  textarea {
    border-radius: 3px;
    border: 1px solid #e4e8eb;
    box-sizing: border-box;
    color: #464a5c;
    font-size: 15px;
    font-weight: 300;
    height: 100px;
    padding: 8px 12px 10px 12px;
    width: 100%;

    &::placeholder {
      color: #999;
    }
  }
`;

export default TextArea;
