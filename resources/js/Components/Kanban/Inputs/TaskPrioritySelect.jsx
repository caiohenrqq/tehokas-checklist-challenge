import { Flag } from "lucide-react";
import { Label } from "@/Components/Shadcn/UI/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/Components/Shadcn/UI/select";
import { PRIORITY } from "@/Constants/priority";

const TaskPrioritySelect = ({ value, onValueChange }) => {
	return (
		<div className="space-y-2 flex flex-col">
			<Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
				<Flag className="w-3.5 h-3.5" /> Prioridade
			</Label>
			<Select
				value={String(value)}
				onValueChange={(val) => onValueChange(Number(val))}
			>
				<SelectTrigger className="h-10 border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-indigo-500/20">
					<SelectValue placeholder="Selecione" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(PRIORITY).map((priority) => (
						<SelectItem key={priority.key} value={String(priority.key)}>
							<div className="flex items-center justify-between w-[165px]">
								<span>{priority.label}</span>
								<span>{priority.emoji}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default TaskPrioritySelect;
