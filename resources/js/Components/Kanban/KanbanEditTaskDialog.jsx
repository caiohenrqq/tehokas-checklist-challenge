import { useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	Calendar as CalendarIcon,
	Loader2,
	PencilLine,
	Save,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/Components/Shadcn/UI/button";
import { Calendar } from "@/Components/Shadcn/UI/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/Components/Shadcn/UI/dialog";
import { Input } from "@/Components/Shadcn/UI/input";
import { Label } from "@/Components/Shadcn/UI/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/Components/Shadcn/UI/popover";
import { cn } from "@/lib/utils";
import FeedbackDialog from "../UI/FeedbackDialog";

const KanbanEditTaskDialog = ({ open, onOpenChange, task }) => {
	const [feedback, setFeedback] = useState({
		open: false,
		status: "success",
		title: "",
		message: "",
	});

	const { data, setData, patch, processing, errors } = useForm({
		title: task.title || "",
		deadline: task.deadline ? new Date(task.deadline) : null,
	});

	useEffect(() => {
		if (open) {
			setData({
				title: task.title || "",
				deadline: task.deadline ? new Date(task.deadline) : null,
			});
		}
	}, [open, task, setData]);

	const handleSubmit = (e) => {
		e.preventDefault();

		patch(route("tasks.update", task.id), {
			onSuccess: () => {
				onOpenChange(false);
				setFeedback({
					open: true,
					status: "success",
					title: "Tarefa Atualizada!",
					message: "As alterações foram salvas com sucesso.",
				});
			},
			onError: () => {
				setFeedback({
					open: true,
					status: "error",
					title: "Erro ao Atualizar",
					message: "Verifique os dados informados e tente novamente.",
				});
			},
		});
	};

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-[425px] p-0 gap-0 border-0 shadow-2xl">
					<form onSubmit={handleSubmit}>
						<DialogHeader className="px-6 pt-6 pb-2">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
									<PencilLine className="w-5 h-5" />
								</div>
								<div className="space-y-0.5">
									<DialogTitle className="text-lg font-bold text-gray-900">
										Editar Tarefa
									</DialogTitle>
									<DialogDescription className="text-xs text-gray-500">
										Faça alterações na tarefa abaixo.
									</DialogDescription>
								</div>
							</div>
						</DialogHeader>

						<div className="p-6 space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="edit-title"
									className="text-xs font-bold text-gray-500 uppercase tracking-wider"
								>
									Título
								</Label>
								<Input
									id="edit-title"
									value={data.title}
									onChange={(e) => setData("title", e.target.value)}
									placeholder="Nome da tarefa"
									className={`h-11 shadow-sm border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 ${errors.title ? "border-red-300" : ""}`}
								/>
								{errors.title && (
									<span className="text-xs text-red-500 font-medium">
										{errors.title}
									</span>
								)}
							</div>

							<div className="space-y-2 flex flex-col">
								<Label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
									<CalendarIcon className="w-3.5 h-3.5" /> Prazo Final
								</Label>
								<div className="flex gap-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"w-full pl-3 text-left font-normal h-10 border-gray-200 shadow-sm",
													!data.deadline && "text-muted-foreground",
												)}
											>
												{data.deadline ? (
													format(data.deadline, "PPP", { locale: ptBR })
												) : (
													<span>Sem prazo definido</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={data.deadline}
												onSelect={(date) => setData("deadline", date)}
												initialFocus
												locale={ptBR}
											/>
										</PopoverContent>
									</Popover>
									{data.deadline && (
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => setData("deadline", null)}
											className="h-10 w-10 text-gray-500"
										>
											<X className="w-4 h-4" />
										</Button>
									)}
								</div>
							</div>
						</div>

						<DialogFooter className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => onOpenChange(false)}
								className="text-gray-500"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								size="sm"
								disabled={processing}
								className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6"
							>
								{processing ? (
									<Loader2 className="mr-2 h-3 w-3 animate-spin" />
								) : (
									<Save className="mr-2 h-3.5 w-3.5" />
								)}
								Salvar Alterações
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<FeedbackDialog
				open={feedback.open}
				onOpenChange={(isOpen) => setFeedback({ ...feedback, open: isOpen })}
				status={feedback.status}
				title={feedback.title}
				message={feedback.message}
			/>
		</>
	);
};

export default KanbanEditTaskDialog;
