import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Layout, LogOut } from "lucide-react";
import ProjectCard from "@/Components/Projects/ProjectCard";
import ProjectCreateDialog from "@/Components/Projects/ProjectCreateDialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Dashboard = ({ auth, projects }) => {
	const firstName = auth.user.name.split(" ")[0];
	const projectCount = projects.data.length;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 100, damping: 10 },
		},
	};

	return (
		<AuthenticatedLayout user={auth.user} header={null}>
			<Head title="Dashboard" />

			<div className="relative min-h-[calc(100vh-65px)] w-full bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
				<div className="inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-30 fixed"></div>

				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="sticky top-0 z-20 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-black/70 backdrop-blur-xl"
				>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
						<div className="mb-6">
							<Link
								href={route("logout")}
								method="post"
								as="button"
								className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors group"
							>
								<LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
								Sair do Sistema
							</Link>
						</div>

						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
							<div className="space-y-2 flex-1">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
										<Layout className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
									</div>
									<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white leading-none">
										Dashboard
									</h2>
									<span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold border border-zinc-200 dark:border-zinc-700">
										{projectCount} {projectCount === 1 ? "Projeto" : "Projetos"}
									</span>
								</div>
								<p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed pl-1">
									Bem-vindo de volta,{" "}
									<span className="font-semibold text-zinc-900 dark:text-white">
										{firstName}
									</span>
									. Gerencie seus quadros aqui.
								</p>
							</div>

							<div className="flex items-center gap-4">
								<ProjectCreateDialog />
							</div>
						</div>
					</div>
				</motion.div>

				<div className="py-8">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						>
							{projects.data.map((project) => (
								<motion.div key={project.id} variants={itemVariants}>
									<ProjectCard project={project} />
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
};

export default Dashboard;
