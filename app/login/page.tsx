'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        
        // Créer aussi l'entrée dans la table User Prisma/Supabase si besoin
        if (data.user) {
          await fetch('/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: data.user.id, email: data.user.email })
          });
        }
        alert('Inscription réussie ! Vérifiez vos e-mails si la confirmation est active, ou connectez-vous.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        if (data.session) {
          // Stocker l'ID utilisateur réel pour le récupérer dans le dashboard et les exercices
          localStorage.setItem('sn_academy_user_id', data.session.user.id);
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#161b22] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-500/10 text-blue-400 rounded-2xl">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isSignUp ? 'Créer un compte' : 'Connexion à ServiceNow Academy'}
          </h1>
          <p className="text-xs text-gray-400">Accédez à votre parcours, vos notes et vos badges d'architecture.</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-300">Adresse e-mail</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@exemple.com"
                className="w-full bg-[#0d1117] border border-gray-800 rounded-xl px-4 py-3 pl-10 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-300">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d1117] border border-gray-800 rounded-xl px-4 py-3 pl-10 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 text-sm"
          >
            <span>{loading ? 'Traitement...' : (isSignUp ? "S'inscrire" : 'Se connecter')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-blue-400 hover:underline"
          >
            {isSignUp ? 'Déjà un compte ? Connectez-vous' : "Pas encore de compte ? S'inscrire"}
          </button>
        </div>

        <div className="pt-4 border-t border-gray-800 text-center">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-400">
            ← Retour à l'accueil
          </Link>
        </div>

      </div>
    </div>
  );
}