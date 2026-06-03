export const renderTestimonios = (usuarios, contenedor) => {
  const items = usuarios.slice(0, 3);

  items.forEach((usuario) => {
    const card = document.createElement("article");

    card.innerHTML = `
            <h3>"${usuario.name}"</h3>
            <p>Trabaja en: <strong>${usuario.company.name}</strong></p>
            <small>Email: ${usuario.email}</small>
            <hr>
        `;

    contenedor.appendChild(card);
  });
};
