import { Draggable } from "@hello-pangea/dnd";
import { Badge } from "@/Components/Shadcn/UI/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/Components/Shadcn/UI/card";
import { cn } from "@/lib/utils";
import { formatDate } from "@/Utils/formatters";

export default function KanbanTaskCard({ task, index }) {
	return (
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
								<span className="font-medium text-sm text-gray-900 leading-snug">
									{task.title}
								</span>
								{task.is_delayed && (
									<Badge
										variant="destructive"
										className="px-1.5 py-0 text-[10px] uppercase font-bold tracking-wider h-5 bg-red-100 text-red-700 hover:bg-red-200 shadow-none border-0"
									>
										Atrasado
									</Badge>
								)}
							</div>
						</CardHeader>

						<CardContent className="p-4 py-2">
							<p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
								{task.description}
							</p>
						</CardContent>

						<CardFooter className="p-4 pt-2">
							<div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors">
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
							</div>
						</CardFooter>
					</Card>
				</div>
			)}
		</Draggable>
	);
}
