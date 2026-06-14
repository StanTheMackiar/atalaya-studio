const createTextElement = (tagName, text, className) => {
	const element = document.createElement(tagName);
	element.textContent = text;

	if (className) {
		element.className = className;
	}

	return element;
};

export const renderTestimonios = (usuarios, contenedor) => {
	contenedor.replaceChildren();

	usuarios.slice(0, 3).forEach((usuario) => {
		const card = document.createElement("article");
		card.className = "testimonio-card";

		const nombre = usuario?.name ?? "Cliente de Atalaya";
		const empresa = usuario?.enterprise ?? "Proyecto creativo";
		const email = usuario?.email ?? "contacto privado";

		card.append(
			createTextElement("h3", nombre),
			createTextElement("p", `Trabaja en: ${empresa}`),
			createTextElement("small", `Email: ${email}`),
		);

		contenedor.appendChild(card);
	});
};
