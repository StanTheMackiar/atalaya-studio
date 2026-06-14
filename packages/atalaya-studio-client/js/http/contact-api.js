import { API_BASE_URL } from "../../utils/constants/api-base-url.const";

export const sendContactForm = async (name, email, message) => {
	try {
		const response = await fetch(`${API_BASE_URL}/contact`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, message }),
		});

		if (!response.ok) {
			throw new Error(`Respuesta HTTP ${response.status}`);
		}

		const parsedRes = await response.json();

		return parsedRes.message ?? "Datos enviados correctamente";
	} catch (error) {
		console.error("Error sending contact form:", error);

		alert(
			"No se pudieron enviar los datos. Por favor, inténtalo de nuevo más tarde.",
		);
		return [];
	}
};
