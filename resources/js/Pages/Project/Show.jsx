import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const STATUS_LABELS = {
	pending: "Pendente",
	in_progress: "Em Andamento",
	completed: "Concluída",
};

const STATUS_COLORS = {
	pending: "bg-gray-100 border-gray-300",
	in_progress: "bg-blue-50 border-blue-200",
	completed: "bg-green-50 border-green-200",
};

export default function Show({ auth, project }) {
	const tasks = project.data.tasks;

	// Filter tasks into columns
	const columns = {
		pending: tasks.filter((t) => t.status.value === "pending"),
		in_progress: tasks.filter((t) => t.status.value === "in_progress"),
		completed: tasks.filter((t) => t.status.value === "completed"),
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex justify-between items-center">
					<h2 className="font-semibold text-xl text-gray-800 leading-tight">
						{project.data.title}
					</h2>
					{/* Health Badge in Header */}
					<span
						className={`px-3 py-1 rounded-full text-sm font-bold ${
							project.data.health.is_alert
								? "bg-red-100 text-red-800"
								: "bg-green-100 text-green-800"
						}`}
					>
						{project.data.health.label}
					</span>
				</div>
			}
		>
			<Head title={`Kanban - ${project.data.title}`} />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{/* Kanban Board Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
						<KanbanColumn
							title="Pendente"
							tasks={columns.pending}
							color="border-t-4 border-gray-400"
						/>

						<KanbanColumn
							title="Em Andamento"
							tasks={columns.in_progress}
							color="border-t-4 border-blue-400"
						/>

						<KanbanColumn
							title="Concluída"
							tasks={columns.completed}
							color="border-t-4 border-green-400"
						/>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}

// Sub-component for the Column
function KanbanColumn({ title, tasks, color }) {
	return (
		<div className={`bg-white rounded-lg shadow-sm p-4 ${color} min-h-[500px]`}>
			<h3 className="font-bold text-gray-700 mb-4 flex justify-between">
				{title}
				<span className="bg-gray-100 text-gray-600 px-2 rounded-full text-xs py-1">
					{tasks.length}
				</span>
			</h3>

			<div className="space-y-3">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
				{tasks.length === 0 && (
					<div className="text-gray-400 text-sm text-center italic mt-10">
						Vazio
					</div>
				)}
			</div>
		</div>
	);
}

// Sub-component for the Card (Handles Logic)
function TaskCard({ task }) {
	// Function to handle status change
	const handleChange = (e) => {
		const newStatus = e.target.value;

		// Inertia Manual Visit (Patch Request)
		router.patch(
			route("tasks.update", task.id),
			{
				status: newStatus,
			},
			{
				preserveScroll: true, // Don't scroll to top
				onSuccess: () => {
					// Optional: Toast notification here
					console.log("Status updated!");
				},
			},
		);
	};

	return (
		<div
			className={`p-4 rounded border shadow-sm bg-white ${task.is_delayed ? "border-red-300 bg-red-50" : "border-gray-200"}`}
		>
			<div className="flex justify-between items-start mb-2">
				<span className="font-semibold text-gray-800 text-sm">
					{task.title}
				</span>
				{task.is_delayed && (
					<span className="text-[10px] bg-red-200 text-red-800 px-1 rounded font-bold">
						ATRASADO
					</span>
				)}
			</div>

			<p className="text-gray-500 text-xs mb-3 line-clamp-2">
				{task.description}
			</p>

			<div className="flex justify-between items-center mt-2">
				<span className="text-xs text-gray-400">{task.deadline}</span>

				{/* Status Changer */}
				<select
					value={task.status.value}
					onChange={handleChange}
					className="text-xs p-1 border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
				>
					<option value="pending">Pendente</option>
					<option value="in_progress">Em Andamento</option>
					<option value="completed">Concluída</option>
				</select>
			</div>
		</div>
	);
}
