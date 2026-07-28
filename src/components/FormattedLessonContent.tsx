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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <strong key={idx} className="font-semibold text-stone-900 dark:text-stone-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200 font-mono text-xs border border-stone-200 dark:border-stone-700">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        return (
          <span key={idx} className="font-mono text-stone-800 bg-stone-100 dark:text-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded-md text-xs">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={idx} className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 pt-6 pb-2 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-stone-900 dark:bg-stone-100 rounded-full inline-block"></span>
                {block.content}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={idx} className="text-lg font-bold text-stone-900 dark:text-stone-50 pt-4 pb-1 flex items-center gap-2">
                <ChevronRight className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                {block.content}
              </h3>
            );

          case 'h4':
            return (
              <h4 key={idx} className="text-base font-semibold text-stone-800 dark:text-stone-200 pt-3 pb-1">
                {block.content}
              </h4>
            );

          case 'p':
            return (
              <p key={idx} className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
                {renderFormattedText(block.content)}
              </p>
            );

          case 'li':
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1 pl-2">
                <CheckCircle2 className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0 mt-1" />
                <span className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                  {renderFormattedText(block.content)}
                </span>
              </div>
            );

          case 'num-li':
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1 pl-2">
                <span className="w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  •
                </span>
                <span className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                  {renderFormattedText(block.content)}
                </span>
              </div>
            );

          case 'hr':
            return <hr key={idx} className="border-stone-200 dark:border-stone-800 my-6" />;

          case 'callout': {
            const { type, lines } = block.content;
            let calloutStyle = 'bg-stone-50 border-stone-200 text-stone-800 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-200';
            let Icon = Info;
            let title = 'Note';

            if (type === 'IMPORTANT') {
              calloutStyle = 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-900/50 dark:text-rose-300';
              Icon = ShieldAlert;
              title = 'CRITICAL OPERATIONAL MANDATE';
            } else if (type === 'WARNING') {
              calloutStyle = 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/30 dark:border-orange-900/50 dark:text-orange-300';
              Icon = AlertTriangle;
              title = 'SAFETY WARNING';
            } else if (type === 'TIP') {
              calloutStyle = 'bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-950/30 dark:border-teal-900/50 dark:text-teal-300';
              Icon = Lightbulb;
              title = 'OPERATOR PRO TIP';
            }

            return (
              <div key={idx} className={`p-5 rounded-xl border ${calloutStyle} my-6 space-y-3`}>
                <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider">
                  <Icon className="w-4 h-4" />
                  <span>{title}</span>
                </div>
                <div className="text-sm space-y-2 leading-relaxed opacity-90">
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
              <div key={idx} className="my-8 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-semibold uppercase tracking-wider text-[11px]">
                      {headers.map((h: string, hIdx: number) => (
                        <th key={hIdx} className="p-4 sm:p-5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {dataRows.map((r: string[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                        {r.map((cell: string, cIdx: number) => (
                          <td key={cIdx} className="p-3.5 sm:p-4 text-stone-700 dark:text-stone-300">
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
              <div key={idx} className="my-8 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 overflow-hidden font-mono shadow-sm">
                <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
                  <span className="flex items-center gap-2 font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    <Terminal className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                    {lang || 'COMMAND / DIAGRAM'}
                  </span>
                  <button
                    onClick={() => handleCopyCode(code, idx)}
                    className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-xs sm:text-sm text-stone-800 dark:text-stone-300 leading-relaxed font-mono">
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
