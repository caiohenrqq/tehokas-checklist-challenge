import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/Components/Shadcn/UI/button";
import { Calendar } from "@/Components/Shadcn/UI/calendar";
import { Label } from "@/Components/Shadcn/UI/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/Components/Shadcn/UI/popover";
import { cn } from "@/lib/utils";

const TaskDeadlinePicker = ({ date, onDateChange }) => {
	return (
		<div className="space-y-2 flex flex-col">
			<Label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
				<CalendarIcon className="w-3.5 h-3.5" /> Prazo Final
			</Label>
			<div className="flex gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								"w-full pl-3 text-left font-normal h-10 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm",
								!date && "text-muted-foreground",
							)}
						>
							{date ? (
								format(date, "PPP", { locale: ptBR })
							) : (
								<span>Sem prazo</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={onDateChange}
							initialFocus
							locale={ptBR}
						/>
					</PopoverContent>
				</Popover>
				{date && (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => onDateChange(null)}
						className="h-10 w-10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						<X className="w-4 h-4" />
					</Button>
				)}
			</div>
		</div>
	);
};

export default TaskDeadlinePicker;
