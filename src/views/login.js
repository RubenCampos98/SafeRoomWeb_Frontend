import '../assets/styles/login.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap'
import React from 'react';

function Login(){

    return (
        <div className='App'>
          <div className='row'>
            <div className='col-lg-6 offset-md-3'>
              <div className="card text-center">
                <div className="card-body">
                  <h1 className="card-title mb-5 mt-3">Login</h1>
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
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );

}

export default Login