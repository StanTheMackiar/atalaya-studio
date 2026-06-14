import { db } from "../config/db.config.js";

export class TestimonialsService {
	async createTestimonial(req, res) {
		const { name, email, enterprise } = req.body ?? {};

		// En un proyecto real usaría una librería como zod o Joi para validar los datos de entrada
		if (!name || !email || !enterprise) {
			return res
				.status(400)
				.json({ error: "Todos los campos son obligatorios" });
		}

		try {
			await db.collection("testimonios").add({
				name,
				email,
				enterprise,
				createdAt: new Date().toISOString(),
			});

			return res
				.status(201)
				.json({ status: "success", message: "Datos insertados correctamente" });
		} catch (error) {
			console.error("Error al guardar en Firebase Firestore:", error);
			return res
				.status(500)
				.json({ error: "Hubo un error interno en el servidor" });
		}
	}

	async getTestimonials(_, res) {
		try {
			const snapshot = await db
				.collection("testimonios")
				.orderBy("createdAt", "desc")
				.get();

			if (snapshot.empty) {
				return res.status(200).json({ status: "success", data: [] });
			}

			const testimonials = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			return res.status(200).json({ status: "success", data: testimonials });
		} catch (error) {
			console.error("Error al obtener datos de Firebase Firestore:", error);
			return res
				.status(500)
				.json({ error: "Hubo un error interno en el servidor" });
		}
	}
}
