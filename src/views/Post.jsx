import { useState } from "react";
import PublicacionAPI from "../api/PublicacionAPI";
import "../assets/styles/post.css";
export function Post() {
  const [post, setPost] = useState({
    titulo: "",
    descripcion: "",
    imagen: null,
  });

  const crearPublicacion = async () => {
    try {
      if (!post.titulo || !post.descripcion || post.imagen == null) {
        alert("Debe llenar todos los campos!");
      } else {
        await PublicacionAPI.crearPublicacion(post).then((item) => {
          console.log(item);
          setPost({
            titulo: "",
            descripcion: "",
            imagen: null,
          });
          alert(item.message);
          document.querySelector("#form").reset();
        });
      }
    } catch (error) {
      console.log(error);
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
                setPost({
                  ...post,
                  imagen: { ...e.target.files[0] },
                });

                console.log(e.target.files);
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
                console.log(post);
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
                console.log(post);
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
