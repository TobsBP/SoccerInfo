'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Menu
    home: 'Home',
    teams: 'Times',
    games: 'Jogos',
    dashboard: 'Dashboard',
    
    // Botões
    login: 'Entrar',
    register: 'Cadastrar',
    logout: 'Sair',
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    
    // Páginas
    welcome: 'Bem-vindo',
    noGames: 'Nenhum jogo agendado',
    loading: 'Carregando...',
    
    // Forms
    email: 'Email',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    rememberMe: 'Lembrar-me',
    forgotPassword: 'Esqueci a senha',

    // Footer
    description: 'Plataforma completa para gerenciamento e acompanhamento dos jogos do Campeonato Brasileiro.',
    quickLinks: 'Links Rápidos',
    support: 'Suporte',
    documentation: 'Documentação',
    helpCenter: 'Central de Ajuda',
    contact: 'Contato',
    status: 'Status',
    rightsReserved: 'Todos os direitos reservados.',
    privacy: 'Privacidade',
    termsOfUse: 'Termos de Uso',
    cookies: 'Cookies',

    // Dashboard
    totalGames: 'Total de Jogos',
    finished: 'Finalizados',
    scheduled: 'Agendados',
    notEnoughData: 'Ainda não há dados suficientes para gerar gráficos',
    awaitingFinishedGames: 'Aguardando jogos finalizados...',
    bestTeam: 'Melhor Time',
    points: 'pontos',
    performanceLeader: 'Aproveitamento (Líder)',
    ofWins: 'de vitórias',
    totalAnalyzed: 'Total Analisado',
    finishedGames: 'jogos finalizados',
    topTeams: 'Top 5 Times (Pontos)',
    resultsDistribution: 'Distribuição de Resultados',
    homeWins: 'Vitórias em Casa',
    awayWins: 'Vitórias Fora',
    draws: 'Empates',
    pointsLabel: 'Pontos',
  },
  en: {
    // Menu
    home: 'Home',
    teams: 'Teams',
    games: 'Games',
    dashboard: 'Dashboard',
    
    // Botões
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    
    // Páginas
    welcome: 'Welcome',
    noGames: 'No games scheduled',
    loading: 'Loading...',
    
    // Forms
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',

    // Footer
    description: 'Complete platform for management and tracking of Brazilian Championship games.',
    quickLinks: 'Quick Links',
    support: 'Support',
    documentation: 'Documentation',
    helpCenter: 'Help Center',
    contact: 'Contact',
    status: 'Status',
    rightsReserved: 'All rights reserved.',
    privacy: 'Privacy',
    termsOfUse: 'Terms of Use',
    cookies: 'Cookies',

    // Dashboard
    totalGames: 'Total Games',
    finished: 'Finished',
    scheduled: 'Scheduled',
    notEnoughData: 'There is not enough data to generate charts yet',
    awaitingFinishedGames: 'Waiting for finished games...',
    bestTeam: 'Best Team',
    points: 'points',
    performanceLeader: 'Win Rate (Leader)',
    ofWins: 'of wins',
    totalAnalyzed: 'Total Analyzed',
    finishedGames: 'finished games',
    topTeams: 'Top 5 Teams (Points)',
    resultsDistribution: 'Results Distribution',
    homeWins: 'Home Wins',
    awayWins: 'Away Wins',
    draws: 'Draws',
    pointsLabel: 'Points',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}