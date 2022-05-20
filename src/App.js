import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from 'react-bootstrap'
import { SidebarMenu } from 'react-bootstrap-sidebar-menu';

import Login from './views/login'

const App =() => {

  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed')
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true)

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
  <BrowserRouter>

    <div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>
      <div
      className="sidebar-header">
      <div className="sidebar-icon" onClick={handleToggler} />
      <h1 className="sidebar-logo">LOGO</h1>
      </div>
      <div className="sidebar-items">
      <div className="item">
      <div GridFill className="sidebar-icon" />
      <span className="sidebar-text">Dashboard</span>
      </div>
      <div className="item">
      <div className="sidebar-icon" />
      <span className="sidebar-text">Chat</span>
      </div>
      <div className="item">
      <div className="sidebar-icon" />
      <span className="sidebar-text">Teams</span>
      </div>
      <div className="item">
      <div className="sidebar-icon" />
      <span className="sidebar-text">Tasks</span>
      </div>
      <div className="item">
      <div className="sidebar-icon" />
      <span className="sidebar-text">Analytics</span>
      </div>
      </div>
    </div>

{/*   <div className="col-12">
    <nav className ="navbar bg-primary">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <img src={require('./assets/images/logo_1.png')}/>
    </button>
    <div className="collapse show navbar-collapse" id="navbarToggleExternalContent">
      <ul className ="nav navbar-nav" style={{marginTop: "3%", border:"2px solid red", width:"15%"}}>
        <li className ="nav-item">
        <a className ="nav-link" href="www.google.pt"> Home </a>
        </li>
        <li className ="nav-item">
        <a className ="nav-link" href="www.google.pt"> Services </a>
        </li>
        <li className ="nav-item">
        <a className ="nav-link" href="www.google.pt"> Contact </a>
        </li>
        <li className ="nav-item">
        <a className ="nav-link" href="www.google.pt"> Blogs </a>
        </li>
      </ul>
    </div>
  </nav>
</div>

<div className='row mt-0'>
  <div className="col col-8 offset-md-2" style={{border: "2px solid red", position: "absolute"}}>
    <div className="container">
      <h1>Dashboard</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</div> */}
{/* <div class="collapse" id="navbarToggleExternalContent">
  <div class="bg-dark p-4">
    <h5 class="text-white h4">Collapsed content</h5>
    <span class="text-muted">Toggleable via the navbar brand.</span>
  </div>
</div>
<nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav> */}

{/*   <nav className="navbar navbar-expand-lg navbar-light bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>

    <div className='col col-lg-2'>
      <div className='sidebar'>
        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
          <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
          <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
        </div>
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
          <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
          <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
        </div>
      </div>
    </div> */}

{/* <div className='col col-lg-2'>
  ola
</div>
<div className="row">
  <div className="col-2">
    <nav className ="navbar bg-light">
      <ul className ="nav navbar-nav">
        <li className ="nav-item">
        <a className ="nav-link" href="#"> Home </a>
        </li>
        <li className ="nav-item">
        <a className ="nav-link" href="#"> Utilizadores </a>
        </li>
        <li className ="nav-item">
        <a className ="nav-link" href="#"> Salas </a>
        </li>
        <li className ="nav-item">
        <a className ="nav-link" href="#"> Blogs </a>
        </li>
      </ul>
    </nav>
  </div>

  <div className="col-9">
    <div className="container">
      The Web Content in detail.
    </div>
    <div className="container">
      <p> The vertical menu can place</p>
    </div>
  </div>
</div> */}
{/*      <Routes>
      <Route path='/login' element={<Login/>}/>
    </Routes> */}

  </BrowserRouter>
  );
}

export default App;
