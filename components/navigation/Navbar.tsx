'use client';

import Link from 'next/link';
import { BookOpen, User, Home, Cpu, Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="border-b border-gray-800 bg-[#111827] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-6">
        <Link href="/" className="font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center space-x-2">
          <span>ServiceNow Academy</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 text-xs font-medium text-gray-300">
          <Link href="/" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
            <Home size={14} />
            <span>Accueil</span>
          </Link>
          <Link href="/technique" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
            <Cpu size={14} />
            <span>Technique</span>
          </Link>
          <Link href="/fonctionnel" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
            <Layers size={14} />
            <span>Fonctionnel</span>
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-400">
        <div className="flex items-center space-x-1 text-yellow-400 font-medium text-xs">
          <span>🔥 26 XP</span>
        </div>
        <div className="flex items-center space-x-2 border-l border-gray-700 pl-4">
          <User size={16} className="text-gray-300" />
          <span className="text-gray-200 text-xs font-medium">Jeff Warren</span>
        </div>
      </div>
    </header>
  );
}