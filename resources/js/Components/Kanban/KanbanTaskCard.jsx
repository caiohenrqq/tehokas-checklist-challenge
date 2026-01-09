import { Draggable } from "@hello-pangea/dnd";
import { useForm } from "@inertiajs/react";
import { Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/Components/Shadcn/UI/badge";
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
import { cn } from "@/lib/utils";
import { formatDate } from "@/Utils/formatters";
import { Button } from "../Shadcn/UI/button";
import KanbanEditTaskDialog from "./KanbanEditTaskDialog";

const KanbanTaskCard = ({ task, index }) => {
	const { delete: destroy, processing } = useForm();
	const [editOpen, setEditOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		destroy(route("tasks.destroy", task.id), {
			onSuccess: () => {
				setDeleteDialogOpen(false);
			},
			onError: () => {
				setDeleteDialogOpen(false);
				console.error("Error deleting task");
			},
		});
	};

	return (
		<>
			<Draggable draggableId={task.id.toString()} index={index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{ ...provided.draggableProps.style }}
						className="mb-3"
					>
						<Card
							className={cn(
								"group relative transition-all duration-200 ease-out border",
								snapshot.isDragging
									? "shadow-xl scale-[1.02] ring-1 ring-gray-900/5 z-50 cursor-grabbing border-gray-300"
									: "shadow-sm hover:shadow-md border-gray-100 cursor-grab",
								task.is_delayed ? "bg-red-50/50" : "bg-white",
							)}
						>
							<CardHeader className="p-4 pb-2 space-y-0">
								<div className="flex justify-between items-start gap-3">
									<span className="font-medium text-sm text-gray-900 leading-snug flex-1 break-words">
										{task.title}
									</span>

									<div className="flex items-start gap-2 shrink-0">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="h-6 w-6 -mt-1 text-gray-400 hover:text-gray-700 focus-visible:ring-0"
												>
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-40">
												<DropdownMenuItem
													className="cursor-pointer"
													onClick={() => setEditOpen(true)}
												>
													<Pencil className="w-3.5 h-3.5 mr-2 text-gray-500" />
													Editar
												</DropdownMenuItem>
												<DropdownMenuItem
													className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
													// Opens the custom delete dialog
													onClick={() => setDeleteDialogOpen(true)}
												>
													<Trash2 className="w-3.5 h-3.5 mr-2" />
													Excluir
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</CardHeader>

							<CardContent className="p-4 py-2">
								<p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
									{task.description}
								</p>
							</CardContent>

							<CardFooter className="p-4 pt-2">
								<div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors w-full">
									{/** biome-ignore lint/a11y/noSvgWithoutTitle: <title is useless here> */}
									<svg
										className="w-3.5 h-3.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span className="text-[11px] font-medium">
										{formatDate(task.deadline)}
									</span>
									{task.is_delayed && (
										<Badge
											variant="destructive"
											className="ml-auto px-1.5 py-0 text-[10px] uppercase font-bold tracking-wider h-5 bg-red-100 text-red-700 hover:bg-red-200 shadow-none border-0"
										>
											Atrasado
										</Badge>
									)}
								</div>
							</CardFooter>
						</Card>
					</div>
				)}
			</Draggable>

			<KanbanEditTaskDialog
				open={editOpen}
				onOpenChange={setEditOpen}
				task={task}
			/>

			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent className="sm:max-w-md text-center p-0 gap-0 overflow-hidden border-0 shadow-2xl">
					<div className="flex flex-col items-center justify-center p-8 pb-6 space-y-4">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2 animate-in zoom-in-50 duration-300">
							<Trash2 className="w-8 h-8 text-red-600" />
						</div>

						<div className="space-y-2">
							<DialogTitle className="text-xl font-bold text-gray-900 tracking-tight">
								Tem certeza absoluta?
							</DialogTitle>
							<DialogDescription className="text-center text-gray-500 leading-relaxed max-w-[280px] mx-auto">
								Você está prestes a excluir{" "}
								<span className="font-medium text-gray-900">
									"{task.title}"
								</span>
								. Essa ação é irreversível.
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

export default KanbanTaskCard;
