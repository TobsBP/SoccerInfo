import Image from 'next/image';
import { logout } from '@/actions/auth';
import { auth } from '@/auth';

export default async function ProfilePage() {
	const session = await auth();
	const user = session?.user;

	return (
		<main className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-950 p-8">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8">
					<h1 className="bg-linear-to-r from-zinc-400 via-slate-300 to-zinc-400 bg-clip-text text-5xl font-black text-transparent drop-shadow-[0_0_30px_rgba(100,100,100,0.4)]">
						Perfil
					</h1>
					<div className="mt-2 h-1 w-32 rounded-full bg-linear-to-r from-zinc-700 via-slate-600 to-zinc-700 shadow-[0_0_15px_rgba(100,100,100,0.5)]" />
				</div>

				<div className="rounded-2xl bg-linear-to-br from-zinc-950/95 to-black p-8 shadow-xl backdrop-blur-sm border border-zinc-800/50">
					<div className="flex flex-col items-center gap-6">
						{user?.image ? (
							<div className="relative h-32 w-32">
								<Image
									src={user.image}
									alt={user.name || 'User'}
									fill
									className="rounded-full object-cover border-4 border-zinc-800 shadow-lg"
								/>
							</div>
						) : (
							<div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-800 border-4 border-zinc-700 shadow-lg">
								<span className="text-4xl font-bold text-zinc-400">
									{user?.name?.charAt(0) || 'U'}
								</span>
							</div>
						)}

						<div className="text-center space-y-2">
							<h2 className="text-2xl font-bold text-zinc-200">{user?.name}</h2>
							<p className="text-zinc-400">{user?.email}</p>
						</div>

						<div className="w-full pt-6 border-t border-zinc-800">
							<form action={logout}>
								<button
									type="submit"
									className="w-full cursor-pointer rounded-xl bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500 transition-all duration-300 hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] border border-red-500/20"
								>
									Sair da Conta
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
