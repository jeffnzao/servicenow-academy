'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface CourseFilterProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

export default function CourseFilter({ onSearchChange, onCategoryChange, selectedCategory }: CourseFilterProps) {
  const categories = ['Tous', 'Client', 'Serveur', 'Intégration', 'Architecture'];

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 md:p-6 space-y-4 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Barre de recherche textuelle */}
        <div className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un cours technique..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#0d1117] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filtres par catégorie */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter size={14} className="text-gray-400 shrink-0 mr-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-[#0d1117] text-gray-400 border border-gray-800 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}