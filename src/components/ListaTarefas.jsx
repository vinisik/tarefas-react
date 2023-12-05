//Vinícius Siqueira e Gabriel Pereira

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./Header";
import "./css/Tarefas.css";
import Footer from "./Footer";

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

  //função para tratar a criação de novas tarefas para redirecionar para nova página
  function handleTarefas(){
    novasTarefas();
    navigate("/tarefas")
  }

  function novasTarefas() {
    setOperacao("criarRegistro");
  }

  //função que busca o id da tarefa selecionada e carrega os dados para a página de edição
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

  //utiliza o metodo delete, que deleta o indice da tarefa no banco de dados
  function apagarTarefas(cod) {
    axios
      .delete(url + cod)
      .then(() => setTarefas(tarefas.filter((item) => item.id !== cod)))
      .catch((erro) => console.log(erro));
  }

  return (
    <div id="App">
      <Helmet>
        <title>Minhas Tarefas - Início</title>
      </Helmet>
      <Header/>
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

                <MdModeEdit
                  className="icone iconeEditar"
                  onClick={() => editarTarefas(item.id, item.titulo, item.descricao, item.categoria)}
                />
                
                <MdDeleteForever
                  className="icone iconeDeletar"
                  onClick={() => apagarTarefas(item.id)}
                />

              </div>
            </div>
          ))
        ) : (
          <div className="msgVazia">
            <p>Você não tem nenhuma tarefa. Clique em "criar tarefa" para adicionar uma nova.</p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
