import { useForm } from "@inertiajs/react";
import { AlignLeft, FolderPlus, Loader2, Plus, Type } from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/Shadcn/UI/dialog";
import { Input } from "@/Components/Shadcn/UI/input";
import { Label } from "@/Components/Shadcn/UI/label";
import { Textarea } from "@/Components/Shadcn/UI/textarea";

export default function ProjectCreateDialog() {
	const [open, setOpen] = useState(false);
	const { data, setData, post, processing, errors, reset } = useForm({
		title: "",
		description: "",
	});

	const submit = (e) => {
		e.preventDefault();
		post(route("projects.store"), {
			onSuccess: () => {
				reset();
				setOpen(false);
			},
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size="lg"
					className="group h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-900/20"
				>
					<Plus className="w-5 h-5 mr-2 transition-transform duration-500 group-hover:rotate-180" />
					Novo Projeto
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden border-0 shadow-2xl">
				<form onSubmit={submit}>
					<DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
								<FolderPlus className="w-6 h-6 text-blue-600" />
							</div>
							<div className="space-y-1">
								<DialogTitle className="text-xl font-semibold text-gray-900 tracking-tight">
									Criar Novo Projeto
								</DialogTitle>
								<DialogDescription className="text-gray-500">
									Inicie um novo quadro para organizar suas tarefas.
								</DialogDescription>
							</div>
						</div>
					</DialogHeader>

					<div className="p-6 space-y-6">
						<div className="space-y-3">
							<Label
								htmlFor="title"
								className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"
							>
								<Type className="w-3.5 h-3.5" /> Nome do Projeto
							</Label>
							<Input
								id="title"
								value={data.title}
								onChange={(e) => setData("title", e.target.value)}
								placeholder="Ex: Redesign do Website..."
								className={`h-12 text-base shadow-sm border-gray-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all ${errors.title ? "border-red-300 focus-visible:ring-red-200" : ""}`}
							/>
							{errors.title && (
								<p className="text-xs text-red-500 font-medium animate-pulse">
									{errors.title}
								</p>
							)}
						</div>

						<div className="space-y-3">
							<Label
								htmlFor="description"
								className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"
							>
								<AlignLeft className="w-3.5 h-3.5" /> Descrição{" "}
								<span className="text-gray-300 font-normal normal-case tracking-normal ml-auto">
									(Opcional)
								</span>
							</Label>
							<Textarea
								id="description"
								value={data.description}
								onChange={(e) => setData("description", e.target.value)}
								placeholder="Descreva o objetivo principal deste projeto..."
								className="min-h-[120px] resize-none shadow-sm border-gray-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all"
							/>
						</div>
					</div>

					<DialogFooter className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
							className="text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm"
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							disabled={processing}
							className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 px-6"
						>
							{processing ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								"Criar Projeto"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
