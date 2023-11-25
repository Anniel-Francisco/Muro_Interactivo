import axios from "axios";

class PublicacionAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  obtenerPublicaciones() {
    return this.axios.get(`/api/obtener/publicacion`).then(({ data }) => data);
  }

  crearPublicacion(body) {
    return this.axios
      .post("/api/crear/publicacion", body)
      .then(({ data }) => data);
  }
}

export default new PublicacionAPI();
