import { useState } from "react";
import { HiUser, HiKey, HiUsers, HiUserCircle } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";
import UsuarioAPI from "../api/UsuarioAPI.js";

import "../assets/styles/signup.css"; // Asegúrate de importar tus estilos CSS

export function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let nuevoUsuario = {
    nombre: "",
    apellido: "",
    correo: "",
    clave: "",
    usuario: "",
  };
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
          console.log(item.message);
          if (item.code == 200) {
            document.getElementById("form").reset();
            nuevoUsuario = {};
            alert(item.message);
          }
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
                    placeholder="Username"
                    onChange={function (e) {
                      nuevoUsuario.usuario = e.target.value;
                      console.log(nuevoUsuario);
                    }}
                  />
                  <HiUserCircle className="icon" />
                </div>
                {/* Nombre */}
                <div className="input">
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={function (e) {
                      nuevoUsuario.nombre = e.target.value;
                    }}
                  />
                  <HiUser className="icon" />
                </div>
                {/* Apellido */}
                <div className="input">
                  <input
                    type="text"
                    placeholder="Lastname"
                    onChange={function (e) {
                      nuevoUsuario.apellido = e.target.value;
                    }}
                  />
                  <HiUsers className="icon" />
                </div>
                {/* Correo */}
                <div className="input">
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={function (e) {
                      nuevoUsuario.correo = e.target.value;
                    }}
                  />
                  <IoMail className="icon" />
                </div>
                {/* Contraseña */}
                <div className="input">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={function (e) {
                      nuevoUsuario.clave = e.target.value;
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
