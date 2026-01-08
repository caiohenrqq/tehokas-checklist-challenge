import { Droppable } from "@hello-pangea/dnd";
import KanbanCreateTaskDialog from "./KanbanCreateTaskDialog";
import KanbanTaskCard from "./KanbanTaskCard";

const KanbanColumn = ({ projectId, title, tasks, dotColor, droppableId }) => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex items-center justify-between mb-4 px-1">
				<div className="flex items-center gap-2.5">
					<div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
					<h3 className="font-bold text-gray-700 text-sm tracking-tight uppercase">
						{title}
					</h3>
					<span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">
						{tasks.length}
					</span>
				</div>
			</div>

			<div className="flex-1 bg-gray-100/50 rounded-xl p-3 border border-gray-200/60 flex flex-col">
				<Droppable droppableId={droppableId}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={`flex flex-col gap-3 transition-colors duration-200 ${
								snapshot.isDraggingOver ? "bg-indigo-50/50" : ""
							}`}
						>
							{tasks.map((task, index) => (
								<KanbanTaskCard key={task.id} task={task} index={index} />
							))}

							{provided.placeholder}

							<KanbanCreateTaskDialog
								projectId={projectId}
								status={droppableId}
								columnTitle={title}
								color={dotColor}
							/>
						</div>
					)}
				</Droppable>
			</div>
		</div>
	);
};

export default KanbanColumn;
