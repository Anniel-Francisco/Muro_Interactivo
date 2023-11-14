import { useState } from "react";
import { HiUser, HiKey, HiUsers, HiUserCircle } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";
import UsuarioAPI from "../api/UsuarioAPI.js";

import "../assets/styles/signup.css"; // Asegúrate de importar tus estilos CSS

export function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    clave: "",
    usuario: "",
  });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("animate__zoomOut");
    setTimeout(() => {
      modal.classList.remove("animate__zoomOut");
      setIsModalOpen(false);
    }, 400);
  };

  const crearUsuario = async () => {
    try {
      if (
        !nuevoUsuario.nombre ||
        !nuevoUsuario.apellido ||
        !nuevoUsuario.correo ||
        !nuevoUsuario.clave ||
        !nuevoUsuario.usuario
      ) {
        alert("Debe llenar todos los campos");
      } else {
        await UsuarioAPI.crearUsuario(nuevoUsuario).then((item) => {
          setNuevoUsuario({
            nombre: "",
            apellido: "",
            correo: "",
            clave: "",
            usuario: "",
          });
          alert(item.message);
        });
      }
    } catch (error) {
      if (error.response.data.code == "auth/weak-password") {
        alert("Contraseña muy debil!");
      } else if (error.response.data.code == "auth/invalid-email") {
        alert("Email invalido!");
      } else if (
        error.response.data.customData["_tokenResponse"].error.message ==
        "EMAIL_EXISTS"
      ) {
        alert("El email ya existe!");
      } else {
        alert("Error interno del servidor");
      }
    }
  };

  return (
    <div>
      <span className="imported_button" onClick={openModal}>
        Sign Up
      </span>

      {isModalOpen ? (
        <div
          className="modal-register animate__animated animate__fadeIn"
          id="modal"
        >
          <div className="modal">
            <div className="header_modal">
              <div>
                <h1>Sign Up</h1>
              </div>
              <button
                type="button"
                className="close_button"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            <div className="form_register">
              <form id="form">
                {/* Usuario  */}
                <div className="input">
                  <input
                    type="text"
                    value={!nuevoUsuario.usuario ? "" : nuevoUsuario.usuario}
                    placeholder="Username"
                    onChange={function (e) {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        usuario: e.target.value,
                      });
                    }}
                  />
                  <HiUserCircle className="icon" />
                </div>
                {/* Nombre */}
                <div className="input">
                  <input
                    type="text"
                    placeholder="Name"
                    value={!nuevoUsuario.nombre ? "" : nuevoUsuario.nombre}
                    onChange={function (e) {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        nombre: e.target.value,
                      });
                    }}
                  />
                  <HiUser className="icon" />
                </div>
                {/* Apellido */}
                <div className="input">
                  <input
                    type="text"
                    value={!nuevoUsuario.apellido ? "" : nuevoUsuario.apellido}
                    placeholder="Lastname"
                    onChange={function (e) {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        apellido: e.target.value,
                      });
                    }}
                  />
                  <HiUsers className="icon" />
                </div>
                {/* Correo */}
                <div className="input">
                  <input
                    type="email"
                    value={!nuevoUsuario.correo ? "" : nuevoUsuario.correo}
                    placeholder="Email"
                    onChange={function (e) {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        correo: e.target.value,
                      });
                    }}
                  />
                  <IoMail className="icon" />
                </div>
                {/* Contraseña */}
                <div className="input">
                  <input
                    type="password"
                    value={!nuevoUsuario.clave ? "" : nuevoUsuario.clave}
                    placeholder="Password"
                    onChange={function (e) {
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        clave: e.target.value,
                      });
                    }}
                  />
                  <HiKey className="icon" />
                </div>
                <div className="btn_content">
                  <button
                    type="submit"
                    className="login_button"
                    onClick={function (e) {
                      e.preventDefault();
                      crearUsuario();
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
