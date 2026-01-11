import { AlignLeft } from "lucide-react";
import { Input } from "@/Components/Shadcn/UI/input";
import { Label } from "@/Components/Shadcn/UI/label";
import { Textarea } from "@/Components/Shadcn/UI/textarea";
import TaskDeadlinePicker from "../Inputs/TaskDeadlinePicker";
import TaskPrioritySelect from "../Inputs/TaskPrioritySelect";

const TaskFormBody = ({ data, setData, errors }) => {
	return (
		<div className="p-6 space-y-4">
			<div className="space-y-2">
				<Label
					htmlFor="title"
					className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
				>
					Título
				</Label>
				<Input
					id="title"
					value={data.title}
					onChange={(e) => setData("title", e.target.value)}
					placeholder="O que precisa ser feito?"
					className={`h-11 shadow-sm bg-transparent border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 ${
						errors.title ? "border-red-300 dark:border-red-800" : ""
					}`}
					autoFocus
				/>
				{errors.title && (
					<span className="text-xs text-red-500 font-medium">
						{errors.title}
					</span>
				)}
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="description"
					className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2"
				>
					<AlignLeft className="w-3.5 h-3.5" /> Descrição
				</Label>
				<Textarea
					id="description"
					value={data.description}
					onChange={(e) => setData("description", e.target.value)}
					placeholder="Adicione detalhes sobre esta tarefa..."
					className="min-h-[80px] resize-none shadow-sm bg-transparent border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
				/>
				{errors.description && (
					<span className="text-xs text-red-500 font-medium">
						{errors.description}
					</span>
				)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<TaskPrioritySelect
					value={data.priority}
					onValueChange={(val) => setData("priority", val)}
				/>
				<TaskDeadlinePicker
					date={data.deadline}
					onDateChange={(date) => setData("deadline", date)}
				/>
			</div>
		</div>
	);
};

export default TaskFormBody;
