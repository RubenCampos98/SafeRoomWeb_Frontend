import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'

/* 
class UtilizadorEditar extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        dataUtilizador: {},
        campNome: "",
        campPassword: "",
        campEmail: "",
        campContacto: 0,
        campMorada: "",
        campCargo: 0
      }
  }
  componentDidMount(){
    let Utilizador_ID = useParams();
    const url = "http://localhost:3001/api/visualizar_user/" + Utilizador_ID;
    axios.get(url)
    .then(res => {
      if(res.data.success){
        const data = res.data.data[0]
        this.setState({
          dataUtilizador: data,
          campNome: data.nome,
          campPassword: data.password,
          campEmail: data.email,
          campContacto: data.contacto,
          campMorada: data.morada,
          campCargo: data.cargo
        })
      } else {
        alert("Error web service")
      }
    })
    .catch(error => {
      alert("--||-> " + error)
    })}

  render(){
      return(
        <form>
          <div className="mb-3">
            <label className="form-label">Nomeeee</label>
            <input type="text" className="form-control" 
            name='campNome'
            defaultValue={this.state.campNome} 
            onChange={(value)=>this.setState({ campNome: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" 
            name='campPassword'
            defaultValue={this.state.campPassword} 
            onChange={(value)=>this.setState({ campPassword: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" 
            name='campEmail'
            defaultValue={this.state.campEmail} 
            onChange={(value)=>this.setState({ campEmail: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Morada</label>
            <input type="text" className="form-control" 
            name='campMorada'
            defaultValue={this.state.campMorada} 
            onChange={(value)=>this.setState({ campMorada: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Contacto</label>
            <input type="text" className="form-control" 
            name='campContacto'
            defaultValue={this.state.campContacto} 
            onChange={(value)=>this.setState({ campContacto: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input type="number" className="form-control" 
            name='campCargo'
            defaultValue={this.state.campCargo} 
            onChange={(value)=>this.setState({campCargo: value.target.value})}/>
          </div>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Save changes</button>
        </form>

      );
  }

  sendUpdate(){
    let Utilizador_ID = this.props.match.params.id_user;
    const baseUrl = "http://localhost:3001/api/editar_user/" + Utilizador_ID
    const datapost = {
      nome : this.state.campNome,
      password : this.state.campPassword,
      email : this.state.campEmail,
      contacto : this.state.campContacto,
      morada : this.state.campMorada,
      cargo: this.state.campCargo 
    }
    axios.put(baseUrl, datapost)
    .then(response => {
        if(response.data.success === true){
            alert(response.data.message)
        }
        else {
            alert("Error")
        }
    }).catch(error => {
        alert("Error 34: " + error)
    })
  }

}

export default UtilizadorEditar; */


const UtilizadorEditar = () => {

  return(
    <form>
    <div className="mb-3">
      <label className="form-label">Nomeeee</label>
      <input type="text" className="form-control" 
      name='campNome'
      defaultValue={this.state.campNome} 
      onChange={(value)=>this.setState({ campNome: value.target.value })}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input type="text" className="form-control" 
      name='campPassword'
      defaultValue={this.state.campPassword} 
      onChange={(value)=>this.setState({ campPassword: value.target.value })}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input type="email" className="form-control" 
      name='campEmail'
      defaultValue={this.state.campEmail} 
      onChange={(value)=>this.setState({ campEmail: value.target.value })}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Morada</label>
      <input type="text" className="form-control" 
      name='campMorada'
      defaultValue={this.state.campMorada} 
      onChange={(value)=>this.setState({ campMorada: value.target.value })}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Contacto</label>
      <input type="text" className="form-control" 
      name='campContacto'
      defaultValue={this.state.campContacto} 
      onChange={(value)=>this.setState({ campContacto: value.target.value })}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Cargo</label>
      <input type="number" className="form-control" 
      name='campCargo'
      defaultValue={this.state.campCargo} 
      onChange={(value)=>this.setState({campCargo: value.target.value})}/>
    </div>
    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Save changes</button>
  </form>
  )
}

export default UtilizadorEditar