import { useState, useEffect } from "react";
import { HiUserCircle } from "react-icons/hi2";
import PublicacionAPI from "../api/PublicacionAPI";
import "../assets/styles/discover.css";
export function Discover() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const obtenerPublicaciones = async () => {
    try {
      const response = await PublicacionAPI.obtenerPublicaciones();
      if (response.length > 0) {
        setData([...response]);
      } else {
        console.warn("API response is empty");
        setMessage("No hay publicaciones disponibles");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  return (
    <div>
      <div className="publicaciones animate__animated animate__fadeInUp">
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div key={index} className="publicacion">
                <h3 className="user_title">
                  <span>{item.titulo}</span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <HiUserCircle style={{ fontSize: "22px" }} />{" "}
                    {item.usuario.usuario}
                  </span>
                </h3>
                <img src={item.file} alt="publicacion" />
                <div className="descripcion">
                  <span>{item.descripcion}</span>
                </div>
              </div>
            );
          })
        ) : (
          <h2
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            {message}
          </h2>
        )}
      </div>
    </div>
  );
}
