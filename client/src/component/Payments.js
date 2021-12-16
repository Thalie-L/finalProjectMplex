import React, { useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import FormPayment from "./FormPayment";
import { v4 as uuidv4 } from "uuid";

export const initialStateTenant = {
  cardName: "",
  cardNumber: "",
  expiryDate: "",
  securityCode: "",
  monthPayment: "",
};

//getLeaseInformation

export const Payments = () => {
  const { currentUser, role } = React.useContext(CurrentUserContext);
  const [payments, setPayments] = useState(null);
  const [tenants, setTenants] = useState(null);
  const [option, setOption] = useState("");

  const [formData, setFormData] = useState(initialStateTenant);
  // const history = useHistory();

  React.useEffect(() => {
    console.log("getting data payment");
    let d = new Date();
    let month = d.getMonth();
    //let id = currentUser._id;
    if (role==="Admin") {
      fetch(`/api/payment/tenants?idOwner=${currentUser._id}&month=${month}`)
        .then((res) => res.json())
        .then((data) => {         
          setTenants(data.data);
          console.log(data.data);
          setOption("View");
        })
        .catch((err) => {
          console.log("Error Reading data " + err);
          //setError(true);
        });
    }

    if(role==="User"){
        fetch(`/api/payment?_id=${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {         
          setPayments(data.data);
          console.log(data.data);
          setOption("View");
        })
        .catch((err) => {
          console.log("Error Reading data " + err);
          //setError(true);
        });

    }
  }, []);

  const handleClickViewLate = () => {
    setOption("View");
  };

  const handleClickAdd = () => {
    console.log("click add");
    setOption("Add");
    //history.push(`/tenants/tenantNew`);
  };

  const handleChangeAdd = (value, name) => {
    setFormData({ ...formData, [name]: value });
    //setErrMessage("");
  };

 const handleClickAddConfirm = (ev)=>{
     console.log("Confirm");
     ev.preventDefault();
     const date = new Date();
     const payment ={
         _id:uuidv4(),
         amount: formData.amout,
         month: formData.month,
         datePayment:date.getFullYear.toString()+"-"+date.getMonth.toString()+date.getDay().toString(),
         idUser: currentUser._id
     }
   
     
     
       fetch("/api/payments/", {
         method: "POST",
         body: JSON.stringify(formData),
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       })
         .then((res) => res.json())
         .then((json) => {
           const { status, error } = json;
           if (status === "success") {
            
             console.log("success");
           } else if (error) {
             console.log("error:", error);
            
           }
         });

 }

  return (
    <Wrapper>
        <DivBtn>
      <Header>
        {role==="Admin" && <Btn onClick={handleClickViewLate}> View Payments </Btn>}
        <Btn onClick={handleClickAdd}>Add Payments</Btn>
      </Header>
      </DivBtn>
      <Main>
          {tenants && role==="Admin" && option==="View" &&<div>Late payments</div>}
        { tenants && role==="Admin" && option==="View" &&
          tenants.map((tenant, key) => {
             
            return (
              <>
                <div key={key}>
                 {tenant.firstName}-{tenant.lastName}-{tenant.telephone}
                </div>
              </>
            );
          })}

          {payments && role==="User" &&
          payments.map((payment, key) => {
            return (
              <>
                <div>
                 {payment.datePayment}-{payment.amount}
                </div>
              </>
            );
          })}

          {option==="Add" && <div>
          <FormPayment
            formData={formData}
            handleChange={handleChangeAdd}
            handleClick={handleClickAddConfirm}
          
          />
              
           
              
              </div>}
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 830px;
  margin-left: 250px;
  margin-top: 80px;
  display: absolute;  
`;

const Header = styled.div`
  background-color: #006bb6;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 5%;
  position: fixed;
  width:90%;
`;

const DivBtn = styled.div`  
  display: flex;
  flex-direction: row;  
  width: 40%;     
`;

const Btn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  margin-right:110px;
 
  &:hover {
    cursor: pointer;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:100px;
`;

const Info = styled.div`
  height: 100px;
  width: 95%;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 30px;
`;
