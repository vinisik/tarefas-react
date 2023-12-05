//Vinícius Siqueira e Gabriel Pereira

import React from "react";
import { VscTasklist } from "react-icons/vsc";
import { Link } from "react-router-dom";
import HeaderSobre from "./HeaderSobre";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function Sobre() {
  return (
    <>
      <Helmet>
        <title>Minhas Tarefas - Sobre</title>
      </Helmet>
      <HeaderSobre/>

      <div id="containerSobre">
        <h1>Sobre o projeto</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quod tenetur velit qui eveniet vero ab incidunt alias molestiae et repellat at, asperiores accusantium temporibus. Dolorum voluptates repudiandae laboriosam nihil?</p>
      </div>

      <Footer/>
    </>
  );
}
