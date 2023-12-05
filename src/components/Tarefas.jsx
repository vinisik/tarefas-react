//Vinícius Siqueira e Gabriel Pereira

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { VscTasklist } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";
import "./css/Tarefas.css";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [operacao, setOperacao] = useState("");
  const [categoria, setCategoria] = useState("");

  const [coresCategorias, setCoresCategorias] = useState({
    Trabalho: "GoldenRod",
    Estudo: "green",
    Casa: "DarkSlateBlue",
    Pessoal: "DarkCyan",
    Outro: "grey",
  });

  const url = "https://api-react-tarefas.vercel.app/tarefas/";

  useEffect(
    () => {
      novasTarefas();

      fetch(url)
        .then((respFetch) => respFetch.json())
        .then((respJson) => setTarefas(respJson))
        .catch((err) => console.log(err));
    },
    [url],
    []
  );

  function limparDados() {
    setId("");
    setTitulo("");
    setDescricao("");
    setCategoria("");
  }

  function novasTarefas() {
    setOperacao("criarRegistro");
  }

  //função que pega os dados editados da tarefa e envia de volta para a página principal
  function gravarTarefas() {
    if (titulo !== "") {
      if (operacao === "criarRegistro") {
        if (categoria !== "") {
          const novaTarefa = {
            titulo: titulo,
            descricao: descricao || "",
            categoria: categoria,
          };
          axios
            .post(url, novaTarefa)
            .then((response) => {
              atualizaListaComNovaTarefa(response);
              alert("Tarefa adicionada!");
            })
            .catch((err) => console.log(err));
        } else {
          alert("Erro. Adicione uma categoria.");
        }
      } else if (operacao === "editarRegistro") {
        if (titulo !== "" || descricao !== "") {
          axios
            .put(url + id, {
              titulo: titulo,
              descricao: descricao,
              categoria: categoria,
            })
            .then((response) => {
              atualizaListaComTarefaEditada(response);
            })
            .catch((err) => {
              console.log(err);
              alert(err.message);
            });
        } else {
          console.log("Erro: Preencha pelo menos o título ou a categoria.");
        }
      }
    } else {
      alert("Erro. Adicione um título.");
    }
  }

  function atualizaListaComTarefaEditada(response) {
    if (response.status == 202) {
      const index = tarefas.findIndex((item) => item.id == id);

      let tasks = tarefas;
      tasks[index].titulo = titulo;
      tasks[index].descricao = descricao;
      tasks[index].categoria = categoria;

      setTarefas(tasks);
      limparDados("");
    } else {
      console.log("Houve um problema na edição: ", response.status);
    }
  }

  function atualizaListaComNovaTarefa(response) {
    console.log(response);
    let { id, titulo, descricao } = response.data;
    let obj = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      categoria: categoria,
    };
    let tasks = tarefas;
    tasks.push(obj);
    setTarefas(tasks);
    limparDados("");
  }

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div id="App">
      <Helmet>
        <title>Minhas Tarefas - Criar</title>
      </Helmet>
      <Header/>
      <div id="containerPrincipal">

          <Link to="/principal" style={linkStyle}>
            {" "}
            <FaArrowLeft /> Voltar para a lista
          </Link>

        <div id="camposTarefa">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{
              color: coresCategorias[categoria] || "black",
            }}
          >
            <option
              value=""
              style={{
                color: "black",
              }}
            >
              Selecione uma categoria
            </option>
            <option
              value="Trabalho"
              style={{
                color: coresCategorias["Trabalho"] || "transparent",
              }}
            >
              Trabalho
            </option>
            <option
              value="Estudo"
              style={{
                color: coresCategorias["Estudo"] || "transparent",
              }}
            >
              Estudo
            </option>
            <option
              value="Pessoal"
              style={{
                color: coresCategorias["Pessoal"] || "transparent",
              }}
            >
              Pessoal
            </option>
            <option
              value="Casa"
              style={{
                color: coresCategorias["Casa"] || "transparent",
              }}
            >
              Casa
            </option>
            <option
              value="Outro"
              style={{
                color: coresCategorias["Outro"] || "transparent",
              }}
            >
              Outro
            </option>
          </select>

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
            placeholder="Adicione uma breve descrição (opcional)"
            rows="3"
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
      <Footer/>
    </div>
  );
}
