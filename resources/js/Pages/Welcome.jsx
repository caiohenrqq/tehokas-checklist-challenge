import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Layout } from "lucide-react";

const MotionLink = motion(Link);

export default function Welcome({ auth }) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 10,
			},
		},
	};

	const flashyVariants = {
		animate: {
			y: [0, -15, 0],
			scale: [1, 1.1, 1],
			filter: [
				"drop-shadow(0px 0px 0px rgba(79, 70, 229, 0))",
				"drop-shadow(0px 10px 20px rgba(79, 70, 229, 0.4))",
				"drop-shadow(0px 0px 0px rgba(79, 70, 229, 0))",
			],
			transition: {
				duration: 4,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	const arrowVariants = {
		hover: {
			x: [0, 5, -5, 0],
			opacity: [1, 0, 0, 1],
			transition: {
				duration: 0.4,
				times: [0, 0.5, 0.5, 1],
				ease: "easeInOut",
			},
		},
	};

	return (
		<>
			<Head title="Bem-vindo" />

			<div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black text-black/50 dark:text-white/50 selection:bg-indigo-500 selection:text-white">
				<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-30"></div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="relative w-full max-w-2xl px-6 lg:max-w-7xl flex flex-col items-center text-center"
				>
					<motion.div
						variants={flashyVariants}
						animate="animate"
						className="mb-8 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl ring-1 ring-indigo-500/10 backdrop-blur-sm"
					>
						<Layout className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
					</motion.div>

					<motion.h1
						variants={itemVariants}
						className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
					>
						Kanban
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className="text-lg md:text-xl leading-relaxed text-zinc-500 dark:text-zinc-400 mb-10 max-w-lg mx-auto"
					>
						Organize seus projetos, otimize seu fluxo de trabalho e visualize o
						sucesso. Simples, limpo e feito para o foco.
					</motion.p>

					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
					>
						{auth.user ? (
							<MotionLink
								href={route("dashboard")}
								whileHover="hover"
								className="group inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white bg-zinc-900 dark:bg-white dark:text-black rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-indigo-500/10 overflow-hidden"
							>
								Ir para sua área de trabalho
								<motion.div variants={arrowVariants}>
									<ArrowRight className="w-4 h-4" />
								</motion.div>
							</MotionLink>
						) : (
							<>
								<MotionLink
									href={route("register")}
									whileHover="hover"
									className="group inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white bg-zinc-900 dark:bg-white dark:text-black rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-indigo-500/20 overflow-hidden"
								>
									Começar Agora
									<motion.div variants={arrowVariants}>
										<ArrowRight className="w-4 h-4" />
									</motion.div>
								</MotionLink>
								<Link
									href={route("login")}
									className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
								>
									Entrar
								</Link>
							</>
						)}
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 1 }}
					className="absolute bottom-6 text-xs text-zinc-400 dark:text-zinc-600"
				>
					&copy; {new Date().getFullYear()} · Construído com ❤️ por caiohenrqq
				</motion.div>
			</div>
		</>
	);
}
