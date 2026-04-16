import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BsFileText, BsFilePerson, BsFileWord, BsCalendar } from 'react-icons/bs';

const Folder = () => {
  return ( 
    <div id="folder">
      <div className="link-container">
        <Link to="/folder/resume?q=Currículos">
          <span className="box-container">
            <BsFileText size={32} /> 
            <br></br>
            <h2>Currículos</h2>
            <hr></hr>
            <p>Salvar modelos de currículos internacionais e nacionais, e alguns modelos de exemplos para tipos variados de vagas.</p>
          </span>
        </Link>
        <Link to="/folder/italiancitizenship?q=Cidadania Italiana">
          <span className="box-container">
            <BsFilePerson size={32} /> 
            <br></br>
            <h2>Cidadania Italiana</h2>
            <hr></hr>
            <p>Documentos necessarios para aplicação da Cidadania Italiana.</p>
          </span>
        </Link>
        <Link to="/folder/documents?q=Documentos">
          <span className="box-container">
            <BsFileWord size={32} /> 
            <br></br>
            <h2>Documentos</h2>
            <hr></hr>
            <p>Documentos pessoais diversos</p>
          </span>
        </Link>
        <Link to="/folder/agenda?q=Agenda">
          <span className="box-container">
            <BsCalendar size={32} /> 
            <br></br>
            <h2>Agenda</h2>
            <hr></hr>
            <p>Programação diária de compromissos.</p>
          </span>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Folder;