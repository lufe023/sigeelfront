import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

const Login = () => {

    axios({
        method: 'post',
        url: 'http://190.60.237.163/login',
        headers: {
          'usuario': 'SYSDBA',
          'clave': 'masterkey',
          'Content-Type': 'application/json'
        },
        data: {
          usuario: 'SYSDBA',
          clave: 'masterkey'
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    return (
      <div>
        <h1>Hola</h1>
      </div>
    );
  }

export default Login