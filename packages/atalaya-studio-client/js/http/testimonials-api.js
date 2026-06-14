import { API_BASE_URL } from "../../utils/constants/api-base-url.const";

export const fetchTestimonios = async () => {
	try {
		const response = await fetch(`${API_BASE_URL}/testimonials`, {
			headers: {
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Respuesta HTTP ${response.status}`);
		}

		const parsedRes = await response.json();
		return parsedRes.data ?? [];
	} catch (error) {
		console.error("Error fetching testimonios:", error);

		alert(
			"No se pudieron cargar los testimonios. Por favor, inténtalo de nuevo más tarde.",
		);
		return [];
	}
};
