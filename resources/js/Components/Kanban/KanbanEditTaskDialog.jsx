import { useForm } from "@inertiajs/react";
import { Loader2, PencilLine, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/Components/Shadcn/UI/dialog";
import FeedbackDialog from "../UI/FeedbackDialog";
import TaskFormBody from "./Forms/TaskFormBody";

const KanbanEditTaskDialog = ({ open, onOpenChange, task }) => {
	const [feedback, setFeedback] = useState({
		open: false,
		status: "success",
		title: "",
		message: "",
	});

	const { data, setData, patch, processing, errors } = useForm({
		title: task.title || "",
		description: task.description || "",
		deadline: task.deadline ? new Date(task.deadline) : null,
		priority: task.priority,
	});

	useEffect(() => {
		if (open) {
			setData({
				title: task.title || "",
				description: task.description || "",
				deadline: task.deadline ? new Date(task.deadline) : null,
				priority: task.priority ?? 1,
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
				<DialogContent className="sm:max-w-[500px] p-0 gap-0 border-0 shadow-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
					<form onSubmit={handleSubmit}>
						<DialogHeader className="px-6 pt-6 pb-2">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white">
									<PencilLine className="w-5 h-5" />
								</div>
								<div className="space-y-0.5">
									<DialogTitle className="text-lg font-bold text-zinc-900 dark:text-white">
										Editar Tarefa
									</DialogTitle>
									<DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
										Faça alterações na tarefa abaixo.
									</DialogDescription>
								</div>
							</div>
						</DialogHeader>

						<TaskFormBody data={data} setData={setData} errors={errors} />

						<DialogFooter className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => onOpenChange(false)}
								className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								size="sm"
								disabled={processing}
								className="bg-zinc-900 hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm px-6 rounded-full"
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
