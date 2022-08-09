import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import UtilizadorEditar from '../views/users_edit'


/* const state = () => {

  const [user, setUser] = useState({
    nome: "",
    password: "",
    email: "",
    contacto: 0,
    morada: "",
    cargo: 0,
    estadoconta: 0
  });

  const {
    nome,
    password,
    email,
    contacto,
    morada,
    cargo,
    estadoconta
  } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/criar_user", user)
    alert('DEUUUUUU')
  }

  return (
    <div className='App' style={{border: "1px solid red"}}>
        <div className='row'>
          <div className='col-lg-10 offset-md-2'>
            <h1>Utilizadores</h1>
            <Button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#stateModal">Adicionar</Button>  
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Contacto</th>
                  <th>Morada</th>
                  <th>Cargo</th>
                  <th>Estado Conta</th>
                  <th>Data Validação</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                nada
              </tbody>
            </Table>
          </div>
        </div>

        <div className="modal fade" id="stateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={e => onSubmit(e)}>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name='nome'
                    defaultValue={nome} 
                    onChange={e => onInputChange(e)}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="text" className="form-control" name='password'
                    defaultValue={password} 
                    onChange={e => onInputChange(e)}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name='email'
                    defaultValue={email} 
                    onChange={e => onInputChange(e)}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Morada</label>
                    <input type="text" className="form-control" name='morada'
                    defaultValue={morada} 
                    onChange={e => onInputChange(e)}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contacto</label>
                    <input type="text" className="form-control" name='contacto'
                    defaultValue={contacto} 
                    onChange={e => onInputChange(e)}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cargo</label>
                    <input type="number" className="form-control" name='cargo'
                    defaultValue={cargo} 
                    onChange={e => onInputChange(e)}/>
                  </div>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
                </form>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
  );

}

export default state */

class Users extends React.Component{   

  constructor(props){
    super(props);
    this.state = {
      listUsers: [],
      campNome: "",
      campPassword: "",
      campEmail: "",
      campContacto: 0,
      campMorada: "",
      campCargo: 0,
      dataUtilizador: {},
      campNome_Edit: "",
      campPassword_Edit: "",
      campEmail_Edit: "",
      campContacto_Edit: 0,
      campMorada_Edit: "",
      campCargo_Edit: 0,

    }
  }

  componentDidMount(){
    this.loadUsers()
    //this.visualizarUser()
  }

  loadUsers(){
    const url = "http://localhost:3001/api/users" 
    axios.get(url)
    .then(res => {
      if(res.data.data != null || res.data.data.length !== 0){
        const data = res.data.data;    
        this.setState({listUsers: data});
      }else{
        alert("Error Web Service");
      }
    })
    .catch(error => {
      alert("Aqui ->" + error)
    });
  }

  //usar funcao do estagio, click no ecra vai busvar id

  visualizarUser(){
    
    let Utilizador_ID = this.props.match.params.id_user;
    const url = "http://localhost:3001/api/visualizar_user/" + Utilizador_ID
    axios.get(url)
    .then(res => {
      if(res.data.success){
        const data = res.data.data[0]
        this.setState({
          dataUtilizador: data,
          campNome_Edit: data.nome,
          campPassword_Edit: data.password,
          campEmail_Edit: data.email,
          campContacto_Edit: data.contacto,
          campMorada_Edit: data.morada,
          campCargo_Edit: data.cargo
        })
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error => {
      alert("--||-> " + error)
    })
  }

  render(){
    return (
      <div className='App' style={{border: "1px solid red"}}>
        <div className='row'>
          <div className='col-lg-10 offset-md-2'>
            <h1>Utilizadores</h1>
            <Button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUserModal">Adicionar</Button>  
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Contacto</th>
                  <th>Morada</th>
                  <th>Cargo</th>
                  <th>Estado Conta</th>
                  <th>Data Validação</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {this.loadFillData()}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Adicionar Utilizador</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
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
                    <input type="email" className="form-control" name='campEmail'
                    defaultValue={this.state.campEmail} 
                    onChange={(value)=>this.setState({campEmail:value.target.value})}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Morada</label>
                    <input type="text" className="form-control" name='campMorada'
                    defaultValue={this.state.campMorada} 
                    onChange={(value)=>this.setState({campMorada:value.target.value})}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contacto</label>
                    <input type="text" className="form-control" name='campContacto'
                    defaultValue={this.state.campContacto} 
                    onChange={(value)=>this.setState({campContacto:value.target.value})}/>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cargo</label>
                    <input type="number" className="form-control" name='campCargo'
                    defaultValue={this.state.campCargo} 
                    onChange={(value)=>this.setState({campCargo:value.target.value})}/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Editar Utilizador</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <UtilizadorEditar/>
              </div>
            </div>
          </div>
        </div>


{/*         <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Editar Utilizador</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" 
            name='campNome'
            defaultValue={this.state.campNome_Edit} 
            onChange={(value)=>this.setState({ campNome_Edit: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" 
            name='campPassword'
            defaultValue={this.state.campPassword_Edit} 
            onChange={(value)=>this.setState({ campPassword_Edit: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" 
            name='campEmail'
            defaultValue={this.state.campEmail_Edit} 
            onChange={(value)=>this.setState({ campEmail_Edit: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Morada</label>
            <input type="text" className="form-control" 
            name='campMorada'
            defaultValue={this.state.campMorada_Edit} 
            onChange={(value)=>this.setState({ campMorada_Edit: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Contacto</label>
            <input type="text" className="form-control" 
            name='campContacto'
            defaultValue={this.state.campContacto_Edit} 
            onChange={(value)=>this.setState({ campContacto_Edit: value.target.value })}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input type="number" className="form-control" 
            name='campCargo'
            defaultValue={this.state.campCargo_Edit} 
            onChange={(value)=>this.setState({campCargo_Edit: value.target.value})}/>
          </div>

        </form>
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Save changes</button>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    );
  }

  loadFillData(){
    return this.state.listUsers.map((data, index) => {
      return(
        <tr key={index}>
          <td>{data.id_user}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.contacto}</td> 
          <td>{data.morada}</td> 
          <td>{data.cargo}</td>       
          <td>{data.estadoconta}</td>
          <td>{data.datavalidacao}</td>
          <td>
            <Button 
            data-bs-toggle="modal" 
            data-bs-target="#editUserModal"
            >Editar</Button>  
          </td>
          <td>
            <Button className="btn btn-danger" 
            onClick={()=>this.onDelete(data.id_user)}>Apagar</Button>  
          </td>
        </tr>    
      )     
    });
  }

  sendSave(){
    const baseUrl = "http://localhost:3001/api/criar_user"
    const datapost = {
    nome : this.state.campNome,
    password : this.state.campPassword,
    email : this.state.campEmail,
    contacto : this.state.campContacto,
    morada : this.state.campMorada,
    cargo: this.state.campCargo
    }
    axios.post(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
        console.log('ok')
      }
      else {
        alert(response.data.message)
        console.log('not ok')
      }
    }).catch(error=>{
      alert("Error 34 " + error)
    })
  }

/*   sendUpdate(){
    let Utilizador_ID = this.props.match.params.id_user;
    const baseUrl = "http://localhost:3001/api/editar_user/" + Utilizador_ID
    const datapost = {
      nome : this.state.campNome_Edit,
      password : this.state.campPassword_Edit,
      email : this.state.campEmail_Edit,
      contacto : this.state.campContacto_Edit,
      morada : this.state.campMorada_Edit,
      cargo: this.state.campCargo_Edit 
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
} */

  onDelete(id_user){
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este ficheiro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if(result.value){
          this.sendDelete(id_user)
        }else 
        if(result.dismiss === Swal.DismissReason.cancel){
          Swal.fire(
            'Cancelado',
            'Operação cancelada!',
            'error'
          )
        }
    })
  }

  sendDelete(id_user){
    const baseUrl = "http://localhost:3001/api/apagar_user"
    axios.post(baseUrl, {
      id_user: id_user
    })
    .then(response => {
      if(response.data.success){
        Swal.fire(
          'Apagado!',
          'O utilizador foi eliminado!',
          'success'
        )
        this.loadUsers()
      }
    })
    .catch(error => {
      alert("Error 325")
    })
  }

} 

export default Users

