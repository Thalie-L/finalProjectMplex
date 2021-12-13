import React from "react";
import styled from "styled-components";
import Select from "../Form/Select";
import Input from "../Form/Input";
import Button from "../Form/Button";

export const itemOptions = [
  { value: "undefined", label: "Pick a month" },
  { value: "0", label: "January" },
  { value: "1", label: "February" },
  { value: "2", label: "March" },
  { value: "3", label: "April" },
  { value: "4", label: "May" },
  { value: "5", label: "June" },
  { value: "6", label: "July" },
  { value: "7", label: "August" },
  { value: "8", label: "Septembre" },
  { value: "9", label: "Octobre" },
  { value: "10", label: "November" },
  { value: "11", label: "Decembre" },
];

export const initialStateTenant = {
    _id: "",
    amount:"",
    month: "",
    datePayment:"",
    idUser:"",
    cardName: "",
  cardNumber: "",
  expiryDate: "",
  securityCode: "",
  monthPayment: "",
};

const Form = ({
  formData,
  lease,
  handleChange,
  handleClick,
  disabled,
  subStatus,
}) => (
  <Wrapper>
    <SelectWrapper></SelectWrapper>
    <FormContent>
      <h1>Payment by credit card</h1>

      <FormGroup>
        <Input
          name="cardName"
          type="text"
          placeholder="Card Name"
          handleChange={handleChange}
        />

        <Input
          name="amount"
          type="text"
          placeholder="Amount"
          handleChange={handleChange}
        />
      </FormGroup>
      <h2>Provide your lodging information</h2>
      <Input
        name="cardNumber"
        type="text"
        placeholder="Card number (XXXX XXXX XXXX XXXX)"
        handleChange={handleChange}
      />

      <Input
        name="securityCode"
        type="password"
        placeholder="securityCode (XXX)"
        handleChange={handleChange}
      />

<Input
        name="expiryDate"
        type="text"
        placeholder="expiryDate (XX XX)"
        handleChange={handleChange}
      />

      <FormGroup>
        <Select
          label="Your month of payment"
          htmlFor="month"
          selection={formData.month}
          handleChange={handleChange}
          options={itemOptions}
        />
      </FormGroup>
    </FormContent>
    <Button
      formData={formData}
      handleClick={handleClick}
      disabled={disabled}
      subStatus={subStatus}
    />
  </Wrapper>
);

const Wrapper = styled.form`
  padding: 0 20px;
`;
const FormContent = styled.div`
  margin: 0 16px 0;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    flex: 1 0 auto;
    width: 48%;

    &:first-child {
      margin-right: 6px;
    }
  }
`;
const SelectWrapper = styled.div`
  display: flex;
  margin-top: -20px;

  > div {
    max-width: inherit;

    &:first-child {
      flex: 1;
      margin-right: 6px;
    }
  }
`;

export default Form;
