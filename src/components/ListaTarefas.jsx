import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPencil, FaTrashCan } from 'react-icons/fa6';
import './Tarefas.css'

export default function ListaTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [operacao, setOperacao] = useState("");

  const url = "https://api-react-tarefas.vercel.app/tarefas";

  useEffect(() => {
    fetch(url)
      .then((respFetch) => respFetch.json())
      .then((respJson) => setTarefas(respJson))
      .catch((err) => console.log(err));
  }, [url]);

  function novasTarefas() {
    setOperacao("criarRegistro");
  }

  function limparDados() {
    setId("");
    setTitulo("");
    setDescricao("");
  }

  function editarTarefas(cod) {
    let tarefa = tarefas.find((item) => item.id === cod);
    const { id, titulo, descricao} = tarefa;
    setOperacao("editarRegistro");
    setId(id);
    setTitulo(titulo);
    setDescricao(descricao);
  }

  function apagarTarefas(cod) {
    axios.delete(url + cod).then(() => setTarefas(tarefas.filter(item => item.id !== cod))).catch((erro) => console.log(erro));
  }

  function gravarTarefas() {
    if (titulo !== "" && descricao !== "") {
        if (operacao === "criarRegistro") {
            axios.post(url, {
                titulo: titulo,
                descricao: descricao,
            }).then((response) => atualizaListaComNovaTarefa(response)).catch((err) => console.log(err));
        } else if (operacao === "editarRegistro") {
            console.log(url + id);
            axios.put(url + id, {
                titulo: titulo,
                descricao: descricao,
            }).then((response) => atualizaListaComTarefaEditada(response)).catch((err) => { console.log(err); alert(err.message)});
        }
    } else {
        console.log("Preencha os campos corretamente");
    }
  }

  function atualizaListaComTarefaEditada(response) {
    if (response.status == 202) {
        const index = tarefas.findIndex(item => item.id == id);

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
    let { id, titulo, descricao} = response.data;
    let obj = {"id": id, "titulo": titulo, "descricao": descricao};
    let tasks = tarefas;
    tasks.push(obj);
    setTarefas(tasks);
    limparDados("");
  }

  return (
    <div id="containerPrincipal">
      
      <button type="button" onClick={novasTarefas}>Criar Tarefa</button>

      <h5>Titulo</h5>
        <input
          type="text"
          name="txtTitulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      
        <h5>Descricao</h5>
        <textarea
          name="txtDescricao"
          id="descricaoTarefa"
          cols="30"
          rows="10"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>
      
      <div id="botoesContainer">
        <button type="button" onClick={limparDados}>
          Limpar
        </button>
        <button type="button" onClick={gravarTarefas}>
          Adicionar
        </button>
      </div>

      {tarefas ? tarefas.map((item) => {
        return (
          <div key={item.id}>
            {item.id} - {item.titulo} - {item.descricao} - {"    "}
            <FaPencil onClick={() => editarTarefas(item.id)} />
            <FaTrashCan onClick={() => apagarTarefas(item.id)} />
          </div>
        );
      })
        : false}

    </div>
  );
}
