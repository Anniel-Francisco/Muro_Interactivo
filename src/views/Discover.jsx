import { useState, useEffect } from "react";
import PublicacionAPI from "../api/PublicacionAPI";
import "../assets/styles/discover.css";
export function Discover() {
  const [data, setData] = useState([]);

  const obtenerPublicaciones = async () => {
    try {
      const response = await PublicacionAPI.obtenerPublicaciones();

      if (response.length > 0) {
        setData([...response]);
      } else {
        console.warn("API response is empty");
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
      <div className="publicaciones">
        {data.map((item, index) => {
          return (
            <div key={index} className="publicacion">
              <h3>{item.titulo}</h3>
              <img src={item.file} alt="publicacion" />
              <div className="descripcion">
                <span>{item.descripcion}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
