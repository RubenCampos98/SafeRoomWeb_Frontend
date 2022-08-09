import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React from 'react';
import axios from 'axios'

class Bookings extends React.Component{

  constructor(props){
    super(props);
    this.ok = 1;
    this.state = {
      listReservas:[]
    }
  }

  componentDidMount(){
    this.loadReservas()
  }

  loadReservas(){
    const url = "http://localhost:3001/api/reservas" //"http://localhost:3005/crowd/listarUtilizador"
    axios.get(url)
    .then(res => {
      if(res.data.data != null || res.data.data.length !== 0){
        const data = res.data.data;    
        this.setState({listReservas: data});
      }else{
        alert("Error Web Service");
      }
    })
    .catch(error => {
      alert("Aqui ->" + error)
    });
  }

  render(){
    return (
      <div className='App' style={{border: "1px solid red"}}>
        <div className='row'>
          <div className='col-lg-8 offset-md-3'>
            <h1>Reservas</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Utilizador</th>
                  <th>Sala</th>
                  <th>Data</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fim</th>
                  <th>Estado</th>
                  <th>Limpeza</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {this.loadFillData()}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  loadFillData(){
    return this.state.listReservas.map((data, index) => {
      return(
        <tr key={index}>
          <td>{data.id_reserva}</td>
          <td>{data.id_user}</td>
          <td>{data.id_sala}</td>
          <td>{data.data}</td> 
          <td>{data.hora_inicio}</td>       
          <td>{data.hora_fim}</td>
          <td>{data.estado}</td>
          <td>{data.limpeza}</td>
          <td>{data.notas}</td>
        </tr>    
      )     
    });
  }

}

export default Bookings