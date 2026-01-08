export const formatDate = (dateString) => {
	if (!dateString) return "N/A";

	return new Date(dateString).toLocaleDateString("pt-BR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
