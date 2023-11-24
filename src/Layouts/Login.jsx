import { useState } from "react";
import {
  HiKey,
  HiUserCircle,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import { IoMail } from "react-icons/io5";
import { SignUp } from "./SignUp";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UsuarioAPI from "../api/UsuarioAPI";
import "../assets/styles/login.css"; // Asegúrate de importar tus estilos CSS

export function Login() {
  //VARIABLE GLOBAL
  const stateUser = useContext(AuthContext);
  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [user, setUser] = useState({ correo: "", clave: "" });
  //
  const openModal = () => {
    setIsModalOpen(true);
  };
  //
  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("animate__zoomOut");
    setTimeout(() => {
      modal.classList.remove("animate__zoomOut");
      setIsModalOpen(false);
    }, 400);
  };
  //

  const onLogin = async () => {
    try {
      if (!user.correo || !user.clave) {
        alert("Ingrese correo y contraseña");
      } else {
        await UsuarioAPI.loginUsuario(user).then((item) => {
          if (item.isLoggedIn) {
            stateUser.login();
            stateUser.setInfoUser(item.data);
            closeModal();
            document.getElementById("form").reset();
          }
        });
      }
    } catch (error) {
      if (!error.response.data.isLoggedIn) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {!stateUser.isLoggedIn ? (
        <button type="button" onClick={openModal}>
          Log in
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <HiUserCircle style={{ fontSize: "30px" }} />
          <span>{stateUser.userLogged.usuario}</span>
          <button
            type="button"
            onClick={() => {
              stateUser.logout();
              stateUser.userLogout();
            }}
            style={{ width: "40px", marginLeft: "5px", border: "none" }}
          >
            <HiMiniArrowRightOnRectangle style={{ fontSize: "20px" }} />
          </button>
        </div>
      )}

      {isModalOpen && !stateUser.isLoggedIn ? (
        <div
          className="modal-login animate__animated animate__zoomIn "
          id="modal"
        >
          <div className="modal">
            <div className="header_modal">
              <div>
                <h1>Log in</h1>
              </div>
              <button
                type="button"
                className="close_button"
                onClick={closeModal}
              >
                X
              </button>
            </div>

            <div className="form_login">
              <form id="form">
                {/* Email */}
                <div className="input">
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        correo: e.target.value,
                      });
                    }}
                  />
                  <IoMail className="icon" />
                </div>
                {/* Password */}
                <div className="input" style={{ marginTop: "15px" }}>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({
                        ...user,
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
                      onLogin();
                    }}
                    style={{ marginBottom: "10px" }}
                  >
                    Log In
                  </button>

                  <SignUp />
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
