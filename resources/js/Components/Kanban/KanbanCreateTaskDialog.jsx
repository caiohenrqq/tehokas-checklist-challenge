import { useForm } from "@inertiajs/react";
import { ListTodo, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/Components/Shadcn/UI/badge";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/Shadcn/UI/dialog";
import FeedbackDialog from "../UI/FeedbackDialog";
import TaskFormBody from "./Forms/TaskFormBody";
import { TASK_STATUS_CONFIG } from "@/Constants/taskStatus";
import { PRIORITY } from "@/Constants/priority";

const KanbanCreateTaskDialog = ({ projectId, status, columnTitle }) => {
	const [open, setOpen] = useState(false);
	const [feedback, setFeedback] = useState({
		open: false,
		status: "success",
		title: "",
		message: "",
	});

	const { data, setData, post, processing, errors, reset } = useForm({
		title: "",
		description: "",
		deadline: null,
		status: status,
		priority: PRIORITY.no_priority.key,
		project_id: projectId,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("tasks.store"), {
			onSuccess: () => {
				reset();
				setOpen(false);
				setFeedback({
					open: true,
					status: "success",
					title: "Tarefa Criada!",
					message: "A tarefa foi adicionada ao quadro.",
				});
			},
			onError: () => {
				setFeedback({
					open: true,
					status: "error",
					title: "Erro ao Criar",
					message: "Não foi possível salvar a tarefa. Verifique os dados.",
				});
			},
		});
	};

	const statusInfo = TASK_STATUS_CONFIG[status] || { color: "bg-zinc-100" };

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<button
						type="button"
						className="w-full mt-3 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg border-2 border-transparent hover:border-dashed hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
					>
						<div className="p-1 rounded-md bg-transparent group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors">
							<Plus className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
						</div>
					</button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[500px] p-0 gap-0 border-0 shadow-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
					<form onSubmit={handleSubmit}>
						<DialogHeader className="px-6 pt-6 pb-2">
							<div className="flex items-center gap-3">
								<div className={`p-2 rounded-lg ${statusInfo.color}`}>
									<ListTodo className="w-5 h-5" />
								</div>
								<div className="space-y-0.5">
									<DialogTitle className="text-lg font-bold text-zinc-900 dark:text-white">
										Nova Tarefa
									</DialogTitle>
									<DialogDescription className="sr-only">
										Criar nova tarefa
									</DialogDescription>
									<div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
										Adicionando em:
										<Badge
											variant="secondary"
											className={`text-[10px] h-5 px-1.5 border-0 ${statusInfo.color}`}
										>
											{columnTitle}
										</Badge>
									</div>
								</div>
							</div>
						</DialogHeader>

						<TaskFormBody data={data} setData={setData} errors={errors} />

						<DialogFooter className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => setOpen(false)}
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
								{processing && (
									<Loader2 className="mr-2 h-3 w-3 animate-spin" />
								)}
								Criar Tarefa
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

export default KanbanCreateTaskDialog;
