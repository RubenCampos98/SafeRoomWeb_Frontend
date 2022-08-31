import '../assets/styles/login.css'
import { Button, Table } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Bookings (){
  //nao apagar reserva com ID == 2 (linha 20)
  const [id_reserva, setId_reserva] = useState(1);
  const [id_user, setId_user] = useState("");
  const [id_sala, setId_sala] = useState("")
  const [data, setData] = useState("");
  const [hora_inicio, setHora_inicio] = useState("");
  const [hora_fim, setHora_fim] = useState("");
  const [limpeza, setLimpeza] = useState("");
  const [notas, setNotas] = useState("");
  const [reserva, setReserva] = useState({})
  const [reservasList, setReservasList] = useState([])
  const [getId, setGetId] = useState(2)
  //---------------------------------------------------------------------
  const [newUser, setNewUser] = useState(reserva.id_user)
  const [newSala, setNewSala] = useState(reserva.id_sala)
  const [newData, setNewData] = useState(reserva.data)
  const [newHoraInicio, setNewHoraInicio] = useState(reserva.hora_inicio) 
  const [newHoraFim, setNewHoraFim] = useState(reserva.hora_fim) 
  const [newLimpeza, setNewLimpeza] = useState(reserva.limpeza)
  const [newNotas, setNewNotas] = useState(reserva.notas)

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/reservas")
      .then(res => {
        console.log(res.data.data)
        setReservasList(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [reserva])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/visualizar_reserva/${getId}`)
      .then(res => {
        console.log(res.data.data)
        setReserva(res.data.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [getId])

  const handleClick = (id_reserva) => {
    setGetId(id_reserva)
  }

  const submitReserva = () => {
    axios.post("http://localhost:3001/api/criar_reserva", { 
      id_reserva: id_reserva,
      id_user: id_user,
      id_sala: id_sala,
      data: data,
      hora_inicio: hora_inicio,
      hora_fim: hora_fim,
      limpeza: limpeza,
      notas: notas
    });
    setReservasList(
      [...reservasList, 
      {id_reserva: id_reserva, id_user: id_user, id_sala: id_sala, data: data, hora_inicio: hora_inicio, hora_fim: hora_fim,
      limpeza: limpeza, notas: notas}
    ])
  }

  const editReserva = () => {
    axios.put(`http://localhost:3001/api/editar_reserva/${getId}`, { 
      id_user: newUser,
      id_sala: newSala,
      data: newData,
      hora_inicio: newHoraInicio,
      hora_fim: newHoraFim,
      limpeza: newLimpeza,
      notas: newNotas
    });
    window.location.reload()
  }

  const sendDelete = (id_reserva) => {
    const baseUrl = "http://localhost:3001/api/apagar_reserva"
    axios.post(baseUrl, {
      id_reserva: id_reserva
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

  const onDelete = (id_reserva) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'Não poderá recuperar este ficheiro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
        if(result.value){
          sendDelete(id_reserva)
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
          <h1>Reservas</h1>
          <Button className="btn btn-success mb-5" data-bs-toggle="modal" data-bs-target="#addReserva">Adicionar</Button> 
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
              {reservasList.map((val) => {
                return(
                  <tr>
                    <td> {val.id_reserva} </td>
                    <td> {val.utilizadore.nome} </td>
                    <td> {val.sala.nome} </td>
                    <td> {val.data} </td>
                    <td> {val.hora_inicio} </td>
                    <td> {val.hora_fim} </td>
                    <td> {val.limpeza} </td>
                    <td> {val.notas} </td>
                    <td>
                      <Button className="btn btn-success"
                      data-bs-toggle="modal" data-bs-target="#editReserva"
                      onClick={() => handleClick(val.id_reserva)}>Editar</Button>  
                    </td>
                    <td>
                      <Button className="btn btn-danger"
                      onClick={() => onDelete(val.id_reserva)}>Apagar</Button>  
                    </td>
                  </tr>
                ) 
              })}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="modal fade" id="addReserva" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Adicionar Reserva</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Utilizador</label>
                <input type="text" className="form-control" 
                  name='id_user'
                  onChange={(e) => { 
                    setId_user(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sala</label>
                <input type="text" className="form-control" 
                  name='id_sala'
                  onChange={(e) => { 
                    setId_sala(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Data</label>
                <input type="text" className="form-control" 
                  name='data'
                  onChange={(e) => { 
                    setData(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hora Inicio</label>
                <input type="text" className="form-control" 
                  name='hora_inicio'
                  onChange={(e) => { 
                    setHora_inicio(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hora Fim</label>
                <input type="text" className="form-control" 
                  name='hora_fim'
                  onChange={(e) => { 
                    setHora_fim(e.target.value) 
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
              <button type="submit" className="btn btn-primary" onClick={() => submitReserva()}>Submeter</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editReserva" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Reserva</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
                <label className="form-label">Utilizador</label>
                <input type="text" className="form-control" 
                  name='id_user'
                  defaultValue={reserva.id_user}
                  onChange={(e) => { 
                    setNewUser(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sala</label>
                <input type="text" className="form-control" 
                  name='id_sala'
                  defaultValue={reserva.id_sala}
                  onChange={(e) => { 
                    setNewSala(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Data</label>
                <input type="text" className="form-control" 
                  name='data'
                  defaultValue={reserva.data}
                  onChange={(e) => { 
                    setNewData(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hora Inicio</label>
                <input type="text" className="form-control" 
                  name='hora_inicio'
                  defaultValue={reserva.hora_inicio}
                  onChange={(e) => { 
                    setNewHoraInicio(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Hora Fim</label>
                <input type="text" className="form-control" 
                  name='hora_fim'
                  defaultValue={reserva.hora_fim}
                  onChange={(e) => { 
                    setNewHoraFim(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Limpeza</label>
                <input type="text" className="form-control" 
                  name='limpeza'
                  defaultValue={reserva.limpeza}
                  onChange={(e) => { 
                    setNewLimpeza(e.target.value) 
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Notas</label>
                <input type="text" className="form-control" 
                  name='notas'
                  defaultValue={reserva.notas}
                  onChange={(e) => { 
                    setNewNotas(e.target.value) 
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-primary" onClick={(e) => editReserva()}>Submeter</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );

}

export default Bookings