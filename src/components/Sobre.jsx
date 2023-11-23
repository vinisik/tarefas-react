import React from "react";
import { VscTasklist } from "react-icons/vsc";
import { Link } from "react-router-dom";
export default function Sobre() {
  return (
    <>
      <header>
        <div id="menu">
          <div className="menu-left">
            <h2>
              Minhas Tarefas <VscTasklist />{" "}
            </h2>
          </div>

          <div className="menu-direita">
            <ul>
              <li>
                {" "}
                <Link to="/listatarefas">Menu</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div id="containerSobre">
        <h1>Sobre o projeto</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quod tenetur velit qui eveniet vero ab incidunt alias molestiae et repellat at, asperiores accusantium temporibus. Dolorum voluptates repudiandae laboriosam nihil?</p>
      </div>
    </>
  );
}
