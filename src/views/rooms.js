import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React from 'react';
import axios from 'axios'

class Rooms extends React.Component{

  constructor(props){
    super(props);
    this.ok = 1;
    this.state = {
      listSalas:[]
    }
  }

  componentDidMount(){
    this.loadSalas()
  }

  loadSalas(){
    const url = "http://localhost:3001/api/salas"
    axios.get(url)
    .then(res => {
      if(res.data.data != null || res.data.data.length !== 0){
        const data = res.data.data;    
        this.setState({listSalas: data});
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
            <h1>Salas</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Capacidade(pessoas)</th>
                  <th>Alocação Máxima</th>  
                  <th>Centro</th>  
                  <th>Limpeza</th>  
                  <th>Estado</th>  
                  <th>Cancelamento</th>  
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
    return this.state.listSalas.map((data, index) => {
      return(
        <tr key={index}>
          <td>{data.id_sala}</td>
          <td>{data.nome}</td>
          <td>{data.capacidade}</td>
          <td>{data.alocacaomax}</td> 
          <td>{data.id_centro}</td>
          <td>{data.limpeza}</td>       
          <td>{data.estado}</td>
          <td>{data.id_cancelamento}</td>
        </tr>    
      )     
    });
  }

}

export default Rooms