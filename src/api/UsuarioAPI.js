import axios from "axios";

class UsuarioAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  crearUsuario(body) {
    return this.axios.post("/api/crear/usuario", body).then(({ data }) => data);
  }
}

export default new UsuarioAPI();
