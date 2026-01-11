import { AlertCircle, CheckCircle } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/Components/Shadcn/UI/tooltip";

export const HealthBadge = ({ health }) => {
	const isAlert = health === "ALERT";

	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger asChild>
					<div
						className={`inline-flex items-center justify-center p-1.5 rounded-full border cursor-help transition-colors ${
							isAlert
								? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
								: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
						}`}
					>
						{isAlert ? (
							<AlertCircle size={16} strokeWidth={2.5} />
						) : (
							<CheckCircle size={16} strokeWidth={2.5} />
						)}
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p className="font-medium">{isAlert ? "Em Alerta" : "Regular"}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
