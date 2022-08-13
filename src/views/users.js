import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import UtilizadorEditar from '../views/users_edit'
import { useParams } from 'react-router-dom';


function Users(){

  const [id_user, setId_user] = useState(1);
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [morada, setMorada] = useState("");
  const [cargo, setCargo] = useState("");
  const [user, setUser] = useState({})
  const [usersList, setUsersList] = useState([])
  const [getId, setGetId] = useState(1)

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/visualizar_user/${getId}`)
      .then(res => {
        console.log(res.data.data)
        setUser(res.data.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [getId])

  const handleClick = (id_user) => {
    setGetId(id_user)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then(res => {
        console.log(res.data.data)
        setUsersList(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [user])

  const handleEdit = (id_user, nome, password, email, morada, contacto, cargo) => {
    localStorage.getItem('Id_user', id_user)
    localStorage.getItem('Nome', nome)
    localStorage.getItem('Password', password)
    localStorage.getItem('Email', email)
    localStorage.getItem('Morada', morada)
    localStorage.getItem('Contacto', contacto)
    localStorage.getItem('Cargo', cargo)
  }

  const submitUser = () => {
    axios.post("http://localhost:3001/api/criar_user", { 
      id_user: id_user,
      nome: nome,
      password: password,
      email: email,
      contacto: contacto,
      morada: morada,
      cargo: cargo
    });
    setUsersList(
      [...usersList, 
      {id_user: id_user, nome: nome, password: password, email: email, contacto: contacto, morada: morada, cargo: cargo}
    ])
    console.log('deu', nome, password, email, contacto, morada, cargo)
  }

  var index = usersList.map(function(e){
    return e.id_user
  }).indexOf(id_user)

  const editUser = (e) => {
    e.preventDefault();
    let a = usersList[index];
    a.nome = nome;
    a.password = password;
    a.email = email;
    a.contacto = contacto;
    a.morada = morada;
    a.cargo = cargo;
  }

/*   const deleteUser = (nome) => {
    axios.post("http://localhost:3001/api/apagar_user", {
      nome: nome
    })
  } */

  const sendUpdate = () => {
    //let Utilizador_ID = this.props.match.params.id_user;
    const baseUrl = "http://localhost:3001/api/editar_user/" + 14
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
  }

  const sendDelete = (id_user) => {
    const baseUrl = "http://localhost:3001/api/apagar_user"
    axios.post(baseUrl, {
      id_user: id_user
    })
    .then(response => {
      console.log(response.data)
      if(response.data.success){
        Swal.fire(
          'Apagado!',
          'O utilizador foi eliminado!',
          'success'
        )
        //this.loadUsers()
      }
    })
    .catch(error => {
      console.log(error)
      alert("Error 325", error)
    })
  }

  const onDelete = (id_user) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este ficheiro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if(result.value){
          sendDelete(id_user)
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


  return (
    <div className='App' style={{border: "0px solid red"}}>
      <div className='row'>
        <div className='col-lg-10 offset-md-2'>
          {/* <input type="text" value={id_user} onChange={e => setId_user(e.target.value)}/>
          <Button className="btn btn-success" onClick={() => handleClick(4)}>Adicionar</Button>   */}
          <div>
            {user.nome}
          </div>
          <h1>Utilizadores</h1>
          <Button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUser">Adicionar</Button>  
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
              {usersList.map((val) => {
                return(
                  <tr>
                    <td> {val.id_user} </td>
                    <td> {val.nome} </td>
                    <td> {val.email} </td>
                    <td> {val.contacto} </td>
                    <td> {val.morada} </td>
                    <td> {val.cargo} </td>
                    <td> {val.estadoconta} </td>
                    <td> {val.datavalidacao} </td>
                    <td>
                      <Button className="btn btn-success"
                      data-bs-toggle="modal" data-bs-target="#editUser"
                      onClick={() => handleClick(val.id_user)}>Editar</Button>  
                    </td>
                    <td>
                      <Button className="btn btn-danger"
                      onClick={() => onDelete(val.id_user)}>Apagar</Button>  
                    </td>
                  </tr>
                ) 
              })}
            </tbody>
          </Table>
{/*           <div>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" 
              name='nome'
              onChange={(e) => { 
                setNome(e.target.value) 
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="text" className="form-control" 
              name='password'
              onChange={(e) => { 
                setPassword(e.target.value) 
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" 
              name='email'
              onChange={(e) => { 
                setEmail(e.target.value) 
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Morada</label>
            <input type="text" className="form-control" 
              name='morada'
              onChange={(e) => { 
                setMorada(e.target.value) 
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contacto</label>
            <input type="text" className="form-control" 
              name='contacto'
              onChange={(e) => { 
                setContacto(e.target.value) 
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cargo</label>
            <input type="number" className="form-control" 
              name='cargo'
              onChange={(e) => { 
                setCargo(e.target.value) 
              }}
            />
          </div>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary" onClick={() => submitUser()}>Save changes</button>
          
        </div> */}
      </div>
    </div>

      <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" 
                  name='nome'
                  onChange={(e) => { 
                    setNome(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="text" className="form-control" 
                  name='password'
                  onChange={(e) => { 
                    setPassword(e.target.value) 
                  }}
                />
              </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" 
                    name='email'
                    onChange={(e) => { 
                      setEmail(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Morada</label>
                  <input type="text" className="form-control" 
                    name='morada'
                    onChange={(e) => { 
                      setMorada(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contacto</label>
                  <input type="text" className="form-control" 
                    name='contacto'
                    onChange={(e) => { 
                      setContacto(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cargo</label>
                  <input type="number" className="form-control" 
                    name='cargo'
                    onChange={(e) => { 
                      setCargo(e.target.value) 
                    }}
                  />
                </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={() => submitUser()}>Save changes</button>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Utilizador</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" 
                  name='nome'
                  value={user.nome}
                  onChange={(e) => { 
                    setUser(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="text" className="form-control" 
                  name='password'
                  value={user.password}
                  onChange={(e) => { 
                    setUser(e.target.value) 
                  }}
                />
              </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" 
                    name='email'
                    value={user.email}
                    onChange={(e) => { 
                      setUsersList(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Morada</label>
                  <input type="text" className="form-control" 
                    name='morada'
                    value={user.morada}
                    onChange={(e) => { 
                      setMorada(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contacto</label>
                  <input type="text" className="form-control" 
                    name='contacto'
                    value={user.contacto}
                    onChange={(e) => { 
                      setContacto(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cargo</label>
                  <input type="number" className="form-control" 
                    name='cargo'
                    value={user.cargo}
                    onChange={(e) => { 
                      setCargo(e.target.value) 
                    }}
                  />
                </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={() => editUser()}>Save changes</button>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Users

/* class Users extends React.Component{   

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
    //let params = useParams();
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
        </div> */


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

/*       </div>
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
            onClick={function(event){ 
              console.log(data.id_user); 
              this.visualizarUser()
            }} 
            onClick={() => { this.visualizarUser() }}
            >Editar</Button>  
          </td>
          <td>
            <Button className="btn btn-danger">Apagar</Button>  
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

  sendUpdate(){
    //let Utilizador_ID = this.props.match.params.id_user;
    const baseUrl = "http://localhost:3001/api/editar_user/" + 11
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
}

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

 */