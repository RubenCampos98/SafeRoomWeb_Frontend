import '../assets/styles/login.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'
import React, { Component, useState } from 'react';
import { withFormik, Input } from 'formik';
import * as Yup from 'yup';

function Login(){

  const [LoginVar, setLoginVar] = useState(true);

  const changeForm = () => {
    if(LoginVar === true){
      setLoginVar(false);
    } else {
      setLoginVar(true);
    }
  }

  const LoginFormik = withFormik({
    mapPropsToValues: (props) => {
      return {
        email: props.email || '',
        password: props.password || ''
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email not valid').required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    handleSubmit: (values) => {
      const REST_API_URL = "http://localhost:3001/api/users";
      fetch(REST_API_URL, {
        method: 'post',
        body: JSON.stringify(values)
      }).then(response=> {
        if (response.ok) {
          return response.json();
        } else {
          // HANDLE ERROR
          throw new Error('Something went wrong');
        }
      }).then(data => {
        // HANDLE RESPONSE DATA
        console.log(data);
      }).catch((error) => {
        // HANDLE ERROR
        console.log(error);
      });
    }
    })(Login);

    return(
        <div>
          <div className="header">
            <div className="inner-header flex">
              <img src="https://i.imgur.com/znjIdu0.png" alt="logo"/>
            </div>
            <div>
              <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
              viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                  <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                  <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7" />
                  <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
                  <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
                  <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
                </g>
              </svg>
            </div>
          </div>
          <div className="content flex">
            { LoginVar === true ?
              <form>
                <input type="text" name="email"  placeholder="Email" onfocus="this.placeholder = ''" 
                  onblur="this.placeholder = 'Email'" />
                <input type="password" name="password" placeholder="Palavra-passe" onfocus="this.placeholder = ''" 
                  onblur="this.placeholder = 'Email'" />
                <button type="submit" className="login-btn">Entrar</button>
              </form> :
              <form>
                <input type="text" name="email"  placeholder="Email"/>
                <input type="password" name="password" placeholder="Nova Palavra-passe"/>
                <input type="password" name="password" placeholder="Repetir Palavra-passe"/>
                <button type="submit" className="login-btn">Editar Palavra-Passe</button>
              </form> 
            }
            { LoginVar === true ?
              <button className="login-btn" onClick={() => changeForm()}>Editar Palavra-passe</button> :
              <button className="login-btn" onClick={() => changeForm()}>Voltar ao Login</button> 
            }
          </div>
        </div>
    
    )
    
  /* const [Login, setLogin] = useState(true);

  const changeForm = () => {
    if(Login === true){
      setLogin(false);
    } else {
      setLogin(true);
    }
  }

  

    return (
        <div className='App'>
          <div className='row'>
            <div className='col-lg-6 offset-md-3'>
              <div className="card text-center">
                <div className="card-body">
                  <h1 className="card-title mb-5 mt-3">Login</h1>
                  {Login === true ?
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={() => changeForm()}>
                        Mudar
                      </Button>
                    </Form> :
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Palavra-Passe" />
                      </Form.Group>
                      <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Nova Palavra-Passe" />
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={() => changeForm()}>
                        Iniciar Sessão
                      </Button>
                    </Form>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    );*/



} 

export default Login