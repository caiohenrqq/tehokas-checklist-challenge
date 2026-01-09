import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Layout, Loader2, Mail, Lock, User } from "lucide-react";

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const submit = (e) => {
		e.preventDefault();
		post(route("register"), {
			onFinish: () => reset("password", "password_confirmation"),
		});
	};

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

	const flashyVariants = {
		animate: {
			y: [0, -10, 0],
			filter: [
				"drop-shadow(0px 0px 0px rgba(79, 70, 229, 0))",
				"drop-shadow(0px 5px 15px rgba(79, 70, 229, 0.2))",
				"drop-shadow(0px 0px 0px rgba(79, 70, 229, 0))",
			],
			transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
		},
	};

	const arrowVariants = {
		hover: {
			x: [0, 5, -5, 0],
			opacity: [1, 0, 0, 1],
			transition: { duration: 0.4, times: [0, 0.5, 0.5, 1], ease: "easeInOut" },
		},
	};

	return (
		<>
			<Head title="Registrar" />

			<div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black text-black/50 dark:text-white/50 selection:bg-indigo-500 selection:text-white">
				<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-30"></div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="relative w-full max-w-md px-6 flex flex-col items-center"
				>
					<motion.div
						variants={flashyVariants}
						animate="animate"
						className="mb-8 p-4 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl ring-1 ring-indigo-500/10 backdrop-blur-sm"
					>
						<Layout className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
					</motion.div>

					<motion.h2
						variants={itemVariants}
						className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2"
					>
						Crie sua conta
					</motion.h2>

					<motion.p
						variants={itemVariants}
						className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 mb-8 text-center"
					>
						Comece a organizar seus projetos.
					</motion.p>

					<motion.form
						variants={itemVariants}
						onSubmit={submit}
						className="w-full space-y-4"
					>
						<div className="space-y-1">
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
								</div>
								<input
									id="name"
									type="text"
									value={data.name}
									onChange={(e) => setData("name", e.target.value)}
									placeholder="Nome Completo"
									className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
									required
								/>
							</div>
							{errors.name && (
								<p className="text-sm text-red-500 ml-4">{errors.name}</p>
							)}
						</div>

						<div className="space-y-1">
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
								</div>
								<input
									id="email"
									type="email"
									value={data.email}
									onChange={(e) => setData("email", e.target.value)}
									placeholder="Email"
									className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
									required
								/>
							</div>
							{errors.email && (
								<p className="text-sm text-red-500 ml-4">{errors.email}</p>
							)}
						</div>

						<div className="space-y-1">
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
								</div>
								<input
									id="password"
									type="password"
									value={data.password}
									onChange={(e) => setData("password", e.target.value)}
									placeholder="Senha"
									className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
									required
								/>
							</div>
							{errors.password && (
								<p className="text-sm text-red-500 ml-4">{errors.password}</p>
							)}
						</div>

						<div className="space-y-1">
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
								</div>
								<input
									id="password_confirmation"
									type="password"
									value={data.password_confirmation}
									onChange={(e) =>
										setData("password_confirmation", e.target.value)
									}
									placeholder="Confirmar Senha"
									className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 transition-all outline-none"
									required
								/>
							</div>
							{errors.password_confirmation && (
								<p className="text-sm text-red-500 ml-4">
									{errors.password_confirmation}
								</p>
							)}
						</div>

						<div className="pt-4">
							<motion.button
								whileHover="hover"
								type="submit"
								disabled={processing}
								className="group w-full inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold text-white bg-zinc-900 dark:bg-white dark:text-black rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-300 shadow-xl shadow-indigo-500/10 disabled:opacity-70 disabled:cursor-not-allowed"
							>
								{processing ? (
									<Loader2 className="w-5 h-5 animate-spin" />
								) : (
									<>
										Registrar
										<motion.div variants={arrowVariants}>
											<ArrowRight className="w-5 h-5" />
										</motion.div>
									</>
								)}
							</motion.button>
						</div>

						<div className="text-center mt-6">
							<Link
								href={route("login")}
								className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
							>
								Já possui conta?{" "}
								<span className="underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-indigo-500">
									Entrar
								</span>
							</Link>
						</div>
					</motion.form>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 1 }}
					className="absolute bottom-6 text-xs text-zinc-400 dark:text-zinc-600"
				>
					&copy; {new Date().getFullYear()} · Construído com ❤️ por caiohenrqq
				</motion.div>
			</div>
		</>
	);
}
