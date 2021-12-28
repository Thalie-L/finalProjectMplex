import React, { useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import FormPayment from "./FormPayment";
import { v4 as uuidv4 } from "uuid";
import { MessageBox } from "./MessageBox";

export const initialStatePayment = {
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
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState(initialStatePayment);
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
          setOption("Add");
        })
        .catch((err) => {
          console.log("Error Reading data " + err);
          //setError(true);
        });

    }
  }, [currentUser]);

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
         amount: formData.amount,
         month: formData.month,
         datePayment:date.getFullYear().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getDate().toString(),
         idUser: currentUser._id
     }
   
     
     
       fetch("/api/payments/", {
         method: "POST",
         body: JSON.stringify(payment),
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       })
         .then((res) => res.json())
         .then((json) => {
           const { status,message, error } = json;
           if (status === 201) {
             handleReset();             
             console.log("success");
           } else if (error) {
             console.log("error:", error);
            
           }
           setMessage(message);
         });

 }

 const handleReset = () =>{
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );

  document.querySelectorAll("select").forEach(option=>
    (option[0].value ="undefined")
    
  )

  

   
}

  return (
    <Wrapper>
       <Header>
       {message && <MessageBox message={message} setMessage={setMessage} />}
        <DivBtn>
     
        {role==="Admin" && <Btn onClick={handleClickViewLate}> View Payments </Btn>}
        {role==="User" &&<Btn onClick={handleClickAdd}>Add Payments</Btn>}
     
      </DivBtn>
      </Header>
      <Main>
        <DivPayments>
        {tenants && role==="Admin" &&
            option === "View" &&
        <TabHeader>
                <Info>Late payments #</Info>
                <Info>Name</Info>
                <Info> Telephone</Info>               
                </TabHeader>}
              
  


        { tenants && role==="Admin" && option==="View" &&
          tenants.map((tenant, key) => {
             
            return (
              <>
              <Container>
                <Info>{key+1}</Info>
                <Info>{tenant.firstName} {tenant.lastName}</Info>
                <Info>{tenant.telephone}</Info>                
                </Container>
              </>
            );
          })}
            </DivPayments>

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

          {option==="Add" && role==="User"&& <div>
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
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif; 

`;

const Header = styled.div`
  background-color: #006bb6;
  display: flex;
 // flex-direction: row;
//  justify-content: flex-end;
  align-items: center;
  height: 5%;
  position: fixed;
  width:100%;
  z-index: 1;
`;

const DivBtn = styled.div` 
margin-left: auto;  
  display: flex;
  flex-direction: row;  
  width: 42%;     
`;

const Btn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  margin-right:145px;
 
  &:hover {
    cursor: pointer;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const DivPayments = styled.div`
margin-top: 100px;  
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width:80%;
`;

const Span = styled.span`
  margin-left: "10px";
  margin-right: "8px";
  margin: 3%;
`;

const Info = styled.div`
margin-left: "10px";
  border: 2px solid white;
  width: 500px;
`;

const Container = styled.div`
  font-size: 28px;
  display: flex;
  width: 100%;
  flex-direction: row;  
  color: white; //#1d4555;
  background-color: rgb(194, 201, 202);     
  margin-left: 5%; 
  width: 80%;
  height: 80%;
`;

const TabHeader = styled.div`
  font-size: 28px;
  display: flex; 
  flex-direction: row;
  width: 80%;
  color: white; //#1d4555;
  background-color: rgb(194, 201, 202);    
  margin: 0;
  margin-left: 5%;
  border-bottom: 2 px black;   
`;
