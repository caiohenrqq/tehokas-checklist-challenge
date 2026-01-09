import { useForm } from "@inertiajs/react";
import { AlignLeft, Loader2, PencilLine, Save, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/Components/Shadcn/UI/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/Components/Shadcn/UI/dialog";
import { Input } from "@/Components/Shadcn/UI/input";
import { Label } from "@/Components/Shadcn/UI/label";
import { Textarea } from "@/Components/Shadcn/UI/textarea";
import FeedbackDialog from "@/Components/UI/FeedbackDialog";

const ProjectEditDialog = ({ open, onOpenChange, project }) => {
	const [feedback, setFeedback] = useState({
		open: false,
		status: "success",
		title: "",
		message: "",
	});

	const { data, setData, patch, processing, errors } = useForm({
		title: project.title || "",
		description: project.description || "",
	});

	useEffect(() => {
		if (open) {
			setData({
				title: project.title || "",
				description: project.description || "",
			});
		}
	}, [open, project, setData]);

	const handleSubmit = (e) => {
		e.preventDefault();

		patch(route("projects.update", project.id), {
			onSuccess: () => {
				onOpenChange(false);
				setFeedback({
					open: true,
					status: "success",
					title: "Projeto Atualizado",
					message: "As informações do projeto foram salvas com sucesso.",
				});
			},
			onError: () => {
				setFeedback({
					open: true,
					status: "error",
					title: "Erro ao Atualizar",
					message: "Verifique os dados informados e tente novamente.",
				});
			},
		});
	};

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-[500px] p-0 gap-0 border-0 shadow-2xl overflow-hidden">
					<form onSubmit={handleSubmit}>
						<DialogHeader className="px-6 pt-6 pb-2">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
									<PencilLine className="w-5 h-5" />
								</div>
								<div className="space-y-0.5">
									<DialogTitle className="text-lg font-bold text-gray-900">
										Editar Projeto
									</DialogTitle>
									<DialogDescription className="text-xs text-gray-500">
										Atualize as informações principais do seu projeto.
									</DialogDescription>
								</div>
							</div>
						</DialogHeader>

						<div className="p-6 space-y-5">
							<div className="space-y-2">
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
									className={`h-11 shadow-sm border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 ${errors.title ? "border-red-300" : ""}`}
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
									className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"
								>
									<AlignLeft className="w-3.5 h-3.5" /> Descrição
								</Label>
								<Textarea
									id="description"
									value={data.description}
									onChange={(e) => setData("description", e.target.value)}
									className="resize-none min-h-[100px] border-gray-200 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500"
								/>
							</div>
						</div>

						<DialogFooter className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-2">
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => onOpenChange(false)}
								className="text-gray-500"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								size="sm"
								disabled={processing}
								className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6"
							>
								{processing ? (
									<Loader2 className="mr-2 h-3 w-3 animate-spin" />
								) : (
									<Save className="mr-2 h-3.5 w-3.5" />
								)}
								Salvar Alterações
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<FeedbackDialog
				open={feedback.open}
				onOpenChange={(isOpen) => setFeedback({ ...feedback, open: isOpen })}
				status={feedback.status}
				title={feedback.title}
				message={feedback.message}
			/>
		</>
	);
};

export default ProjectEditDialog;
