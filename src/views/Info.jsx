import { useContext } from "react";
import { HiUser, HiUsers, HiUserCircle } from "react-icons/hi2";
import { IoMail } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import "../assets/styles/info.css";
export function Info() {
  //VARIABLE GLOBAL
  const stateUser = useContext(AuthContext);
  return (
    <div className="content_datos">
      {stateUser.isLoggedIn ? (
        <div className="datos">
          <span className="dato">
            <HiUserCircle /> {stateUser.userLogged.usuario}
          </span>
          <span className="dato">
            <HiUser />
            {stateUser.userLogged.nombre}
          </span>
          <span className="dato">
            {" "}
            <HiUsers />
            {stateUser.userLogged.apellido}
          </span>
          <span className="dato">
            <IoMail />
            {stateUser.userLogged.correo}
          </span>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <span
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No tiene usuario registrado
          </span>
        </div>
      )}
    </div>
  );
}
