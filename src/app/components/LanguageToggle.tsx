'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <button
      type='button'
      onClick={toggleLanguage}
      className="group relative flex items-center gap-2 rounded-xl bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:bg-zinc-800 hover:shadow-[0_0_20px_rgba(100,100,100,0.3)]"
      aria-label="Trocar idioma"
    >
      {/* Ícone */}
      <Globe className="h-4 w-4 transition-transform group-hover:rotate-12" />
      
      {/* Texto do idioma */}
      <span className="uppercase">{language}</span>
      
      {/* Indicador visual */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-r from-zinc-700/20 via-slate-600/20 to-zinc-700/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}