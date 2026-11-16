import { BrainCircuit, Code2, Database, X } from 'lucide-react';
import { useEffect } from 'react';
import type { CertificateItem } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  const Icon =
    certificate.iconType === 'ml'
      ? BrainCircuit
      : certificate.iconType === 'python'
      ? Code2
      : Database;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030814]/80 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-5 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#1E3561] pb-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-400">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium text-sky-400">{certificate.organization}</p>
              <h3
                id="certificate-modal-title"
                className="mt-1 font-display text-lg font-bold text-white sm:text-xl"
              >
                {certificate.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate details"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#1E3561] bg-[#081329] text-slate-300 transition-colors duration-150 hover:bg-[#132549] hover:text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <p className="text-sm leading-relaxed text-slate-300">{certificate.summary}</p>

          <dl className="divide-y divide-[#1E3561] rounded-xl border border-[#1E3561] bg-[#081329] px-4 sm:px-5">
            <div className="flex flex-col justify-between gap-1 py-3.5 text-sm sm:flex-row sm:items-center sm:gap-4">
              <dt className="text-slate-400">Recipient</dt>
              <dd className="font-medium text-white">Prasad M</dd>
            </div>
            <div className="flex flex-col justify-between gap-1 py-3.5 text-sm sm:flex-row sm:items-center sm:gap-4">
              <dt className="text-slate-400">Issuing Organization</dt>
              <dd className="font-medium text-white">{certificate.organization}</dd>
            </div>
            <div className="flex flex-col justify-between gap-1 py-3.5 text-sm sm:flex-row sm:items-center sm:gap-4">
              <dt className="text-slate-400">Topics Covered</dt>
              <dd className="text-slate-200 sm:text-right">{certificate.topics.join(' · ')}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex justify-end border-t border-[#1E3561] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center rounded-lg bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
