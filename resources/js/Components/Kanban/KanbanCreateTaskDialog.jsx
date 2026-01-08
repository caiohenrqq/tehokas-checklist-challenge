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

export default function KanbanCreateTaskDialog({
	projectId,
	status,
	columnTitle,
}) {
	const [open, setOpen] = useState(false);

	const [feedback, setFeedback] = useState({
		open: false,
		status: "success",
		title: "",
		message: "",
	});

	const statusMap = {
		pending: { label: "Pendente", color: "bg-gray-100 text-gray-600" },
		in_progress: { label: "Em Andamento", color: "bg-blue-50 text-blue-700" },
		completed: { label: "Finalizado", color: "bg-emerald-50 text-emerald-700" },
	};

	const { data, setData, post, processing, errors, reset } = useForm({
		title: "",
		deadline: null,
		status: status,
		project_id: projectId,
	});

	const submit = (e) => {
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
						className="w-full mt-3 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-700 hover:bg-gray-50/80 rounded-lg border-2 border-transparent hover:border-dashed hover:border-gray-200 transition-all group"
					>
						<div className="p-1 rounded-md bg-transparent group-hover:bg-white transition-colors">
							<Plus className="w-4 h-4" />
						</div>
					</button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px] p-0 gap-0 border-0 shadow-2xl">
					<form onSubmit={submit}>
						<DialogHeader className="px-6 pt-6 pb-2">
							<div className="flex items-center gap-3">
								<div
									className={`p-2 rounded-lg ${statusMap[status]?.color || "bg-gray-100"}`}
								>
									<ListTodo className="w-5 h-5" />
								</div>
								<div className="space-y-0.5">
									<DialogTitle className="text-lg font-bold text-gray-900">
										Nova Tarefa
									</DialogTitle>
									<DialogDescription className="sr-only">
										Criar nova tarefa na coluna {columnTitle}
									</DialogDescription>
									<div className="flex items-center gap-2 text-xs text-gray-500">
										Adicionando em:
										<Badge
											variant="secondary"
											className={`text-[10px] h-5 px-1.5 ${statusMap[status]?.color}`}
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
									className="text-xs font-bold text-gray-500 uppercase tracking-wider"
								>
									Título
								</Label>
								<Input
									id="title"
									value={data.title}
									onChange={(e) => setData("title", e.target.value)}
									placeholder="O que precisa ser feito?"
									className={`h-11 shadow-sm border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 ${errors.title ? "border-red-300" : ""}`}
									autoFocus
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
								onClick={() => setOpen(false)}
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
}
