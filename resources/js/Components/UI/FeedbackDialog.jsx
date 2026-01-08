import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/Components/Shadcn/UI/dialog";

export default function FeedbackDialog({
	open,
	onOpenChange,
	status = "success",
	title,
	message,
}) {
	const styles = {
		success: {
			icon: CheckCircle2,
			iconBg: "bg-green-100",
			iconColor: "text-green-600",
			buttonClass: "bg-green-600 hover:bg-green-700 focus:ring-green-600",
			defaultLabel: "Ok, entendi",
		},
		error: {
			icon: XCircle,
			iconBg: "bg-red-100",
			iconColor: "text-red-600",
			buttonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-600",
			defaultLabel: "Fechar",
		},
	};

	const currentStyle = styles[status] || styles.success;
	const Icon = currentStyle.icon;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md text-center p-0 gap-0 overflow-hidden border-0 shadow-2xl">
				<div className="flex flex-col items-center justify-center p-8 pb-6 space-y-4">
					<div
						className={`w-16 h-16 ${currentStyle.iconBg} rounded-full flex items-center justify-center mb-2 animate-in zoom-in-50 duration-300`}
					>
						<Icon className={`w-8 h-8 ${currentStyle.iconColor}`} />
					</div>

					<div className="space-y-2">
						<DialogTitle className="text-xl font-bold text-gray-900 tracking-tight">
							{title}
						</DialogTitle>
						<DialogDescription className="text-center text-gray-500 leading-relaxed max-w-[280px] mx-auto">
							{message}
						</DialogDescription>
					</div>
				</div>

				<DialogFooter className="sm:justify-center p-6 pt-0 bg-white">
					<Button
						type="button"
						className={`w-full sm:w-auto min-w-[140px] text-white shadow-md transition-all active:scale-95 ${currentStyle.buttonClass}`}
						onClick={() => onOpenChange(false)}
					>
						{currentStyle.defaultLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
