import { motion } from "framer-motion";

export const FooterLayout = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 1, duration: 1 }}
			className="absolute bottom-6 text-xs text-zinc-400 dark:text-zinc-600"
		>
			&copy; {new Date().getFullYear()} · Construído com ❤️ por caiohenrqq
		</motion.div>
	);
};
