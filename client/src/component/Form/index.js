import React from "react";
import styled from "styled-components";
import Select from "./Select";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";

export const itemOptions = [
  { value: "undefined", label: "Pick a lodging type" },
  { value: "1 1/2", label: "1 1/2" },
  { value: "3 1/2", label: "3 1/2" },
  { value: "4 1/2", label: "4 1/2" },
  { value: "5 1/2", label: "5 1/2" },
];

const Form = ({ formData, handleChange, handleClick, disabled, subStatus }) => (
  <Wrapper>
    <SelectWrapper></SelectWrapper>
    <FormContent>
      <h1>Building Form</h1>
      <h2>Provide your information</h2>
      <FormGroup>
        <Input
          name="buildingName"
          type="text"
          placeholder="Building identifier"
          handleChange={handleChange}
        />

        <Input
          name="buildingDesc"
          type="text"
          placeholder="Building description"
          handleChange={handleChange}
        />
      </FormGroup>
      <h2>Provide your lodging information</h2>
      <FormGroup>
        <Select
          label="Your lodging type"
          htmlFor="lodgType1"
          selection={formData.lodgType1}
          handleChange={handleChange}
          options={itemOptions}
        />
      </FormGroup>

      <Input
        name="address1"
        type="address"
        placeholder="Address"
        handleChange={handleChange}
      />
      <FormGroup>
        <Input
          name="city1"
          type="text"
          placeholder="City"
          handleChange={handleChange}
        />
        <Input
          name="province1"
          type="text"
          placeholder="Province"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="postcode1"
          type="text"
          placeholder="Postal Code"
          handleChange={handleChange}
        />
        <Input
          name="country1"
          type="text"
          placeholder="Country"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <TextArea
          name="pictures1"
          placeholder="Pictures links"
          row="8"
          cols="151"
          handleChange={handleChange}
        />
      </FormGroup>



      <h2>Provide your lodging information</h2>
      <FormGroup>
        <Select
          label="Your lodging type"
          htmlFor="lodgType2"
          selection={formData.lodgType2}
          handleChange={handleChange}
          options={itemOptions}
        />
      </FormGroup>

      <Input
        name="address2"
        type="address"
        placeholder="Address"
        handleChange={handleChange}
      />
      <FormGroup>
        <Input
          name="city2"
          type="text"
          placeholder="City"
          handleChange={handleChange}
        />
        <Input
          name="province2"
          type="text"
          placeholder="Province"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="postcode2"
          type="text"
          placeholder="Postal Code"
          handleChange={handleChange}
        />
        <Input
          name="country2"
          type="text"
          placeholder="Country"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <TextArea
          name="pictures2"
          placeholder="Pictures links"
          row="8"
          cols="151"
          handleChange={handleChange}
        />
      </FormGroup>

      <h2>Provide your lodging information</h2>
      <FormGroup>
        <Select
          label="Your lodging type"
          htmlFor="lodgType3"
          selection={formData.lodgType3}
          handleChange={handleChange}
          options={itemOptions}
        />
      </FormGroup>

      <Input
        name="address3"
        type="address"
        placeholder="Address"
        handleChange={handleChange}
      />
      <FormGroup>
        <Input
          name="city3"
          type="text"
          placeholder="City"
          handleChange={handleChange}
        />
        <Input
          name="province3"
          type="text"
          placeholder="Province"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          name="postcode3"
          type="text"
          placeholder="Postal Code"
          handleChange={handleChange}
        />
        <Input
          name="country3"
          type="text"
          placeholder="Country"
          handleChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <TextArea
          name="pictures3"
          placeholder="Pictures links"
          row="8"
          cols="151"
          handleChange={handleChange}
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
