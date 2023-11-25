import { useState } from "react";
import PublicacionAPI from "../api/PublicacionAPI";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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
          await PublicacionAPI.crearPublicacion(formData).then((item) => {
            setPost({
              titulo: "",
              descripcion: "",
              file: null,
            });
            alert(item.message);
            // setPost({
            //   titulo: "",
            //   descripcion: "",
            //   file: null,
            // });
            document.querySelector("#form").reset();
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form id="form" className="form">
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
