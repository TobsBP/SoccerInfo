'use client';
import Link from 'next/link';
import { useState } from 'react';
import { loginWithCredentials, loginWithGoogle } from '@/actions/auth';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		try {
			const result = await loginWithCredentials(formData);
			if (result?.error) {
				alert(result.error);
			}
		} catch (error) {
			console.error(error);
			if ((error as Error).message === 'NEXT_REDIRECT') {
				return;
			}
			alert('Erro ao fazer login. Tente novamente.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-4">
			{/* Background decorativo */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-zinc-800/20 blur-3xl" />
				<div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-slate-800/20 blur-3xl" />
			</div>

			<div className="relative w-full max-w-md">
				{/* Card de Login */}
				<div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-950/95 to-black p-8 shadow-2xl backdrop-blur-sm">
					{/* Borda gradiente */}
					<div className="absolute inset-0 rounded-3xl bg-linear-to-r from-zinc-700/30 via-slate-600/30 to-zinc-700/30 opacity-50" />

					{/* Glow effect */}
					<div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-zinc-600 via-slate-500 to-zinc-600 opacity-20 blur-xl" />

					<div className="relative z-10">
						{/* Logo/Header */}
						<div className="mb-8 text-center">
							<h1 className="mb-2 bg-linear-to-r from-zinc-200 via-slate-100 to-zinc-200 bg-clip-text text-4xl font-black text-transparent drop-shadow-[0_0_20px_rgba(150,150,150,0.3)]">
								Soccer Info
							</h1>
							<p className="text-sm text-zinc-500">
								Entre para gerenciar os jogos
							</p>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Email */}
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-zinc-300"
								>
									Email
								</label>
								<div className="relative">
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="seu@email.com"
										required
										className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
									/>
									<div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-zinc-800/0 via-slate-700/0 to-zinc-800/0 opacity-0 blur-xl transition-opacity duration-300 focus-within:opacity-30" />
								</div>
							</div>

							{/* Password */}
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-zinc-300"
								>
									Senha
								</label>
								<div className="relative">
									<input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="••••••••"
										required
										className="w-full rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-zinc-100 placeholder-zinc-600 backdrop-blur-sm transition-all duration-300 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
									/>
								</div>
							</div>

							{/* Lembrar e Esqueci senha */}
							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-300">
									<input
										type="checkbox"
										className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-zinc-500 focus:ring-2 focus:ring-zinc-700/50 focus:ring-offset-0"
									/>
									Lembrar-me
								</label>
								<button
									type="button"
									className="text-zinc-400 transition-colors hover:text-zinc-200"
								>
									Esqueci a senha
								</button>
							</div>

							{/* Botão Submit */}
							<button
								type="submit"
								disabled={isLoading}
								className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-zinc-800 to-zinc-900 px-6 py-3 font-semibold text-zinc-100 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(100,100,100,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<div className="absolute inset-0 bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								<span className="relative z-10">
									{isLoading ? (
										<span className="flex items-center justify-center gap-2">
											<svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
												<title> Loading </title>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
													fill="none"
												/>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
											Entrando...
										</span>
									) : (
										'Entrar'
									)}
								</span>
							</button>
						</form>

						{/* Divider */}
						<div className="my-6 flex items-center gap-4">
							<div className="h-px flex-1 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
							<span className="text-xs text-zinc-600">OU</span>
							<div className="h-px flex-1 bg-linear-to-r from-transparent via-zinc-800 to-transparent" />
						</div>

						{/* Social Login */}
						<div className="space-y-3">
							<button
								type="button"
								onClick={() => loginWithGoogle()}
								className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-800/50 bg-zinc-950/50 px-4 py-3 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/50 cursor-pointer"
							>
								<svg className="h-5 w-5" viewBox="0 0 24 24">
									<title>Google Logo</title>
									<path
										fill="currentColor"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="currentColor"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="currentColor"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="currentColor"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								Continuar com Google
							</button>
						</div>

						{/* Cadastro */}
						<p className="mt-6 text-center text-sm text-zinc-500">
							Não tem uma conta?{' '}
							<Link
								href="/register"
								className="font-medium text-zinc-300 transition-colors hover:text-zinc-100"
							>
								Criar conta
							</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
