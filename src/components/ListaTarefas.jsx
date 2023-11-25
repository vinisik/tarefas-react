import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosAdd } from "react-icons/io";
import { VscTasklist } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import './Tarefas.css'

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [operacao, setOperacao] = useState("");

  const url = "https://api-react-tarefas.vercel.app/tarefas/";

  const handleTarefa = () => {
    novasTarefas();
    window.location.href = '/tarefas';
  }

  const handleEditar = () => {
    editarTarefas();
    window.location.href = '/tarefas'
  }

  useEffect(() => {
    fetch(url)
      .then((respFetch) => respFetch.json())
      .then((respJson) => setTarefas(respJson))
      .catch((err) => console.log(err));
  }, [url]);

  function novasTarefas() {
    setOperacao("criarRegistro");
  }

  function editarTarefas(cod) {
    let tarefa = tarefas.find((item) => item.id === cod);
    const { id, titulo, descricao } = tarefa;
    setOperacao("editarRegistro");
    setId(id);
    setTitulo(titulo);
    setDescricao(descricao);
    window.location.href = '/tarefas'
  }

  function apagarTarefas(cod) {
    axios.delete(url  +  cod)
      .then(() => setTarefas(tarefas.filter((item) => item.id !== cod)))
      .catch((erro) => console.log(erro));
      alert('Tarefa deletada com sucesso!')
  }

  return (
    <div>
      <header>
          <div id="menu" >
            <div className="menu-left" >
              <h2>Minhas Tarefas <VscTasklist/> </h2>
            </div>
          
          <div className="menu-direita" >
            <ul>
              <li> <Link to='/sobre'>Sobre</Link> </li>
            </ul>
          </div>
          </div>
      </header>
      <div id="containerPrincipal">
      <button className="btn-criar-tarefa" type="button" onClick={handleTarefa} >Criar Tarefa <IoIosAdd /> </button>

      {tarefas
        ? tarefas.map((item) => {
            return (
              <div id="tarefaContainer" key={item.id}>
                <div className="tarefa" >
                  <div id="tituloTarefa">{item.titulo}</div>{" "}
                  <div id="tarefaDescricao"> {item.descricao}</div> {"    "}
                </div>
                  <div className="botoes-tarefa" >
                    <FaPencil
                      className="icone"
                      onClick={() => editarTarefas(item.id)}
                    />
                    <MdDeleteForever
                      className="icone iconeDeletar"
                      onClick={() => apagarTarefas(item.id)}
                    />
                  </div>
              </div>
            );
          })
        : false}

    </div>
    </div>
    
  );
}
