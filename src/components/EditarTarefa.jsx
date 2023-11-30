import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { VscTasklist } from "react-icons/vsc";
import { FaArrowLeft } from "react-icons/fa";
import "./Tarefas.css";

export default function EditarTarefa() {
  // const { id } = useParams();
  const [id, setId] = useState("");
  const [tarefa, setTarefa] = useState({});
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const [coresCategorias, setCoresCategorias] = useState({
    Trabalho: "GoldenRod",
    Estudo: "green",
    Casa: "DarkSlateBlue",
    Pessoal: "DarkCyan",
    Outro: "grey",
  });

  const location = useLocation();

  const url = "https://api-react-tarefas.vercel.app/tarefas/";

  useEffect(() => {
    console.log("entrou no useEffect do location")
    if (location.state) {
      console.log(`${url}${location.state.id}`)
      axios
        .get(`${url}${location.state.id}`)
        // .then( (respGet) => respGet.())
        .then((response) => {
          console.log(response);
          const { id, titulo, descricao, categoria } = response.data[0];
          setTarefa({ id, titulo, descricao, categoria });
          setId(id);
          setTitulo(titulo);
          setDescricao(descricao);
          setCategoria(categoria);
        })
        .catch((error) => console.error(error));
    }
  }, [location, url]);

  function limparDados() {
    setTitulo("");
    setDescricao("");
    setCategoria("");
  }

  function salvarEdicao() {
    if (titulo !== "" || descricao !== "") {
      axios
        .put(url + id, {
          titulo: titulo,
          descricao: descricao,
          categoria: categoria,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Tarefa editada com sucesso!");
            limparDados();
          } else {
            console.log("Houve um problema na edição: ", response.status);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    } else {
      console.log("Erro: Preencha pelo menos o título ou a descrição.");
    }
    limparDados();  
  }

  return (
    <div id="App">
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
                <Link to="/sobre">Sobre</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div id="containerPrincipal">
        
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            <FaArrowLeft /> Voltar para a lista
          </Link>

        <h3>Editando tarefa</h3>

        {Object.keys(tarefa).length > 0 ? (
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
              {Object.keys(coresCategorias).map((key) => (
                <option
                  key={key}
                  value={key}
                  style={{
                    color: coresCategorias[key] || "transparent",
                  }}
                >
                  {key}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Adicione um título"
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
              <button type="button" onClick={salvarEdicao}>
                Salvar Edição
              </button>
            </div>
          </div>
        ) : (
          <p>Carregando tarefa...</p>
        )}
      </div>
    </div>
  );
}
