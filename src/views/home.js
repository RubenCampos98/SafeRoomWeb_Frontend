import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Home = () => {

  const [usersCount, setusersCount] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/contar_users")
      .then(res => {
        console.log(res.data.data)
        setusersCount(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  })

  return (
    <div className='App' style={{border: "1px solid red"}}>
      <div className='row'>
        <div className='col-lg-6 offset-md-3'>
          <h1>HomePage</h1>
          <Table striped bordered hover className='col-lg-3 offset-md-0'>
              <thead>
                <tr>
                  <th>% Alocação Diária(e mensal)</th>
                  <th>Nº de reservas(por range de data)</th> 
                  <th>Nª utilizadores registados</th>  
                </tr>
              </thead>
              <tbody>
                <td>{ usersCount }</td>
              </tbody>
            </Table>
          <Table striped bordered hover className='col-lg-3 offset-md-6'>
              <thead>
                <tr>
                  <th>% Salas + usadas</th>
                  <th>Realtime data marcaçao salas</th>
                  <th>Necessidade de limpeza</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </Table>
        </div>
      </div>
    </div>
  );
}

export default Home