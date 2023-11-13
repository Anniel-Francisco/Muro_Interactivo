import { useState } from "react";
import { HiKey } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";
import { SignUp } from "./SignUp";
import "../assets/styles/login.css"; // Asegúrate de importar tus estilos CSS

export function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let user = { usuario: "", clave: "" };
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

  return (
    <div>
      <button type="button" onClick={openModal}>
        Log in
      </button>

      {isModalOpen ? (
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
              <form>
                <div className="input">
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={function (e) {
                      user.usuario = e.target.value;
                    }}
                  />
                  <IoMail className="icon" />
                </div>
                <div className="input" style={{ marginTop: "15px" }}>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={function (e) {
                      user.clave = e.target.value;
                    }}
                  />
                  <HiKey className="icon" />
                </div>
                <div className="btn_content">
                  <button
                    type="submit"
                    className="login_button"
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
