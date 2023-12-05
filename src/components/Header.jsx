//Vinícius Siqueira e Gabriel pereira

import React from "react";
import { Link } from "react-router-dom";
import { VscTasklist } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import './css/Header.css'

const Header = () => {
  return (
    <header>
      <div id="menu">
        <div className="menu-left">
          <h2>
            Minhas Tarefas <VscTasklist />
          </h2>
        </div>

        <div className="menu-direita">
          <ul>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
            <a href="https://github.com/vinisik/tarefas-react" target="_blank" rel="noopener noreferrer"><FaGithub className="icone-github"/></a>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;