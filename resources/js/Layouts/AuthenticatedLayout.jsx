import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, Layout, Menu, X } from "lucide-react";
import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function AuthenticatedLayout({ header, children }) {
	const user = usePage().props.auth.user;

	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false);

	return (
		<div className="min-h-screen relative bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500 selection:text-white">
			<div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-30"></div>
			<nav className="sticky top-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-black/70 backdrop-blur-xl">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 justify-between">
						<div className="flex">
							<div className="flex shrink-0 items-center">
								<Link href="/">
									<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-500/10">
										<Layout className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
									</div>
								</Link>
							</div>

							<div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
								<NavLink
									href={route("dashboard")}
									active={route().current("dashboard")}
									className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
								>
									Dashboard
								</NavLink>
							</div>
						</div>

						<div className="hidden sm:ms-6 sm:flex sm:items-center">
							<div className="relative ms-3">
								<Dropdown>
									<Dropdown.Trigger>
										<span className="inline-flex rounded-md">
											<button
												type="button"
												className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition duration-150 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white focus:outline-none"
											>
												{user.name}
												<ChevronDown className="h-4 w-4 text-zinc-400" />
											</button>
										</span>
									</Dropdown.Trigger>

									<Dropdown.Content contentClasses="py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
										<Dropdown.Link href={route("profile.edit")}>
											Perfil
										</Dropdown.Link>
										<Dropdown.Link
											href={route("logout")}
											method="post"
											as="button"
										>
											Sair
										</Dropdown.Link>
									</Dropdown.Content>
								</Dropdown>
							</div>
						</div>

						<div className="-me-2 flex items-center sm:hidden">
							<button
								type="button"
								onClick={() =>
									setShowingNavigationDropdown(
										(previousState) => !previousState,
									)
								}
								className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 transition duration-150 ease-in-out hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-500 focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-zinc-500 focus:outline-none"
							>
								{showingNavigationDropdown ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						</div>
					</div>
				</div>

				<div
					className={
						(showingNavigationDropdown ? "block" : "hidden") +
						" sm:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800"
					}
				>
					<div className="space-y-1 pb-3 pt-2">
						<ResponsiveNavLink
							href={route("dashboard")}
							active={route().current("dashboard")}
						>
							Dashboard
						</ResponsiveNavLink>
					</div>

					<div className="border-t border-zinc-200 dark:border-zinc-800 pb-1 pt-4">
						<div className="px-4">
							<div className="text-base font-medium text-zinc-800 dark:text-zinc-200">
								{user.name}
							</div>
							<div className="text-sm font-medium text-zinc-500">
								{user.email}
							</div>
						</div>

						<div className="mt-3 space-y-1">
							<ResponsiveNavLink href={route("profile.edit")}>
								Perfil
							</ResponsiveNavLink>
							<ResponsiveNavLink
								method="post"
								href={route("logout")}
								as="button"
							>
								Sair
							</ResponsiveNavLink>
						</div>
					</div>
				</div>
			</nav>

			{header && (
				<header className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-zinc-100 dark:border-zinc-800/50">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						{header}
					</div>
				</header>
			)}

			<main className="relative z-0">{children}</main>
		</div>
	);
}
