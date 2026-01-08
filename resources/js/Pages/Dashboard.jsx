import { Head, Link } from "@inertiajs/react";
import { ArrowRight, Calendar, Layout, LogOut } from "lucide-react";
import ProjectCreateDialog from "@/Components/Projects/CreateProjectDialog";
import { Badge } from "@/Components/Shadcn/UI/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/Components/Shadcn/UI/card";
import { HealthBadge } from "@/Components/UI/HealthBadge";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate } from "@/Utils/formatters";

const Dashboard = ({ auth, projects }) => {
	const firstName = auth.user.name.split(" ")[0];
	const projectCount = projects.data.length;

	return (
		<AuthenticatedLayout user={auth.user} header={null}>
			<Head title="Dashboard" />

			<div className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="mb-4">
						<Link
							href={route("logout")}
							method="post"
							as="button"
							className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors font-medium group"
						>
							<LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
							Sair do Sistema
						</Link>
					</div>

					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-7">
						<div className="space-y-2 flex-1">
							<div className="flex items-center gap-3">
								<h2 className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
									Dashboard
								</h2>
								<span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold border border-gray-200">
									{projectCount} {projectCount === 1 ? "Projeto" : "Projetos"}
								</span>
							</div>
							<p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
								Bem-vindo de volta,{" "}
								<span className="font-medium text-gray-900">{firstName}</span>.
							</p>
						</div>

						<div className="flex items-center gap-4">
							<ProjectCreateDialog />
						</div>
					</div>
				</div>
			</div>

			<div className="min-h-[calc(100vh-180px)] bg-gray-50/50 py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{projects.data.map((project) => {
							const delayedCount =
								project.tasks?.filter((t) => t.is_delayed).length || 0;

							return (
								<Link
									key={project.id}
									href={route("projects.show", project.id)}
									className="block h-full group"
								>
									<Card className="h-full border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col bg-white">
										<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5 px-6">
											<h3 className="font-semibold text-lg text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors truncate pr-4">
												{project.title}
											</h3>

											<div className="shrink-0">
												{delayedCount > 0 ? (
													<Badge
														variant="destructive"
														className="h-6 flex items-center gap-2 px-2.5 bg-red-50 text-red-700 hover:bg-red-100 border-red-100 shadow-none"
													>
														<span className="font-bold">Alerta</span>
														<div className="w-px h-3 bg-red-200" />
														<span className="flex items-center gap-1 font-medium text-[10px]">
															{delayedCount}
														</span>
													</Badge>
												) : (
													<HealthBadge health={project.health} />
												)}
											</div>
										</CardHeader>

										<CardContent className="px-6 py-2 grow">
											<p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
												{project.description || "Sem descrição definida."}
											</p>
										</CardContent>

										<CardFooter className="px-6 py-4 mt-auto border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
											<div className="flex items-center gap-5 text-xs font-medium text-gray-400">
												<div className="flex items-center gap-1.5">
													<Layout className="w-3.5 h-3.5" />
													<span>{project.task_count} Tasks</span>
												</div>
												<div className="flex items-center gap-1.5">
													<Calendar className="w-3.5 h-3.5" />
													<span>{formatDate(project.created_at)}</span>
												</div>
											</div>

											<div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors overflow-hidden shadow-sm">
												<ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 transition-all duration-500 group-hover:translate-x-0 -translate-x-0" />
											</div>
										</CardFooter>
									</Card>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
};

export default Dashboard;
