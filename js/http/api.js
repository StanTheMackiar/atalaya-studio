export const fetchTestimonios = async () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Error fetching testimonios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching testimonios:", error);

    alert("No se pudieron cargar los testimonios. Por favor, inténtalo de nuevo más tarde.");
    return [];
  }
};
