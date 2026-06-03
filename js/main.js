import { renderTestimonios } from "./components/testimonios";
import { fetchTestimonios } from "./http/api";


document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedor-testimonios");
  const usuarios = await fetchTestimonios();
  console.log(usuarios[0]);
  renderTestimonios(usuarios, contenedor);
});
