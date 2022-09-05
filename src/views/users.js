import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Papa from "papaparse";


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
  //---------------------------------------------------------------------
  const [newNome, setNewNome] = useState(user.nome)
  const [newPassword, setNewPassword] = useState(user.password)
  const [newEmail, setNewEmail] = useState(user.email)
  const [newContacto, setNewContacto] = useState(user.contacto)
  const [newMorada, setNewMorada] = useState(user.morada)
  const [newCargo, setNewCargo] = useState(user.cargo)
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    //console.log(event.target.files[0])
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log('dados ', results.data)
        setCsvArray(results.data)
        console.log('Array ', csvArray)
      },
    });
  };

  const submitBulk = () => {
    console.log('FFF', csvArray)
/*     const arrrray = [...csvArray]    acho que o erro está nas pelicas que faltam no array proveniente do ficheiro
    arrrray.push(todo)
    setCsvArray(arrrray)
    console.log(csvArray) */
    axios
      .post("http://localhost:3001/api/criar_users", { 
        csvArray
      })
      .then(res => {
        console.log('ok ', csvArray)
        console.log(res.data)
      })
      .catch(err => {
        console.log('NOT ok ', csvArray)
        console.log(err)
      }); 
    setUsersList(
      [...usersList, 
      {id_user: id_user, nome: nome, password: password, email: email, contacto: contacto, morada: morada, cargo: cargo}
    ])
  }

/*   const processCSV = (str, delim=',') => {
    const headers = str.slice(0,str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n')+1).split('\n');
    const newArray = rows.map(row => {
      const values = row.split(delim);
      const eachUser = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {})
      return eachUser;
    })
    setCsvArray(newArray)
    console.log(csvArray)
    console.log(newArray)
    console.log(JSON.stringify(csvArray, null, " "))
  }

  const submitFile = () => {
    const file = csvFile;
    const reader = new FileReader();
    reader.onload = function(e){
      const text = e.target.result;
      console.log(text)
      processCSV(text)
    }
    reader.readAsText(file);
  }  */

  useEffect(() => {
    viewUser()
  }, [])

  const viewUser = () => {
    axios
      .get("http://localhost:3001/api/users")
      .then(res => {
        console.log(res.data.data)
        setUsersList(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

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

  const editUser = () => {
    axios.put(`http://localhost:3001/api/editar_user/${getId}`, { 
      nome: newNome,
      password: newPassword,
      email: newEmail,
      contacto: newContacto,
      morada: newMorada,
      cargo: newCargo
    });
    window.location.reload()
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
          <h1>Utilizadores</h1>
          <Button className="btn btn-success mb-5" data-bs-toggle="modal" data-bs-target="#addUser">Adicionar</Button>  
          <input type="file" accept=".csv" id="csvFile" className="mb-5" onChange={changeHandler} />  
{/*           <Button onClick={(e) => { 
            e.preventDefault()
            if(csvFile)submitFile() 
          }}>
            Importar
          </Button> */}
{/*           {csvArray.map((val) => {
            return(
              <h3>nome: "{val.nome}", email: "{val.email}", password: "{val.password}", contacto: "{val.contacto}", cargo: "{val.cargo}"</h3>
            )
          })} */}
{/*           <textarea class="form-control" type="text" onChange={(e) => { 
                      setCsvArray(e.target.value)  
                    }}></textarea> */}
          <button className="btn btn-danger" onClick={submitBulk}>DADOS ARRAY</button>
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
        </div>
      </div>

      <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Adicionar Utilizador</h5>
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
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={() => submitUser()}>Submeter</button>
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
                  defaultValue={user.nome}
                  onChange={(e) => { 
                    setNewNome(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="text" className="form-control" 
                  name='password'
                  defaultValue={user.password}
                  onChange={(e) => { 
                    setNewPassword(e.target.value) 
                  }}
                />
              </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" 
                    name='email'
                    defaultValue={user.email}
                    onChange={(e) => { 
                      setNewEmail(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Morada</label>
                  <input type="text" className="form-control" 
                    name='morada'
                    defaultValue={user.morada}
                    onChange={(e) => { 
                      setNewMorada(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contacto</label>
                  <input type="text" className="form-control" 
                    name='contacto'
                    defaultValue={user.contacto}
                    onChange={(e) => { 
                      setNewContacto(e.target.value) 
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cargo</label>
                  <input type="number" className="form-control" 
                    name='cargo'
                    defaultValue={user.cargo}
                    onChange={(e) => { 
                      setNewCargo(e.target.value) 
                    }}
                  />
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={() => editUser()}>Submeter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users