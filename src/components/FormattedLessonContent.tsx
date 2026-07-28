'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, Info, Lightbulb, ShieldAlert, ChevronRight, Terminal, Copy, Check } from 'lucide-react';

interface ContentProps {
  content: string;
}

export default function FormattedLessonContent({ content }: ContentProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Parse markdown content into structured blocks
  const parseBlocks = (raw: string) => {
    const lines = raw.split('\n');
    const blocks: Array<{ type: string; content: any }> = [];
    let currentTable: string[] = [];
    let inTable = false;
    let currentCode: string[] = [];
    let inCode = false;
    let codeLang = '';
    let currentCallout: { type: string; lines: string[] } | null = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block start/end
      if (line.trim().startsWith('```')) {
        if (inCode) {
          blocks.push({ type: 'code', content: { lang: codeLang, code: currentCode.join('\n') } });
          currentCode = [];
          inCode = false;
        } else {
          inCode = true;
          codeLang = line.trim().replace('```', '');
        }
        continue;
      }

      if (inCode) {
        currentCode.push(line);
        continue;
      }

      // Callouts (> [!IMPORTANT], > [!NOTE], etc.)
      if (line.trim().startsWith('> [!')) {
        const match = line.trim().match(/> \[!(IMPORTANT|NOTE|WARNING|TIP)\]/);
        if (match) {
          if (currentCallout) {
            blocks.push({ type: 'callout', content: currentCallout });
          }
          currentCallout = { type: match[1], lines: [] };
          continue;
        }
      }

      if (currentCallout) {
        if (line.trim().startsWith('>') || (line.trim() !== '' && !line.startsWith('#'))) {
          currentCallout.lines.push(line.replace(/^>\s*/, ''));
          continue;
        } else {
          blocks.push({ type: 'callout', content: currentCallout });
          currentCallout = null;
        }
      }

      // Table start/end
      if (line.trim().startsWith('|')) {
        inTable = true;
        currentTable.push(line.trim());
        continue;
      } else if (inTable) {
        blocks.push({ type: 'table', content: parseTable(currentTable) });
        currentTable = [];
        inTable = false;
      }

      // Headers
      if (line.startsWith('### ')) {
        blocks.push({ type: 'h3', content: line.replace('### ', '').trim() });
        continue;
      }
      if (line.startsWith('#### ')) {
        blocks.push({ type: 'h4', content: line.replace('#### ', '').trim() });
        continue;
      }
      if (line.startsWith('## ')) {
        blocks.push({ type: 'h2', content: line.replace('## ', '').trim() });
        continue;
      }

      // Lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        blocks.push({ type: 'li', content: line.trim().replace(/^[-*]\s+/, '') });
        continue;
      }

      if (line.trim().match(/^\d+\.\s+/)) {
        blocks.push({ type: 'num-li', content: line.trim().replace(/^\d+\.\s+/, '') });
        continue;
      }

      // Horizontal Rule
      if (line.trim() === '---') {
        blocks.push({ type: 'hr', content: null });
        continue;
      }

      // Paragraph
      if (line.trim() !== '') {
        blocks.push({ type: 'p', content: line.trim() });
      }
    }

    if (currentCallout) {
      blocks.push({ type: 'callout', content: currentCallout });
    }
    if (inTable && currentTable.length > 0) {
      blocks.push({ type: 'table', content: parseTable(currentTable) });
    }

    return blocks;
  };

  // Helper to parse markdown tables into headers and rows
  const parseTable = (rows: string[]) => {
    if (rows.length < 2) return null;
    const cleanCells = (rowStr: string) =>
      rowStr
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim());

    const headers = cleanCells(rows[0]);
    const dataRows = rows.slice(2).map((r) => cleanCells(r));
    return { headers, dataRows };
  };

  const blocks = parseBlocks(content);

  // Helper to format inline bold, code, and links
  const renderFormattedText = (text: string) => {
    // Replace **bold** with <strong>
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\$[^\$]+\$)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-cyan-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono text-xs border border-slate-700">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        return (
          <span key={idx} className="font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded text-xs">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={idx} className="text-xl sm:text-2xl font-black text-white pt-6 pb-2 border-b border-white/10 flex items-center gap-2">
                <span className="w-2 h-6 bg-cyan-500 rounded-full inline-block shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                {block.content}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={idx} className="text-lg font-bold text-white pt-4 pb-1 flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-cyan-400" />
                {block.content}
              </h3>
            );

          case 'h4':
            return (
              <h4 key={idx} className="text-base font-bold text-cyan-300 pt-3 pb-1">
                {block.content}
              </h4>
            );

          case 'p':
            return (
              <p key={idx} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {renderFormattedText(block.content)}
              </p>
            );

          case 'li':
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1 pl-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span className="text-slate-200 text-sm leading-relaxed">
                  {renderFormattedText(block.content)}
                </span>
              </div>
            );

          case 'num-li':
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1 pl-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  •
                </span>
                <span className="text-slate-200 text-sm leading-relaxed">
                  {renderFormattedText(block.content)}
                </span>
              </div>
            );

          case 'hr':
            return <hr key={idx} className="border-white/10 my-6" />;

          case 'callout': {
            const { type, lines } = block.content;
            let calloutStyle = 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200';
            let Icon = Info;
            let title = 'Note';

            if (type === 'IMPORTANT') {
              calloutStyle = 'bg-red-500/10 border-red-500/30 text-red-200';
              Icon = ShieldAlert;
              title = 'CRITICAL OPERATIONAL MANDATE';
            } else if (type === 'WARNING') {
              calloutStyle = 'bg-amber-500/10 border-amber-500/30 text-amber-200';
              Icon = AlertTriangle;
              title = 'SAFETY WARNING';
            } else if (type === 'TIP') {
              calloutStyle = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200';
              Icon = Lightbulb;
              title = 'OPERATOR PRO TIP';
            }

            return (
              <div key={idx} className={`p-6 rounded-3xl border ${calloutStyle} my-6 space-y-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                  <Icon className="w-4 h-4" />
                  <span>{title}</span>
                </div>
                <div className="text-xs sm:text-sm space-y-1 leading-relaxed">
                  {lines.map((l: string, i: number) => (
                    <p key={i}>{renderFormattedText(l)}</p>
                  ))}
                </div>
              </div>
            );
          }

          case 'table': {
            if (!block.content) return null;
            const { headers, dataRows } = block.content;

            return (
              <div key={idx} className="my-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#030305]/80 backdrop-blur-md shadow-inner">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                      {headers.map((h: string, hIdx: number) => (
                        <th key={hIdx} className="p-4 sm:p-5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {dataRows.map((r: string[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-white/5 transition-colors duration-300">
                        {r.map((cell: string, cIdx: number) => (
                          <td key={cIdx} className="p-3.5 sm:p-4 text-slate-300">
                            {renderFormattedText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case 'code': {
            const { lang, code } = block.content;
            return (
              <div key={idx} className="my-8 rounded-3xl border border-white/10 bg-[#030305]/80 backdrop-blur-md overflow-hidden font-mono shadow-inner">
                <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10 text-xs text-slate-400">
                  <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-cyan-400">
                    <Terminal className="w-3.5 h-3.5" />
                    {lang || 'COMMAND / DIAGRAM'}
                  </span>
                  <button
                    onClick={() => handleCopyCode(code, idx)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-xs text-cyan-200 leading-relaxed font-mono">
                  <code>{code}</code>
                </pre>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
