import { db } from "../config/db.config.js";

export class TestimonialsService {
	async createTestimonial(req, res) {
		const { name, email, enterprise } = req.body ?? {};

		//En un proyecto real usaría una libreria como zod o Joi para validar los datos de entrada
		if (!name || !email || !enterprise) {
			return res
				.status(400)
				.json({ error: "Todos los campos son obligatorios" });
		}

		try {
			const insert = db.prepare(
				"INSERT INTO testimonios (name, email, enterprise) VALUES (?, ?, ?)",
			);

			insert.run(name, email, enterprise);

			res
				.status(201)
				.json({ status: "success", message: "Datos insertados correctamente" });
		} catch (error) {
			console.error("Error al guardar en la base de datos:", error);
			res.status(500).json({ error: "Hubo un error interno en el servidor" });
		}
	}

	async getTestimonials(_, res) {
		try {
			const select = db.prepare(
				"SELECT * FROM testimonios ORDER BY created_at DESC",
			);
			const testimonials = select.all();

			res.status(200).json({ status: "success", data: testimonials });
		} catch (error) {
			console.error("Error al obtener datos de la base de datos:", error);
			res.status(500).json({ error: "Hubo un error interno en el servidor" });
		}
	}
}
