import { useState } from "react";
import "../assets/styles/post.css";
export function Post() {
  const [post, setPost] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
  });

  function fileTo64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return resolve(reader.result);
      };
      reader.onerror = function (error) {
        return reject(error);
      };
    });
  }

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
                  imagen: e.target.value,
                });

                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="fields">
          <div>
            <input
              type="text"
              id="titulo"
              placeholder="title"
              onChange={(e) => {
                setPost({
                  ...post,
                  titulo: e.target.value,
                });
                console.log(post);
                console.log(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              id="descripcion"
              placeholder="description"
              onChange={(e) => {
                setPost({
                  ...post,
                  descripcion: e.target.value,
                });
                console.log(post);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button className="button_post" type="button">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
