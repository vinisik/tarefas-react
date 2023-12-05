//Vinícius Siqueira e Gabriel Pereira

import React from "react";
import { VscTasklist } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import './css/Tarefas.css'

export default function Sobre() {
  return (
    <div id="App" >
      <Helmet>
        <title>Minhas Tarefas - Sobre</title>
      </Helmet>
      <Header/>
      <div id="containerPrincipal">

      <div id="containerSobre">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <FaArrowLeft /> Voltar
          </Link>
        <h1>Sobre o projeto</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quod tenetur velit qui eveniet vero ab incidunt alias molestiae et repellat at, asperiores accusantium temporibus. Dolorum voluptates repudiandae laboriosam nihil?</p>
      </div>
    </div>
      <Footer/>
    </div>
  );
}
