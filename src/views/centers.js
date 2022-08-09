import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React from 'react';
import axios from 'axios'

class Centers extends React.Component{

  constructor(props){
    super(props);
    this.ok = 1;
    this.state = {
      listCentros:[]
    }
  }

  componentDidMount(){
    this.loadCentros()
  }

  loadCentros(){
    const url = "http://localhost:3001/api/centros" //"http://localhost:3005/crowd/listarUtilizador"
    axios.get(url)
    .then(res => {
      if(res.data.data != null || res.data.data.length !== 0){
        const data = res.data.data;    
        this.setState({listCentros: data});
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
            <h1>Centros</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Localidade</th>
                  <th>Estado</th>
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
    return this.state.listCentros.map((data, index) => {
      return(
        <tr key={index}>
          <td>{data.id_centro}</td>
          <td>{data.localidade}</td>
          <td>{data.estado}</td>
          <td>{data.notas}</td> 
        </tr>    
      )     
    });
  }

}

export default Centers