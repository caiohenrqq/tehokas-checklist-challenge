import { useForm } from "@inertiajs/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	Calendar as CalendarIcon,
	ListTodo,
	Loader2,
	Plus,
	X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/Components/Shadcn/UI/badge";
import { Button } from "@/Components/Shadcn/UI/button";
import { Calendar } from "@/Components/Shadcn/UI/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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

const KanbanCreateTaskDialog = ({ projectId, status, columnTitle }) => {
	const [open, setOpen] = useState(false);

	const [feedback, setFeedback] = useState({
		open: false,
		status: "success",
		title: "",
		message: "",
	});

	const statusMap = {
		pending: {
			label: "Pendente",
			color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
		},
		in_progress: {
			label: "Em Andamento",
			color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
		},
		completed: {
			label: "Finalizado",
			color:
				"bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
		},
	};

	const { data, setData, post, processing, errors, reset } = useForm({
		title: "",
		deadline: null,
		status: status,
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
					message:
						"Não foi possível salvar a tarefa. Verifique os dados em vermelho.",
				});
			},
		});
	};

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

				<DialogContent className="sm:max-w-[425px] p-0 gap-0 border-0 shadow-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
					<form onSubmit={handleSubmit}>
						<DialogHeader className="px-6 pt-6 pb-2">
							<div className="flex items-center gap-3">
								<div
									className={`p-2 rounded-lg ${statusMap[status]?.color || "bg-zinc-100"}`}
								>
									<ListTodo className="w-5 h-5" />
								</div>
								<div className="space-y-0.5">
									<DialogTitle className="text-lg font-bold text-zinc-900 dark:text-white">
										Nova Tarefa
									</DialogTitle>
									<DialogDescription className="sr-only">
										Criar nova tarefa na coluna {columnTitle}
									</DialogDescription>
									<div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
										Adicionando em:
										<Badge
											variant="secondary"
											className={`text-[10px] h-5 px-1.5 border-0 ${statusMap[status]?.color}`}
										>
											{columnTitle}
										</Badge>
									</div>
								</div>
							</div>
						</DialogHeader>

						<div className="p-6 space-y-4">
							<div className="space-y-2">
								<Label
									htmlFor="title"
									className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
								>
									Título
								</Label>
								<Input
									id="title"
									value={data.title}
									onChange={(e) => setData("title", e.target.value)}
									placeholder="O que precisa ser feito?"
									className={`h-11 shadow-sm bg-transparent border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 ${errors.title ? "border-red-300 dark:border-red-800" : ""}`}
									autoFocus
								/>
								{errors.title && (
									<span className="text-xs text-red-500 font-medium">
										{errors.title}
									</span>
								)}
							</div>

							<div className="space-y-2 flex flex-col">
								<Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
									<CalendarIcon className="w-3.5 h-3.5" /> Prazo Final
								</Label>
								<div className="flex gap-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"w-full pl-3 text-left font-normal h-10 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm",
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
											className="h-10 w-10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
										>
											<X className="w-4 h-4" />
										</Button>
									)}
								</div>
							</div>
						</div>

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
