import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/centros")
      .then(res => {
        console.log(res.data.data)
        setCentrosList(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [centro])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/visualizar_centro/${getId}`)
      .then(res => {
        console.log(res.data.data)
        setCentro(res.data.data[0])
      })
      .catch(err => {
        console.log(err)
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
    setCentrosList(
      [...centrosList, 
      {id_centro: id_centro, localidade: localidade, nome: nome, notas: notas}
    ])
    console.log('deu -', localidade, notas)
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
      console.log(error)
      alert("Error 325", error)
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
          <Button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCentro">Adicionar</Button> 
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
                  <td> {val.notas} </td>
                  <td>
                    <Button className="btn btn-success"
                    data-bs-toggle="modal" data-bs-target="#editCentro"
                    onClick={() => handleClick(val.id_centro)}>Editar</Button>  
                  </td>
                  <td>
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
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={() => submitCentro()}>Save changes</button>
            </div>
            <div className="modal-footer">
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
                  value={centro.localidade}
                  onChange={(e) => { 
                    setLocalidade(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" 
                  name='nome'
                  value={centro.nome}
                  onChange={(e) => { 
                    setNome(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notas</label>
                <input type="text" className="form-control" 
                  name='notas'
                  value={centro.notas}
                  onChange={(e) => { 
                    setNotas(e.target.value) 
                  }}
                />
              </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Centros