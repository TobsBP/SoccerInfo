'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Teams', href: '/teams' },
  { label: 'Games', href: '/games' },
];

export default function MenuBar() {
  const pathname = usePathname();
  
  return (
    <nav className="w-full border-b border-zinc-800/50 bg-linear-to-r from-zinc-950 via-black to-zinc-950 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo/Brand */}
        <div className="relative">
          <span className="bg-linear-to-r from-zinc-200 via-slate-100 to-zinc-200 bg-clip-text text-xl font-black tracking-tight text-transparent drop-shadow-[0_0_20px_rgba(150,150,150,0.3)]">
            Brasileirão
          </span>
          <div className="absolute -bottom-1 left-0 h-px w-full bg-linear-to-r from-transparent via-zinc-500 to-transparent opacity-50" />
        </div>

        {/* Menu Items */}
        <ul className="flex gap-2">
          {menuItems.map(item => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {/* Background com efeito hover */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    active 
                      ? 'bg-linear-to-r from-zinc-800/60 to-zinc-900/60 shadow-[0_0_15px_rgba(100,100,100,0.2)]' 
                      : 'bg-zinc-900/0 group-hover:bg-zinc-900/40'
                  }`} />
                  
                  {/* Borda sutil no item ativo */}
                  {active && (
                    <div className="absolute inset-0 rounded-lg bg-linear-to-r from-zinc-700/30 via-slate-600/30 to-zinc-700/30" />
                  )}
                  
                  {/* Texto */}
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Underline animado */}
                  <div className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-linear-to-r from-transparent via-zinc-400 to-transparent transition-all duration-300 ${
                    active 
                      ? 'w-3/4 opacity-100' 
                      : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100'
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}