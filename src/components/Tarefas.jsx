import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { VscTasklist } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";
import './Tarefas.css'

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [operacao, setOperacao] = useState("");

  const url = "https://api-react-tarefas.vercel.app/tarefas/";

  useEffect(() => {
    
    novasTarefas();

    fetch(url)
      .then((respFetch) => respFetch.json())
      .then((respJson) => setTarefas(respJson))
      .catch((err) => console.log(err));
  }, [url], []);

  function limparDados() {
    setId("");
    setTitulo("");
    setDescricao("");
  }

  function novasTarefas() {
    setOperacao("criarRegistro");
  }

  function gravarTarefas() {
    if (titulo !== "" && descricao !== "") {
      if (operacao === "criarRegistro") {
        axios
          .post(url, {
            titulo: titulo,
            descricao: descricao,
          })
          .then((response) => atualizaListaComNovaTarefa(response))
          .catch((err) => console.log(err));
      } else if (operacao === "editarRegistro") {
        console.log(url + id);
        axios
          .put(url + id, {
            titulo: titulo,
            descricao: descricao,
          })
          .then((response) => atualizaListaComTarefaEditada(response))
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      }
    } else {
      console.log("Preencha os campos corretamente");
    }
    alert('Tarefa adicionada')
  }

  function atualizaListaComTarefaEditada(response) {
    if (response.status == 202) {
      const index = tarefas.findIndex((item) => item.id == id);

      let tasks = tarefas;
      tasks[index].titulo = titulo;
      tasks[index].descricao = descricao;

      setTarefas(tasks);
      limparDados("");
    } else {
      console.log("Houve um problema na edição: ", response.status);
    }
  }

  function atualizaListaComNovaTarefa(response) {
    console.log(response);
    let { id, titulo, descricao } = response.data;
    let obj = { id: id, titulo: titulo, descricao: descricao };
    let tasks = tarefas;
    tasks.push(obj);
    setTarefas(tasks);
    limparDados("");
  }

  const linkStyle = {
    textDecoration: "none",
    color: 'black'
  }

  return (
    <>
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
        <button> <Link to="/" style={linkStyle}> <FaArrowLeft/> Voltar para a lista</Link> </button>

        <div id="camposTarefa">
          
          <input
            type="text"
            placeholder="Titulo da tarefa"
            name="txtTitulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            name="txtDescricao"
            id="descricaoTarefa"
            placeholder="Adicione uma breve descrição"
            cols="30"
            rows="10"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>
          <div className="botoes">
            <button type="button" onClick={limparDados}>
              Limpar
            </button>
            <button type="button" onClick={gravarTarefas}>
              Adicionar
            </button>
          </div>
        </div>
        
      </div>
    </>
  );
}
