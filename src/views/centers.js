import '../assets/styles/login.css'
import { Button, Table, ToastContainer } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast';
import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Centros(){

  const [id_centro, setId_centro] = useState(1);
  const [localidade, setLocalidade] = useState("");
  const [nome, setNome] = useState("")
  const [notas, setNotas] = useState("");
  const [centro, setCentro] = useState({})
  const [centrosList, setCentrosList] = useState([])
  const [getId, setGetId] = useState(1)
  const [show, setShow] = useState(false);
  //---------------------------------------------------------------------
  const [newLocalidade, setNewLocalidade]= useState(centro.localidade)
  const [newNome, setNewNome] = useState(centro.nome)
  const [newNotas, setNewNotas]= useState(centro.notas)

  const notify = () => toast.success('Here is your toast.');

  useEffect(() => {
    viewCentros();
  }, []);

  const viewCentros = () => {
    axios
      .get("http://localhost:3001/api/centros")
      .then(res => {
        setCentrosList(res.data.data) 
      })
      .catch(err => {
        toast.error('Erro a carregar os dados')
      })
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/visualizar_centro/${getId}`)
      .then(res => {
        console.log(res.data.data)
        setCentro(res.data.data[0])
      })
      .catch(err => {
        toast.error('Erro')
      })
  }, [getId])

  const handleClick = (id_centro) => {
    setGetId(id_centro)
  }

  const submitCentro = () => {
    axios.post("http://localhost:3001/api/criar_centro", { 
      id_centro: id_centro,
      localidade: localidade,
      nome: nome,
      notas: notas
    });
    setCentrosList([
      ...centrosList, 
      {id_centro: id_centro, localidade: localidade, nome: nome, notas: notas}
    ])
  }

  const editCentro = () => {
    axios.put(`http://localhost:3001/api/editar_centro/${getId}`, { 
      localidade: newLocalidade,
      nome: newNome,
      notas: newNotas
    });
  }

  const sendDelete = (id_centro) => {
    const baseUrl = "http://localhost:3001/api/apagar_centro"
    axios.post(baseUrl, {
      id_centro: id_centro
    })
    .then(response => {
      console.log(response.data)
      if(response.data.success){
        Swal.fire(
          'Apagado!',
          'O utilizador foi eliminado!',
          'success'
        )
      }
    })
    .catch(error => {
      toast.error('Erro ao apagar centro')
    })
  }

  const onDelete = (id_centro) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este ficheiro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if(result.value){
          sendDelete(id_centro)
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
    <div className='App' style={{border: "1px solid red"}}>
      <div className='row'>
        <div className='col-lg-8 offset-md-3'>
          <h1>Centros</h1>
          <Button className="btn btn-success mb-5" data-bs-toggle="modal" data-bs-target="#addCentro">Adicionar</Button> 
          <Button className="mb-5" onClick={() => setShow(true)}>Show Toast</Button>
          <Button className="mb-5" onClick={notify}>Hot Toast</Button>
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: 'white',
                },
              },
              error: {
                style: {
                  background: 'white',
                },
              },
            }}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Localidade</th>
                <th>Nome</th>
                <th>Estado</th>
                <th>Notas</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
            {centrosList.map((val) => {
              return(
                <tr>
                  <td> {val.id_centro} </td>
                  <td> {val.localidade} </td>
                  <td> {val.nome} </td>
                  {val.estado === 0 ? 
                    <td> Inativo </td> :
                    <td> Ativo </td>
                  }
                  <td> {val.notas} </td>
                  <td>
                    <Button className="btn btn-success"  style={{marginRight: "20px"}}
                    data-bs-toggle="modal" data-bs-target="#editCentro"
                    onClick={() => handleClick(val.id_centro)}>Editar</Button>  
                    <Button className="btn btn-danger"
                    onClick={() => onDelete(val.id_centro)}>Apagar</Button>  
                  </td>
                </tr>
              ) 
            })}
            </tbody>
          </Table>
        </div>
      </div>

      <ToastContainer position="top-end">
        <Toast bg="info" onClose={() => setShow(false)} show={show}>
          <Toast.Header>
            <img src="../assets/images/logo.png" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="modal fade" id="addCentro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Adicionar Centro</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Localidade</label>
                <input type="text" className="form-control" 
                  name='localidade'
                  onChange={(e) => { 
                    setLocalidade(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" 
                  name='nome'
                  value={nome}
                  onChange={(e) => { 
                    setNome(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notas</label>
                <input type="text" className="form-control" 
                  name='notas'
                  onChange={(e) => { 
                    setNotas(e.target.value) 
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={() => submitCentro()}>Submeter</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editCentro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Centro</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Localidade</label>
                <input type="text" className="form-control" 
                  name='localidade'
                  defaultValue={centro.localidade}
                  onChange={(e) => { 
                    setNewLocalidade(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" 
                  name='nome'
                  defaultValue={centro.nome}
                  onChange={(e) => { 
                    setNewNome(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notas</label>
                <input type="text" className="form-control" 
                  name='notas'
                  defaultValue={centro.notas}
                  onChange={(e) => { 
                    setNewNotas(e.target.value) 
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={() => editCentro()}>Submeter</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Centros