//Vinícius Siqueira e Gabriel Pereira

import React from "react";
import { Link } from "react-router-dom";
import { VscTasklist } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const HeaderSobre = () => {
  return (
    <header>
      <div id="menu">
        <div className="menu-left">
          <h2>
            <Link style={{
                color: "white"
            }} to="/" >Minhas Tarefas <VscTasklist /></Link>
          </h2>
        </div>

        <div className="menu-direita">
          <ul>
            <li>
              <Link to="/">Menu</Link>
            </li>
            <a href="https://github.com/vinisik/tarefas-react" target="_blank" rel="noopener noreferrer"><FaGithub className="icone-github"/></a>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderSobre;
