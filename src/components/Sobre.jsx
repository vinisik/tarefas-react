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
        <p>
          Este projeto foi desenvolvido por Vinicius siqueira Cardoso e Gabriel Pereira Barcellos Sacramento com o proposito de colocar em prática aquilo aprendido durante as aulas de Desenvolvimento Web em algo que ainda assim possa ser aplicado no dia a dia para ajudar a se organizar.
        </p>
        <p>
          Sendo assim, para o funcionamento do projeto, foi utilizado das rotas da biblioteca React Router Dom, para a criação de rotas e navegação entre as páginas,assim como o uso de Axios para fazer as requisições HTTP para a API.
        </p>
      </div>
    </div>
      <Footer/>
    </div>
  );
}
