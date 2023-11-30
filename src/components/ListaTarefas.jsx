import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { VscTasklist } from "react-icons/vsc";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./Tarefas.css";

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [operacao, setOperacao] = useState("");
  const [categoria, setCategoria] = useState("");

  const navigate = useNavigate();

  const [coresCategorias, setCoresCategorias] = useState({
    Trabalho: "GoldenRod",
    Estudo: "green",
    Casa: "DarkSlateBlue",
    Pessoal: "DarkCyan",
    Outro: "grey",
  });

  const url = "https://api-react-tarefas.vercel.app/tarefas/";
  
  useEffect(() => {
    fetch(url)
      .then((respFetch) => respFetch.json())
      .then((respJson) => setTarefas(respJson))
      .catch((err) => console.log(err));
  }, [url]);

  function handleTarefas(){
    novasTarefas();
    window.location.href = "/tarefas"
  }

  function novasTarefas() {
    setOperacao("criarRegistro");
  }

  function editarTarefas(cod) {
    let tarefa = tarefas.find((item) => item.id === cod);
    const { id, titulo, descricao, categoria } = tarefa;
    setOperacao("editarRegistro");
    setId(id);
    setTitulo(titulo);
    setDescricao(descricao);
    setCategoria(categoria);
    navigate("/editartarefa", {state: {
      id: id,
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
    }})
  }

  function apagarTarefas(cod) {
    axios
      .delete(url + cod)
      .then(() => setTarefas(tarefas.filter((item) => item.id !== cod)))
      .catch((erro) => console.log(erro));
  }

  return (
    <div id="App">
      <header>
        <div id="menu">
          <div className="menu-left">
            <Link to="/">
              <h2>
                Minhas Tarefas <VscTasklist />{" "}
              </h2>
            </Link>
          </div>
  
          <div className="menu-direita">
            <ul>
              <li>
                {" "}
                <Link to="/sobre">Sobre</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div id="containerPrincipal">
        <button
          className="btn-criar-tarefa"
          type="button"
          onClick={() => handleTarefas()}
        >
          Criar Tarefa <FaPlus />{" "}
        </button>
  
        {tarefas && tarefas.length > 0 ? (
          tarefas.map((item) => (
            <div id="tarefaContainer" key={item.id}>
              <div className="tarefa">
                <div id="tituloTarefa">
                  {item.titulo} -{" "}
                  <span
                    style={{
                      backgroundColor:
                        coresCategorias[item.categoria] || "transparent",
                      borderRadius: "4px",
                      padding: "2px",
                    }}
                  >
                    {item.categoria}
                  </span>
                </div>
                <div id="tarefaDescricao"> {item.descricao}</div>
              </div>
              <div className="botoes-tarefa">
                <Link to="/tarefas" />

                <MdDeleteForever
                  className="icone iconeDeletar"
                  onClick={() => apagarTarefas(item.id)}
                />

                <MdModeEdit
                  className="icone iconeEditar"
                  onClick={() => editarTarefas(item.id, item.titulo, item.descricao, item.categoria)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="msgVazia">
            <p>Você não tem nenhuma tarefa. Clique em "criar tarefa" para adicionar uma nova tarefa.</p>
          </div>
        )}
      </div>
    </div>
  );
}
