const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchTestimonios = async () => {
	try {
		const response = await fetch(BASE_URL, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Respuesta HTTP ${response.status}`);
		}

		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error("Error fetching testimonios:", error);

		alert(
			"No se pudieron cargar los testimonios. Por favor, inténtalo de nuevo más tarde.",
		);
		return [];
	}
};
