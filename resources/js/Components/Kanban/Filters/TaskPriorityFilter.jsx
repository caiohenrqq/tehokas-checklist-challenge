import { router } from "@inertiajs/react";
import { Filter, X } from "lucide-react";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/Components/Shadcn/UI/select";
import { PRIORITY } from "@/Constants/priority";

const TaskPriorityFilter = ({ currentPriority }) => {
	const activePriority = currentPriority
		? Object.values(PRIORITY).find((p) => p.key === Number(currentPriority))
		: null;

	const handleFilterChange = (value) => {
		router.get(
			route(route().current(), route().params),
			{ priority: value === "all" ? null : value },
			{
				preserveState: true,
				preserveScroll: true,
				replace: true,
			},
		);
	};

	return (
		<div className="flex items-center gap-2">
			<Select
				value={currentPriority ? String(currentPriority) : "all"}
				onValueChange={handleFilterChange}
			>
				<SelectTrigger className="h-9 w-[180px] pr-4 border-dashed border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:ring-0">
					<div className="flex items-center gap-2 text-xs font-medium">
						<Filter className="w-3.5 h-3.5 text-zinc-500" />
						<span className="text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
							{activePriority ? (
								<>
									<span>{activePriority.emoji}</span>
									<span>{activePriority.label}</span>
								</>
							) : (
								"Prioridade"
							)}
						</span>
					</div>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">
						<span className="font-medium text-zinc-500">Todas</span>
					</SelectItem>
					{Object.values(PRIORITY).map((priority) => (
						<SelectItem key={priority.key} value={String(priority.key)}>
							<div className="flex items-center gap-2">
								<span>{priority.emoji}</span>
								<span>{priority.label}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{currentPriority && (
				<Button
					variant="ghost"
					size="icon"
					onClick={() => handleFilterChange("all")}
					className="h-9 w-9 text-zinc-500 hover:text-zinc-900"
				>
					<X className="w-4 h-4" />
				</Button>
			)}
		</div>
	);
};

export default TaskPriorityFilter;
