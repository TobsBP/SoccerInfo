'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
	const { t } = useLanguage();

	return (
		<footer className="w-full border-t border-zinc-800/50 bg-linear-to-r from-zinc-950 via-black to-zinc-950 backdrop-blur-xl">
			<div className="mx-auto max-w-7xl px-4 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand Section */}
					<div className="col-span-1 md:col-span-2">
						<div className="mb-4">
							<span className="bg-linear-to-r from-zinc-200 via-slate-100 to-zinc-200 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(150,150,150,0.3)]">
								Soccer Info
							</span>
							<div className="mt-2 h-px w-24 bg-linear-to-r from-zinc-500 via-slate-500 to-transparent opacity-50" />
						</div>
						<p className="max-w-md text-sm leading-relaxed text-zinc-500">
							{t('description')}
						</p>

						{/* Social Links */}
						<div className="mt-6 flex gap-4">
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(100,100,100,0.3)]"
								aria-label="Twitter"
							>
								<svg
									className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-zinc-300"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Twitter</title>
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
							</a>
							<a
								href="https://x.com"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(100,100,100,0.3)]"
								aria-label="Instagram"
							>
								<svg
									className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-zinc-300"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Instagram</title>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</a>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(100,100,100,0.3)]"
								aria-label="GitHub"
							>
								<svg
									className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-zinc-300"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>GitHub</title>
									<path
										fillRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clipRule="evenodd"
									/>
								</svg>
							</a>
						</div>
					</div>

					{/* Links Rápidos */}
					<div>
						<h3 className="mb-4 text-sm font-bold text-zinc-300">
							{t('quickLinks')}
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('home')}
								</Link>
							</li>
							<li>
								<Link
									href="/teams"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('teams')}
								</Link>
							</li>
							<li>
								<Link
									href="/games"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('games')}
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('dashboard')}
								</Link>
							</li>
						</ul>
					</div>

					{/* Suporte */}
					<div>
						<h3 className="mb-4 text-sm font-bold text-zinc-300">
							{t('support')}
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="#"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('documentation')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('helpCenter')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('contact')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
								>
									{t('status')}
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="my-8 h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

				{/* Bottom Section */}
				<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
					<p className="text-sm text-zinc-600">
						© {new Date().getFullYear()} Soccer Info. {t('rightsReserved')}
					</p>
					<div className="flex gap-6 text-sm">
						<Link
							href="#"
							className="text-zinc-600 transition-colors hover:text-zinc-400"
						>
							{t('privacy')}
						</Link>
						<Link
							href="#"
							className="text-zinc-600 transition-colors hover:text-zinc-400"
						>
							{t('termsOfUse')}
						</Link>
						<Link
							href="#"
							className="text-zinc-600 transition-colors hover:text-zinc-400"
						>
							{t('cookies')}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
