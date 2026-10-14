'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Flame, User, LogOut, LogIn, Home, Cpu, Layers } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userXP, setUserXP] = useState<number>(26); // Valeur par défaut ou depuis le state/DB

  useEffect(() => {
    // 1. Vérifier la session Supabase active
    async function getUserSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserEmail(session.user.email || 'Utilisateur');
      } else {
        setUserEmail(null);
      }
    }

    getUserSession();

    // 2. Écouter les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email || 'Utilisateur');
      } else {
        setUserEmail(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fonction de déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('sn_academy_user_id');
    setUserEmail(null);
    router.push('/login');
    router.refresh();
  };

  // Extraire le nom d'utilisateur depuis l'email (ex: jeff.warren@gmail.com -> Jeff Warren)
  const displayName = userEmail 
    ? userEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : 'Jeff Warren';

  return (
    <header className="bg-[#0b0f19]/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Navigation Gauche / Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-lg font-bold text-blue-500 tracking-tight flex items-center gap-2">
            ServiceNow Academy
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition flex items-center gap-1.5">
              <Home size={14} />
              <span>Accueil</span>
            </Link>
            <Link href="/technique" className="hover:text-white transition flex items-center gap-1.5">
              <Cpu size={14} />
              <span>Technique</span>
            </Link>
            <Link href="/fonctionnel" className="hover:text-white transition flex items-center gap-1.5">
              <Layers size={14} />
              <span>Fonctionnel</span>
            </Link>
          </nav>
        </div>

        {/* Profil & Actions Droite */}
        <div className="flex items-center space-x-4">
          
          {/* Badge XP */}
          <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Flame size={14} className="fill-amber-400" />
            <span>{userXP} XP</span>
          </div>

          {/* Utilisateur Connecté / Déconnexion */}
          <div className="flex items-center space-x-3 border-l border-gray-800 pl-4">
            <Link href="/dashboard" className="flex items-center space-x-2 text-xs font-medium text-gray-200 hover:text-white transition">
              <div className="p-1.5 bg-gray-800 rounded-full text-gray-300">
                <User size={14} />
              </div>
              <span className="hidden sm:inline">{displayName}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
              title="Se déconnecter"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}