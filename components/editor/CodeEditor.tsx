'use client';

import { Terminal, Play } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  onRun: () => void;
  language?: string;
  title?: string;
}

export default function CodeEditor({ code, onChange, onRun, language = 'javascript', title = 'script.js' }: CodeEditorProps) {
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center space-x-2 font-mono">
          <Terminal size={14} className="text-blue-400" />
          <span>{title}</span>
        </span>
        <span className="uppercase text-[10px] tracking-wider text-gray-500 font-semibold">{language}</span>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[420px] bg-transparent p-5 text-sm font-mono text-gray-200 resize-y focus:outline-none leading-relaxed"
        spellCheck={false}
      />

      <div className="bg-[#161b22] px-4 py-3 border-t border-gray-800 flex items-center justify-between">
        <span className="text-xs text-gray-500">Modifiez le script ci-dessus et lancez la validation.</span>
        <button
          onClick={onRun}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          <Play size={14} />
          <span>Lancer les tests (Run)</span>
        </button>
      </div>
    </div>
  );
}