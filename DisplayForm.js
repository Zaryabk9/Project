import { useState,useEffect } from "react";
import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';


function DisplayForm(){
         const[listofUsers,setlistofUsers]=useState([{}]);
        

        useEffect(() => {
            (async () => {
              const token = localStorage.getItem('token');
              const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              };
        
              await fetch('http://localhost:3002/admin/viewusers', {
                headers: headers
              })
                .then(response => response.json())
                .then(data => setlistofUsers(data))
                .catch(error => console.error(error));
            })();
          }, []);

        return(

<div className="CustomerDetails">
  {listofUsers.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <MDBTable>
      <MDBTableHead light>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Email</th>
          <th scope='col'>Name</th>
          <th scope='col'>Password</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {listofUsers.map((customer, i) => (
          <tr key={i}>
            <th scope='row'>{i + 1}</th>
            <td>{customer.email}</td>
            <td>{customer.name}</td>
            <td>{customer.password}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  )}
</div>



        )
}
export default DisplayForm;