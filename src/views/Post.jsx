import { useState } from "react";
import PublicacionAPI from "../api/PublicacionAPI";
import { useContext } from "react";
import { PuffLoader } from "react-spinners";
import { AuthContext } from "../context/AuthContext";
import { FaCheckCircle } from "react-icons/fa";
import "../assets/styles/post.css";
export function Post() {
  //VARIABLE GLOBAL
  const stateUser = useContext(AuthContext);
  //

  const [post, setPost] = useState({
    titulo: "",
    descripcion: "",
    file: null,
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const addFile = (file) => {
    setPost({
      ...post,
      file: file,
    });
  };
  const crearPublicacion = async () => {
    try {
      if (!stateUser.isLoggedIn) {
        alert("No tiene usuario registrado!");
      } else {
        if (!post.titulo || !post.descripcion || post.file == null) {
          alert("Debe llenar todos los campos!");
        } else {
          const formData = new FormData();
          formData.append("titulo", post.titulo);
          formData.append("descripcion", post.descripcion);
          formData.append("file", post.file);

          setLoading(true);
          await PublicacionAPI.crearPublicacion(formData).then(() => {
            setPost({
              titulo: "",
              descripcion: "",
              file: null,
            });
            setMessage("Publicación Exitosa!");
            document.querySelector("#form").reset();
          });

          setLoading(false);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form id="form" className="form">
        {loading ? (
          <div className="loading">
            <div>
              <PuffLoader
                color="black"
                loading={loading}
                size={100}
                speedMultiplier={2}
              />
              <h3>Loading</h3>
            </div>
          </div>
        ) : message != null ? (
          <div className="loading">
            <div>
              <FaCheckCircle style={{ fontSize: "30px" }} />
              <h2>{message}</h2>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <div>
            <input
              type="file"
              id="imagen"
              className="inputfile"
              onChange={(e) => {
                addFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div className="fields">
          <div>
            <input
              type="text"
              id="titulo"
              value={!post.titulo ? "" : post.titulo}
              placeholder="title"
              onChange={(e) => {
                setPost({
                  ...post,
                  titulo: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <textarea
              id="descripcion"
              value={!post.descripcion ? "" : post.descripcion}
              placeholder="description"
              onChange={(e) => {
                setPost({
                  ...post,
                  descripcion: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div>
          <button
            className="button_post"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              crearPublicacion();
            }}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
