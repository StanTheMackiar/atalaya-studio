import { db } from "../config/db.config.js";

export class ContactService {
	async createContactRequest(req, res) {
		const { name, email, message } = req.body ?? {};

		// En un proyecto real usaría una librería como zod o Joi para validar los datos de entrada
		if (!name || !email || !message) {
			return res
				.status(400)
				.json({ error: "Todos los campos son obligatorios" });
		}

		try {
			await db.collection("contactos").add({
				name,
				email,
				message,
				createdAt: new Date().toISOString(),
			});

			return res
				.status(201)
				.json({ status: "success", message: "Datos enviados correctamente" });
		} catch (error) {
			console.error("Error al guardar en Firebase Firestore:", error);
			return res
				.status(500)
				.json({ error: "Hubo un error interno en el servidor" });
		}
	}

	async getContactRequests(_, res) {
		try {
			const snapshot = await db.collection("contactos").get();

			if (snapshot.empty) {
				return res.status(200).json({ status: "success", data: [] });
			}

			const contactRequests = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			return res.status(200).json({ status: "success", data: contactRequests });
		} catch (error) {
			console.error("Error al obtener datos de Firebase Firestore:", error);
			return res
				.status(500)
				.json({ error: "Hubo un error interno en el servidor" });
		}
	}
}
