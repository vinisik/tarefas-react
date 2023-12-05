//Vinícius Siqueira e Gabriel Pereira

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import HeaderMenu from "./HeaderMenu";
import { FaGithub } from "react-icons/fa6";
import "./css/Tarefas.css";
import Footer from "./Footer";

export default function Inicio() {
    return (
        <div id="App" >
            <Helmet>
                <title>Minhas Tarefas - Menu</title>
            </Helmet>
            <HeaderMenu/>
            <div id="containerInicio" >
                <h1>Menu</h1>
                <Link className="botaoInicio" to='/principal'>Ir para tarefas</Link>
                <Link className="botaoInicio" to='/sobre' >Sobre</Link>
                <a className="iconeGithub" href="https://github.com/vinisik/tarefas-react" target="_blank" rel="noopener noreferrer"><FaGithub className="icone-github"/></a>
            </div>
            <Footer/>
        </div>
    )
}