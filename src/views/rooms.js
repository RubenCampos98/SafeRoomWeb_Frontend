import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Rooms(){

  const [id_sala, setId_sala] = useState(1);
  const [id_centro, setId_centro] = useState("");
  const [id_cancelamento, setId_cancelamento] = useState("")
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [alocacaomax, setAlocacaomax] = useState("");
  const [limpeza, setLimpeza] = useState("");
  const [sala, setSala] = useState({})
  const [salasList, setSalasList] = useState([])
  const [getId, setGetId] = useState(2)

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/salas")
      .then(res => {
        console.log(res.data.data)
        setSalasList(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [sala])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/visualizar_sala/${getId}`)
      .then(res => {
        console.log(res.data.data[0])
        setSala(res.data.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [getId])

  const handleClick = (id_sala) => {
    setGetId(id_sala)
  }

  const submitSala = () => {
    axios.post("http://localhost:3001/api/criar_sala", { 
      id_sala: id_sala,
      id_centro: id_centro,
      id_cancelamento: id_cancelamento,
      nome: nome,
      capacidade: capacidade,
      alocacaomax: alocacaomax,
      limpeza: limpeza
    });
    setSalasList(
      [...salasList, 
      {id_sala: id_sala, id_centro: id_centro, id_cancelamento: id_cancelamento, nome: nome, capacidade: capacidade,
      alocacaomax: alocacaomax, limpeza:limpeza}
    ])
    console.log('deu -', nome, capacidade, alocacaomax)
  }

  const sendDelete = (id_sala) => {
    const baseUrl = "http://localhost:3001/api/apagar_sala"
    axios.post(baseUrl, {
      id_sala: id_sala
    })
    .then(response => {
      console.log(response.data)
      if(response.data.success){
        Swal.fire(
          'Apagado!',
          'Sala eliminada!',
          'success'
        )
      }
    })
    .catch(error => {
      console.log(error)
      alert("Error 325", error)
    })
  }

  const onDelete = (id_sala) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este ficheiro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if(result.value){
          sendDelete(id_sala)
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
            <h1>Salas</h1>
            <Button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addSala">Adicionar</Button> 
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
                {salasList.map((val) => {
                return(
                  <tr>
                    <td> {val.id_sala} </td>
                    <td> {val.id_centro} </td>
                    <td> {val.id_cancelamento} </td>
                    <td> {val.nome} </td>
                    <td> {val.capacidade} </td>
                    <td> {val.alocacaomax} </td>
                    <td> {val.limpeza} </td>
                    <td>
                      <Button className="btn btn-success"
                      data-bs-toggle="modal" data-bs-target="#editSala"
                      onClick={() => handleClick(val.id_sala)}>Editar</Button>  
                    </td>
                    <td>
                      <Button className="btn btn-danger"
                      onClick={() => onDelete(val.id_sala)}>Apagar</Button>  
                    </td>
                  </tr>
                  ) 
                })}
              </tbody>
            </Table>
          </div>
        </div>

      <div className="modal fade" id="addSala" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Adicionar Sala</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Centro</label>
                <input type="text" className="form-control" 
                  name='id_centro'
                  onChange={(e) => { 
                    setId_centro(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cancelamento</label>
                <input type="text" className="form-control" 
                  name='id_cancelamento'
                  onChange={(e) => { 
                    setId_cancelamento(e.target.value) 
                  }}
                />
              </div>
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
                <label className="form-label">Capacidade</label>
                <input type="text" className="form-control" 
                  name='capacidade'
                  onChange={(e) => { 
                    setCapacidade(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Alocação Máxima</label>
                <input type="text" className="form-control" 
                  name='alocacaomax'
                  onChange={(e) => { 
                    setAlocacaomax(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Limpeza</label>
                <input type="text" className="form-control" 
                  name='limpeza'
                  onChange={(e) => { 
                    setLimpeza(e.target.value) 
                  }}
                />
              </div>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={() => submitSala()}>Save changes</button>
            </div>
            <div className="modal-footer">
            </div>
          </div>
          </div>
        </div>

        
      <div className="modal fade" id="editSala" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Sala</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
                <label className="form-label">Centro</label>
                <input type="text" className="form-control" 
                  name='id_centro'
                  value={sala.id_centro}
                  onChange={(e) => { 
                    setId_centro(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cancelamento</label>
                <input type="text" className="form-control" 
                  name='id_cancelamento'
                  value={sala.id_cancelamento}
                  onChange={(e) => { 
                    setId_cancelamento(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" 
                  name='nome'
                  value={sala.nome}
                  onChange={(e) => { 
                    setNome(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacidade</label>
                <input type="text" className="form-control" 
                  name='capacidade'
                  value={sala.capacidade}
                  onChange={(e) => { 
                    setCapacidade(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Alocação Máxima</label>
                <input type="text" className="form-control" 
                  name='alocacaomax'
                  value={sala.alocacaomax}
                  onChange={(e) => { 
                    setAlocacaomax(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Limpeza</label>
                <input type="text" className="form-control" 
                  name='limpeza'
                  value={sala.limpeza}
                  onChange={(e) => { 
                    setLimpeza(e.target.value) 
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

export default Rooms