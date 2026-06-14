import { renderTestimonios } from "./components/testimonios.js";
import { sendContactForm } from "./http/contact-api.js";
import { fetchTestimonios } from "./http/testimonials-api.js";

const THEME_STORAGE_KEY = "atalaya-theme";

const getStoredTheme = () => {
	const theme = localStorage.getItem(THEME_STORAGE_KEY);
	return theme === "dark" || theme === "light" ? theme : "light";
};

const applyTheme = (theme) => {
	const isDark = theme === "dark";
	const toggle = document.querySelector(".theme-toggle");
	const icon = document.querySelector(".theme-toggle__icon");

	document.documentElement.dataset.theme = theme;

	if (toggle) {
		toggle.setAttribute("aria-pressed", String(isDark));
		toggle.setAttribute(
			"aria-label",
			isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
		);
	}

	if (icon) {
		icon.textContent = isDark ? "☀️" : "🌙";
	}
};

const initTheme = () => {
	const toggle = document.querySelector(".theme-toggle");
	const initialTheme = getStoredTheme();

	applyTheme(initialTheme);

	if (!toggle) return;

	toggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.dataset.theme;
		const nextTheme = currentTheme === "dark" ? "light" : "dark";

		localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
		applyTheme(nextTheme);
	});
};

const initMenu = () => {
	const toggle = document.querySelector(".menu-toggle");
	const menu = document.getElementById("menu-principal");

	if (!toggle || !menu) return;

	toggle.addEventListener("click", () => {
		const isOpen = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!isOpen));
		menu.classList.toggle("is-open", !isOpen);
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			toggle.setAttribute("aria-expanded", "false");
			menu.classList.remove("is-open");
		}
	});

	menu.addEventListener("click", (event) => {
		if (event.target instanceof HTMLAnchorElement) {
			toggle.setAttribute("aria-expanded", "false");
			menu.classList.remove("is-open");
		}
	});
};

const getErrorMessage = (field) => {
	if (field.validity.valueMissing) {
		return "Este campo es obligatorio.";
	}

	if (field.validity.typeMismatch) {
		return "Ingresa un correo electrónico válido.";
	}

	if (field.validity.tooShort) {
		return `Debe tener al menos ${field.minLength} caracteres.`;
	}

	return "";
};

const showFieldError = (field) => {
	const errorId = field.getAttribute("aria-describedby");
	const error = errorId ? document.getElementById(errorId) : null;
	const message = getErrorMessage(field);

	field.setAttribute("aria-invalid", message ? "true" : "false");

	if (error) {
		error.textContent = message;
	}

	return !message;
};

const initForm = () => {
	const form = document.getElementById("form-contacto");
	const status = document.getElementById("estado-formulario");

	if (!(form instanceof HTMLFormElement) || !status) return;

	const fields = [...form.querySelectorAll("input, textarea")];

	fields.forEach((field) => {
		field.addEventListener("blur", () => showFieldError(field));
		field.addEventListener("input", () => {
			if (field.getAttribute("aria-invalid") === "true") {
				showFieldError(field);
			}
		});
	});

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		const validationResults = fields.map((field) => showFieldError(field));
		const isValid = validationResults.every(Boolean);

		status.className = "status";

		if (!isValid) {
			status.textContent = "Revisa los campos marcados antes de enviar.";
			status.classList.add("error");
			return;
		}

		const formData = new FormData(form);

		const name = formData.get("nombre");
		const email = formData.get("email");
		const message = formData.get("mensaje");

		const response = await sendContactForm(name, email, message);

		status.textContent = response;
		status.classList.add("success");
		form.reset();
		fields.forEach((field) => {
			field.setAttribute("aria-invalid", "false");
		});
	});
};

const initTestimonios = async () => {
	const contenedor = document.getElementById("contenedor-testimonios");
	const estado = document.getElementById("estado-testimonios");

	if (!contenedor || !estado) return;

	const usuarios = await fetchTestimonios();
	renderTestimonios(usuarios, contenedor);

	if (usuarios.length === 0) {
		estado.textContent =
			"No se pudieron cargar los testimonios en este momento.";
		estado.classList.add("error");
		return;
	}

	estado.textContent = "Testimonios cargados correctamente.";
	estado.classList.add("success");
};

document.addEventListener("DOMContentLoaded", () => {
	initTheme();
	initMenu();
	initForm();
	initTestimonios();
});
