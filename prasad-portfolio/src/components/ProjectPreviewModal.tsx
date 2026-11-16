import { Delete, Monitor, Smartphone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectPreviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

function InteractiveCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev.slice(0, 12) + digit));
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (waitingForOperand || display === 'Error') return;
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const calculate = (a: number, b: number, op: string): number | 'Error' => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? 'Error' : a / b;
      case '%':
        return b === 0 ? 'Error' : a % b;
      default:
        return b;
    }
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);
    if (Number.isNaN(inputValue)) {
      clearAll();
      return;
    }

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const result = calculate(previousValue, inputValue, operator);
      if (result === 'Error') {
        setDisplay('Error');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      const formatted = String(Number(result.toPrecision(10)));
      setPreviousValue(result);
      setDisplay(formatted);
    }

    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const handleEquals = () => {
    if (operator === null || previousValue === null) return;
    const inputValue = parseFloat(display);
    const result = calculate(previousValue, inputValue, operator);
    if (result === 'Error') {
      setDisplay('Error');
    } else {
      setDisplay(String(Number(result.toPrecision(10))));
    }
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const buttons = [
    { label: 'AC', action: clearAll, variant: 'utility' },
    { label: '⌫', action: backspace, variant: 'utility', isBackspace: true },
    { label: '%', action: () => handleOperator('%'), variant: 'utility' },
    { label: '÷', action: () => handleOperator('÷'), variant: 'operator' },
    { label: '7', action: () => inputDigit('7'), variant: 'digit' },
    { label: '8', action: () => inputDigit('8'), variant: 'digit' },
    { label: '9', action: () => inputDigit('9'), variant: 'digit' },
    { label: '×', action: () => handleOperator('×'), variant: 'operator' },
    { label: '4', action: () => inputDigit('4'), variant: 'digit' },
    { label: '5', action: () => inputDigit('5'), variant: 'digit' },
    { label: '6', action: () => inputDigit('6'), variant: 'digit' },
    { label: '-', action: () => handleOperator('-'), variant: 'operator' },
    { label: '1', action: () => inputDigit('1'), variant: 'digit' },
    { label: '2', action: () => inputDigit('2'), variant: 'digit' },
    { label: '3', action: () => inputDigit('3'), variant: 'digit' },
    { label: '+', action: () => handleOperator('+'), variant: 'operator' },
    { label: '0', action: () => inputDigit('0'), variant: 'digit', span2: true },
    { label: '.', action: inputDecimal, variant: 'digit' },
    { label: '=', action: handleEquals, variant: 'equals' },
  ];

  return (
    <div className="mx-auto w-full max-w-xs rounded-xl border border-[#1E3561] bg-[#071124] p-4 text-white sm:p-5">
      <div className="mb-4 rounded-lg border border-[#1A2F57] bg-[#0D1A36] px-4 py-3 text-right">
        <div className="min-h-4 font-mono text-xs text-slate-400 tabular-nums">
          {previousValue !== null && operator ? `${previousValue} ${operator}` : '\u00A0'}
        </div>
        <div className="mt-1 truncate font-mono text-2xl font-medium tracking-tight text-sky-300 tabular-nums">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => {
          const baseClasses =
            'flex h-11 items-center justify-center rounded-lg text-sm font-medium transition-colors duration-150 active:scale-[0.97] cursor-pointer';
          const variantClasses =
            btn.variant === 'equals'
              ? 'bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300'
              : btn.variant === 'operator'
              ? 'bg-[#172B54] text-sky-300 hover:bg-[#1E376B]'
              : btn.variant === 'utility'
              ? 'bg-[#112142] text-slate-200 hover:bg-[#182E59]'
              : 'bg-[#0D1A36] text-white hover:bg-[#15284E]';

          return (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              aria-label={btn.isBackspace ? 'Backspace' : btn.label}
              className={`${baseClasses} ${variantClasses} ${btn.span2 ? 'col-span-2' : ''}`}
            >
              {btn.isBackspace ? <Delete className="h-4 w-4" /> : btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LandingPagePreview() {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-300">
          Responsive HTML5 & CSS3 Preview
        </span>
        <div className="inline-flex items-center gap-1 rounded-lg border border-[#1E3561] bg-[#081329] p-1">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-sky-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-sky-400 text-slate-950'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center rounded-xl border border-[#1E3561] bg-[#071124] p-3 sm:p-4">
        <div
          className={`overflow-hidden rounded-lg border border-[#244075] bg-[#0E1D3B] transition-all duration-200 ${
            viewport === 'mobile' ? 'w-full max-w-72' : 'w-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#1D3460] px-4 py-3">
            <span className="font-display text-xs font-bold text-white">Horizon Studio</span>
            <div className="flex items-center gap-3 text-[11px] text-slate-300">
              <span>Features</span>
              <span>Pricing</span>
              <span className="rounded bg-sky-400 px-2 py-0.5 font-semibold text-slate-950">
                Start
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className={viewport === 'mobile' ? 'space-y-4' : 'grid grid-cols-1 items-center gap-5 sm:grid-cols-2'}>
              <div>
                <p className="text-[11px] font-medium text-sky-400">Clean Web Architecture</p>
                <h4 className="mt-1 font-display text-base font-bold leading-snug text-white">
                  Launch focused pages with clear visual rhythm.
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Built using semantic HTML5 sections, responsive CSS Grid tracks, and balanced spacing.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md border border-[#1E3561] bg-[#081329] p-3">
                  <p className="text-[11px] font-semibold text-white">Fluid Grid</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">Adapts to any screen</p>
                </div>
                <div className="rounded-md border border-[#1E3561] bg-[#081329] p-3">
                  <p className="text-[11px] font-semibold text-white">Fast Load</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">Pure CSS styling</p>
                </div>
                <div className="col-span-2 rounded-md border border-sky-400/30 bg-sky-400/10 p-3">
                  <p className="text-[11px] font-semibold text-sky-200">Accessible Contrast</p>
                  <p className="mt-0.5 text-[10px] text-sky-300/90">WCAG AA verified text palette</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectPreviewModal({ project, onClose }: ProjectPreviewModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030814]/80 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-5 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-sky-400">
              {project.technologies.join(' · ')}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1 font-display text-lg font-bold text-white sm:text-xl"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#1E3561] bg-[#081329] text-slate-300 transition-colors duration-150 hover:bg-[#132549] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-slate-300">{project.description}</p>

        {project.id === 'calculator' && (
          <div className="rounded-xl border border-[#1E3561] bg-[#081329] p-4 sm:p-5">
            <InteractiveCalculator />
          </div>
        )}

        {project.id === 'landing' && <LandingPagePreview />}

        {project.id === 'portfolio' && (
          <div className="rounded-xl border border-[#1E3561] bg-[#081329] p-5">
            <h4 className="text-sm font-semibold text-white">Key Implementation Highlights</h4>
            <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm text-slate-300 marker:text-sky-400">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-[#1E3561] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
