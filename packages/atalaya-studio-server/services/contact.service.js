export class ContactService {
	constructor() {}

	async createContactRequest(req, res) {
		const { name, email, message } = req.body;

		//En un proyecto real usaría una libreria como zod o Joi para validar los datos de entrada
		if (!name || !email || !message) {
			return res
				.status(400)
				.json({ error: "Todos los campos son obligatorios" });
		}

		try {
			const insert = db.prepare(
				"INSERT INTO contactos (name, email, message) VALUES (?, ?, ?)",
			);

			insert.run(name, email, message);

			res
				.status(201)
				.json({ status: "success", message: "Datos insertados correctamente" });
		} catch (error) {
			console.error("Error al guardar en la base de datos:", error);
			res.status(500).json({ error: "Hubo un error interno en el servidor" });
		}
	}
}
