import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaTarefas from './components/ListaTarefas';
import Tarefas from './components/Tarefas';
import Sobre from './components/Sobre';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaTarefas />} />
        <Route path="listatarefas" element={<ListaTarefas />} />
        <Route path="tarefas" element={<Tarefas />} />
        <Route path="sobre" element={<Sobre/>} />
      </Routes>
    </BrowserRouter>
  );

