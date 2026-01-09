import { DragDropContext } from "@hello-pangea/dnd";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Layout } from "lucide-react";
import { motion } from "framer-motion";
import KanbanColumn from "@/Components/Kanban/KanbanColumn";
import { HealthBadge } from "@/Components/UI/HealthBadge";
import { useKanban } from "@/Hooks/useKanban";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Show({ auth, project }) {
	const { title, health, description, id } = project.data;

	const { localTasks, columns, onDragEnd } = useKanban(project.data.tasks);

	const totalTasks = localTasks.length;
	const completedCount = columns.completed.length;
	const delayedCount = localTasks.filter((t) => t.is_delayed).length;
	const progress =
		totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 100, damping: 10 },
		},
	};

	return (
		<AuthenticatedLayout user={auth.user} header={null}>
			<Head title={`Kanban - ${title}`} />

			<div className="relative min-h-[calc(100vh-65px)] w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
				<div className="inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-30 fixed"></div>

				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="sticky top-0 z-20 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-black/70 backdrop-blur-xl"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="mb-6">
							<Link
								href={route("dashboard")}
								className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group"
							>
								<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
								Voltar para Dashboard
							</Link>
						</div>

						<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
							<div className="space-y-2 flex-1">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
										<Layout className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
									</div>
									<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-none">
										{title}
									</h2>
									<HealthBadge status={health} />
								</div>
								<p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed pl-1">
									{description ||
										"Gerencie as tarefas do seu projeto visualmente."}
								</p>
							</div>

							<div className="flex items-center gap-8 bg-zinc-50/80 dark:bg-zinc-900/80 px-6 py-3 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm backdrop-blur-sm">
								<div className="flex flex-col items-center min-w-[60px]">
									<span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-0.5">
										Total
									</span>
									<span className="text-xl font-bold text-zinc-900 dark:text-white">
										{totalTasks}
									</span>
								</div>

								<div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />

								<div className="flex flex-col items-center min-w-[60px]">
									<span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-0.5">
										Atrasadas
									</span>
									<span
										className={`text-xl font-bold ${
											delayedCount > 0
												? "text-red-500"
												: "text-zinc-900 dark:text-white"
										}`}
									>
										{delayedCount}
									</span>
								</div>

								<div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800" />

								<div className="flex flex-col items-center min-w-[60px]">
									<span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-0.5">
										Progresso
									</span>
									<div className="flex items-center gap-1.5">
										<span className="text-xl font-bold text-emerald-500">
											{progress}%
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="h-full py-8 overflow-x-auto"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
						<DragDropContext onDragEnd={onDragEnd}>
							<motion.div
								variants={itemVariants}
								className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full items-start"
							>
								<KanbanColumn
									projectId={id}
									droppableId="pending"
									title="Pendente"
									tasks={columns.pending}
									dotColor="bg-zinc-400"
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
							</motion.div>
						</DragDropContext>
					</div>
				</motion.div>
			</div>
		</AuthenticatedLayout>
	);
}
