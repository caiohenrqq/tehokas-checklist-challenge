import { useForm, Link } from "@inertiajs/react";
import {
	ArrowRight,
	Calendar,
	Layout,
	Loader2,
	MoreHorizontal,
	Pencil,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/Components/Shadcn/UI/badge";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/Components/Shadcn/UI/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/Components/Shadcn/UI/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/Shadcn/UI/dropdown-menu";
import { HealthBadge } from "@/Components/UI/HealthBadge";
import { formatDate } from "@/Utils/formatters";
import ProjectEditDialog from "./ProjectEditDialog";

const ProjectCard = ({ project }) => {
	const [editOpen, setEditOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const { delete: destroy, processing } = useForm();

	const totalTasks = project.tasks?.length || 0;
	const delayedCount = project.tasks?.filter((t) => t.is_delayed).length || 0;
	const isAlert = totalTasks > 0 && delayedCount / totalTasks >= 0.2;

	const handleDelete = () => {
		destroy(route("projects.destroy", project.id), {
			onSuccess: () => {
				setDeleteDialogOpen(false);
			},
			onError: () => {
				setDeleteDialogOpen(false);
			},
		});
	};

	return (
		<>
			<Link
				href={route("projects.show", project.id)}
				className="block h-full group"
			>
				<Card className="h-full border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col bg-white">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5 px-6">
						<h3 className="font-semibold text-lg text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors truncate pr-4 flex-1">
							{project.title}
						</h3>

						<div className="flex items-center gap-3 shrink-0">
							<HealthBadge health={isAlert ? "ALERT" : project.health} />

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 -mr-2 text-gray-400 hover:text-gray-700 focus-visible:ring-0 z-10"
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
									>
										<MoreHorizontal className="w-5 h-5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-40">
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											setEditOpen(true);
										}}
									>
										<Pencil className="w-3.5 h-3.5 mr-2 text-gray-500" />
										Editar
									</DropdownMenuItem>
									<DropdownMenuItem
										className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
										onClick={(e) => {
											e.stopPropagation();
											setDeleteDialogOpen(true);
										}}
									>
										<Trash2 className="w-3.5 h-3.5 mr-2" />
										Excluir
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</CardHeader>

					<CardContent className="px-6 py-2 grow">
						<p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
							{project.description || "Sem descrição definida."}
						</p>
					</CardContent>

					<CardFooter className="px-6 py-4 mt-auto border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
						<div className="flex items-center gap-5 text-xs font-medium text-gray-400">
							<div className="flex items-center gap-1.5">
								<Layout className="w-3.5 h-3.5" />
								<span>{project.task_count} Tasks</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Calendar className="w-3.5 h-3.5" />
								<span>{formatDate(project.created_at)}</span>
							</div>
						</div>

						<div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors overflow-hidden shadow-sm">
							<ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-all duration-500 group-hover:translate-x-0 -translate-x-0" />
						</div>
					</CardFooter>
				</Card>
			</Link>

			<ProjectEditDialog
				open={editOpen}
				onOpenChange={setEditOpen}
				project={project}
			/>

			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent className="sm:max-w-md text-center p-0 gap-0 overflow-hidden border-0 shadow-2xl">
					<div className="flex flex-col items-center justify-center p-8 pb-6 space-y-4">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2 animate-in zoom-in-50 duration-300">
							<Trash2 className="w-8 h-8 text-red-600" />
						</div>

						<div className="space-y-2">
							<DialogTitle className="text-xl font-bold text-gray-900 tracking-tight">
								Excluir Projeto?
							</DialogTitle>
							<DialogDescription className="text-center text-gray-500 leading-relaxed max-w-[280px] mx-auto">
								Você está prestes a excluir{" "}
								<span className="font-medium text-gray-900">
									"{project.title}"
								</span>
								. Todas as tarefas associadas serão perdidas.
							</DialogDescription>
						</div>
					</div>

					<DialogFooter className="flex flex-col sm:flex-row gap-3 p-6 pt-0 bg-white sm:justify-center">
						<Button
							type="button"
							variant="outline"
							className="w-full sm:w-auto min-w-[140px] border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
							onClick={() => setDeleteDialogOpen(false)}
							disabled={processing}
						>
							Cancelar
						</Button>
						<Button
							type="button"
							className="w-full sm:w-auto min-w-[140px] bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white shadow-md transition-all active:scale-95"
							onClick={handleDelete}
							disabled={processing}
						>
							{processing ? (
								<Loader2 className="w-4 h-4 animate-spin mr-2" />
							) : null}
							Sim, excluir
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProjectCard;
