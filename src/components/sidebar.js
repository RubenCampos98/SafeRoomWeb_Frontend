import React, { useState } from 'react';
import '../assets/styles/sidebar.css';
//-----------------Icons-----------------
import * as IconFa from 'react-icons/fa';
import * as IconBs from 'react-icons/bs';
import * as IconBi from 'react-icons/bi';
import * as IconAi from 'react-icons/ai';

import { Button } from 'react-bootstrap'

import Rooms from '../views/rooms';
import Centers from '../views/centers'
import Users from '../views/users';
import Bookings from '../views/bookings';

const SideBar = () => {

  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)

  const [Room, setRoom] = useState("");
  const [Center, setCenter] = useState("");
  const [User, setUser] = useState("");
  const [Booking, setBooking] = useState("");
  

  const handleToggler = () => {
    if(isExpanded){
      setIsExpanded(false)
      localStorage.setItem('sidebar-collapsed', true)
      return
    }
    setIsExpanded(true)
    localStorage.removeItem('sidebar-collapsed')
  }

  <Button onClick={() => setRoom("Rooms")}>Rooms</Button>
  return (
    <div className='container'>
      <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>
        <div className="sidebar-header">
          <div className="sidebar-icon" onClick={handleToggler} >
            <IconBs.BsList size={28} style={{marginLeft: "5px", marginBottom: "12px", marginTop: "5px"}} />
          </div>
        </div>
        <div className="sidebar-items">
          <div className="item" onClick={() => { window.location.assign("/") }}>
            <div className="sidebar-icon" />
            <IconAi.AiFillHome style={{marginRight: "10px"}} />
            <span className="sidebar-text">Inicio</span>
          </div>
          <div className="item" onClick={() => { window.location.assign("/utilizadores") }}>
            <div className="sidebar-icon" />
            <IconFa.FaUsers style={{marginRight: "10px"}} />
            {User === "Users" && <Users/>}
            <span className="sidebar-text">Utilizadores</span>
          </div>
          <div className="item" onClick={() => { window.location.assign("/reservas") }}>
            <div className="sidebar-icon" />
            <IconBi.BiBook style={{marginRight: "10px"}} />
            <span className="sidebar-text">Registos</span>
          </div>
          <div className="item" onClick={() => { window.location.assign("/salas") }}>          
            <div className="sidebar-icon" />
            <IconBi.BiBuildings style={{marginRight: "10px"}} />
            {Room === "Rooms" && <Rooms/>}
            <span className="sidebar-text">Salas</span>
          </div>
          <div className="item" onClick={() => { window.location.assign("/centros") }}>
            <div className="sidebar-icon" />
            <IconBs.BsPinMapFill style={{marginRight: "10px"}} />            
            {Center === "Centers" && <Centers/>}
            <span className="sidebar-text">Centros</span>
          </div>
          <div className="item" style={{marginTop: "130%"}}>
            <div className="sidebar-icon" />
            <IconFa.FaUserAlt style={{marginRight: "10px"}} />
            <span className="sidebar-text">Perfil</span>
          </div>
          <div className="item" style={{marginTop: "0%"}}>
            <div className="sidebar-icon" />
            <IconBs.BsPinMapFill style={{marginRight: "10px"}} />
            <span className="sidebar-text">Sair</span>
          </div>
        </div>
      </div>
    </div>
    
    
  );
}

export default SideBar