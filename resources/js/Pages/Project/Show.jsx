import { DragDropContext } from "@hello-pangea/dnd";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import KanbanColumn from "@/Components/Kanban/KanbanColumn";
import { HealthBadge } from "@/Components/UI/HealthBadge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ auth, project }) {
	const [localTasks, setLocalTasks] = useState(project.data.tasks);

	useEffect(() => {
		setLocalTasks(project.data.tasks);
	}, [project.data.tasks]);

	const { title, health, description, id } = project.data;

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const newStatus = destination.droppableId;
		const updatedTasks = localTasks.map((t) =>
			t.id.toString() === draggableId ? { ...t, status: newStatus } : t,
		);
		setLocalTasks(updatedTasks);

		if (source.droppableId !== destination.droppableId) {
			router.patch(
				route("tasks.update", draggableId),
				{ status: newStatus },
				{
					preserveScroll: true,
					onError: () => setLocalTasks(project.data.tasks),
				},
			);
		}
	};

	const columns = {
		pending: localTasks.filter((t) => t.status === "pending"),
		in_progress: localTasks.filter((t) => t.status === "in_progress"),
		completed: localTasks.filter((t) => t.status === "completed"),
	};

	const totalTasks = localTasks.length;
	const completedCount = columns.completed.length;
	const delayedCount = localTasks.filter((t) => t.is_delayed).length;

	const progress =
		totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

	return (
		<AuthenticatedLayout user={auth.user} header={null}>
			<Head title={`Kanban - ${title}`} />

			<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="mb-4">
						<Link
							href={route("dashboard")}
							className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium group"
						>
							<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							Voltar para Dashboard
						</Link>
					</div>

					<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
						<div className="space-y-2 flex-1">
							<div className="flex items-center gap-3">
								<h2 className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
									{title}
								</h2>
								<HealthBadge status={health} />
							</div>
							<p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
								{description ||
									"Gerencie as tarefas do seu projeto visualmente."}
							</p>
						</div>

						<div className="flex items-center gap-8 bg-gray-50/50 px-6 py-3 rounded-xl border border-gray-100">
							<div className="flex flex-col items-center min-w-[60px]">
								<span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
									Total
								</span>
								<span className="text-xl font-bold text-gray-900">
									{totalTasks}
								</span>
							</div>

							<div className="w-px h-8 bg-gray-200/60" />

							<div className="flex flex-col items-center min-w-[60px]">
								<span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
									Atrasadas
								</span>
								<span
									className={`text-xl font-bold ${delayedCount > 0 ? "text-red-600" : "text-gray-900"}`}
								>
									{delayedCount}
								</span>
							</div>

							<div className="w-px h-8 bg-gray-200/60" />

							<div className="flex flex-col items-center min-w-[60px]">
								<span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-0.5">
									Progresso
								</span>
								<div className="flex items-center gap-1.5">
									<span className="text-xl font-bold text-emerald-600">
										{progress}%
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="min-h-[calc(100vh-180px)] bg-gray-50/50 py-8 overflow-x-auto">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
					<DragDropContext onDragEnd={onDragEnd}>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-start">
							<KanbanColumn
								projectId={id}
								droppableId="pending"
								title="Pendente"
								tasks={columns.pending}
								dotColor="bg-gray-400"
							/>
							<KanbanColumn
								projectId={id}
								droppableId="in_progress"
								title="Em Andamento"
								tasks={columns.in_progress}
								dotColor="bg-blue-500"
							/>
							<KanbanColumn
								projectId={id}
								droppableId="completed"
								title="Finalizado"
								tasks={columns.completed}
								dotColor="bg-emerald-500"
							/>
						</div>
					</DragDropContext>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
