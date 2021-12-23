/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';

import axios from "axios"

export async function envAPI(url){
  try{
    const response = await axios({
      url: `https://myheroacademiaapi.com/api/${url}`,
      method: `GET`,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
function App() {
const[dataUwabami, setDataUwabami] = useState(null);
const[Personajes, setPersonajes] = useState([]);

  const response = async (name) => envAPI(name);
  useEffect(() => {
    async function loadapi() {
      const resp = await response ("character");
      const data = resp?.data;
      setDataUwabami(data);
    }
    loadapi();
    return function cleanup() {
      loadapi();
    };
  }, []);

  useEffect(() => {
    console.log(dataUwabami);
     if (dataUwabami !== null) {
     setPersonajes(dataUwabami.result);
     console.log(dataUwabami?.result[0].image);
    }
  }, [dataUwabami]);

  useEffect(() => {
    console.log(Personajes)
  }, [Personajes]);

  const valor = 2;

  return (
    <div className="App">
      <header className="App-header">
        {Personajes.length !== 0 &&
          Personajes.map((item, index) => {
            console.log(item)
            return (
              <div key={index} className="card">;
              <img src={item.image} className="App-logo" alt="logo" />
                <div className="info">
                  <p>{item.id}</p>
                  <p>{item.name}</p>
                  <p>Cumple: {item.birthday}</p>
                  <p>occupation: {item.birthday}</p>
                  <p>tipo de sangre: {item.bloodtype}</p>
                  <p>Estado: {item.status}</p>
                  <p>Equipo: {item.teams}</p>
                  <p>alias: {item.alias}</p>
                  </div>
              </div>
            );
        })}
        
      </header>
    </div>
  );
}

export default App;
