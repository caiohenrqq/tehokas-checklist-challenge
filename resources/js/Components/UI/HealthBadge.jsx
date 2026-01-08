export const HealthBadge = ({ health }) => (
	<span
		className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
			health === "ALERT"
				? "bg-red-100 text-red-800 border-red-200"
				: "bg-green-100 text-green-800 border-green-200"
		}`}
	>
		{health === "ALERT" ? "Em Alerta" : "Regular"}
	</span>
);
