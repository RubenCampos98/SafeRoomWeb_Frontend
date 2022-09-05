import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//-----------------Icons-----------------
import * as IconFa from 'react-icons/fa';
import * as IconBs from 'react-icons/bs';
import * as IconBi from 'react-icons/bi';
import * as IconAi from 'react-icons/ai';

import { Button } from 'react-bootstrap'

import LoginPage from './views/login';
import Rooms from './views/rooms';
import Centers from './views/centers';
import Users from './views/users';
import Bookings from './views/bookings';
import HomePage from './views/home'

//import SideBar from './components/sidebar';

/* export default function App(){

  const [Room, setRoom] = useState("");
  const [Center, setCenter] = useState("");
  const [User, setUser] = useState("");
  const [Booking, setBooking] = useState("");
 
  return (
  <BrowserRouter>

    <SideBar/>
    
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 offset-md-1' style={{border: "1px solid blue"}}>
            <h1> HomePage</h1>
            <Button onClick={() => console.log("hello")}>Button</Button>
            <Button onClick={() => {setRoom("Rooms"); setCenter(""); setBooking(""); setUser("") }}>Rooms</Button>
            <Button onClick={() => {setCenter("Centers"); setRoom(""); setBooking(""); setUser("") }}>Centers</Button>
            <Button onClick={() => {setUser("Users"); setRoom(""); setCenter(""); setBooking("") }}>Users</Button>
            <Button onClick={() => {setBooking("Bookings"); setRoom(""); setCenter(""); setUser(""); }}>Bookings</Button>
            {Room === "Rooms" && <Rooms/>}
            {Center === "Centers" && <Centers/>}
            {User === "Users" && <Users/>}
            {Booking === "Bookings" && <Bookings/>}
          </div>
        </div>
      </div>

  </BrowserRouter>
  ); 
} */
/* ------------------------------------------------------------------------------------------------------------- */
/* export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
    this.isElVisible = this.isElVisible.bind(this);
  }
 
  isElVisible() {
    this.setState({isVisible: !this.isVisible});
  }

  render() {
    return (
      <div>
        <SideBar isViz={this.isElVisible} />
        <Rooms /> { this.state.isVisible? <Centers /> : '' }
      </div>
    );
  }

} */


/* function App(){
  return(
    <Router>
      <SideBar/>
      <Routes>
        <Route path='/' exact element={ <Home/> }/>
        <Route path='/reservas' element={ <Bookings/> }/>
        <Route path='/centros' element={ <Centers/> }/>
        <Route path='/salas' element={ <Rooms/> }/>
        <Route path='/utilizadores' element={ <Users/> }/>
      </Routes>
    </Router>
  );
}

export default App; */

const App = () => {

  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)

  const [Home, setHome] = useState("");
  const [Room, setRoom] = useState("");
  const [Center, setCenter] = useState("");
  const [User, setUser] = useState("");
  const [Booking, setBooking] = useState("");
  const [Login, setLogin] = useState("");

  const showLogin = () => {
    if (window.location.pathname === "/") {
      return <LoginPage/>
    }
  }
  

  const handleToggler = () => {
    if(isExpanded){
      setIsExpanded(false)
      localStorage.setItem('sidebar-collapsed', true)
      return
    }
    setIsExpanded(true)
    localStorage.removeItem('sidebar-collapsed')
  }

  return (
    <div className='container'>
      <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>
        <div className="sidebar-header">
          <div className="sidebar-icon" onClick={handleToggler} >
            <IconBs.BsList size={28} style={{marginLeft: "5px", marginBottom: "12px", marginTop: "5px"}} />
          </div>
        </div>
        <div className="sidebar-items">
          <div className="item" 
          onClick={() => {setHome("HomePage"); setUser(""); setRoom(""); setCenter(""); setBooking(""); setLogin("") }}>
            <div className="sidebar-icon" />
            <IconAi.AiFillHome style={{marginRight: "10px"}} />
            <span className="sidebar-text">Inicio</span>
          </div>
          <div className="item" 
          onClick={() => {setUser("Users"); setHome(""); setRoom(""); setCenter(""); setBooking(""); setLogin("") }}>
            <div className="sidebar-icon" />
            <IconFa.FaUsers style={{marginRight: "10px"}} />
            <span className="sidebar-text">Utilizadores</span>
          </div>
          <div className="item" 
          onClick={() => {setBooking("Bookings"); setHome(""); setRoom(""); setCenter(""); setUser(""); setLogin("") }}>
            <div className="sidebar-icon" />
            <IconBi.BiBook style={{marginRight: "10px"}} />
            <span className="sidebar-text">Reservas</span>
          </div>
          <div className="item" 
          onClick={() => {setRoom("Rooms"); setHome(""); setCenter(""); setBooking(""); setUser(""); setLogin("") }}>          
            <div className="sidebar-icon" />
            <IconBi.BiBuildings style={{marginRight: "10px"}} />
            <span className="sidebar-text">Salas</span>
          </div>
          <div className="item" 
          onClick={() => {setCenter("Centers"); setHome(""); setRoom(""); setBooking(""); setUser(""); setLogin("") }}>
            <div className="sidebar-icon" />
            <IconBs.BsPinMapFill style={{marginRight: "10px"}} /> 
            <span className="sidebar-text">Centros</span>
          </div>
          <div className="item" style={{marginTop: "130%"}}
          onClick={() => {setLogin("LoginPage"); setCenter(""); setHome(""); setRoom(""); setBooking(""); setUser("") }}>
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
      <div>
{/*         <Router>
          <Route exact path='/' component={LoginPage}/>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/salas' component={Rooms}/>
          <Route exact path='/centros' component={Centers}/>
          <Route exact path='/utilizadores' component={Users}/>
          <Route exact path='/reservas' component={Bookings}/>
        </Router> */}
        {Home === "HomePage" && <HomePage/>}
        {Room === "Rooms" && <Rooms/>}
        {Center === "Centers" && <Centers/>}
        {User === "Users" && <Users/>}
        {Booking === "Bookings" && <Bookings/>}
        {Login === "LoginPage" && <LoginPage/>}
      </div>
    </div>
    
    
  );
}

export default App