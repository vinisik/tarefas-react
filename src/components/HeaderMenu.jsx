//Vinícius Siqueira e Gabriel Pereira

import React from "react";
import { Link } from "react-router-dom";
import { VscTasklist } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";


const HeaderMenu = () => {
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
      </div>
    </header>
  );
};

export default HeaderMenu;
