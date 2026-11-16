import type { ProjectItem } from '../data/portfolioData';

interface ProjectThumbnailProps {
  projectId: ProjectItem['id'];
}

export function ProjectThumbnail({ projectId }: ProjectThumbnailProps) {
  if (projectId === 'calculator') {
    return (
      <div
        className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-[#1E3561] bg-[#081329] p-4"
        aria-hidden="true"
      >
        <div className="w-36 rounded-lg border border-[#244075] bg-[#102042] p-3">
          <div className="mb-2 rounded bg-[#060E1F] px-2 py-1.5 text-right font-mono text-xs text-sky-300 tabular-nums">
            1,248
          </div>
          <div className="grid grid-cols-4 gap-1">
            {['AC', '%', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+'].map((key) => (
              <div
                key={key}
                className={`flex h-4 items-center justify-center rounded text-[8px] font-medium ${
                  ['÷', '×', '-', '+'].includes(key)
                    ? 'bg-sky-400 font-semibold text-slate-950'
                    : 'bg-[#19305C] text-slate-200'
                }`}
              >
                {key}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (projectId === 'landing') {
    return (
      <div
        className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-[#1E3561] bg-[#081329] p-4"
        aria-hidden="true"
      >
        <div className="w-full max-w-60 overflow-hidden rounded-lg border border-[#244075] bg-[#102042]">
          <div className="flex items-center justify-between border-b border-[#1D3460] px-3 py-1.5">
            <span className="h-1.5 w-10 rounded bg-slate-200" />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-5 rounded bg-slate-500" />
              <span className="h-1.5 w-5 rounded bg-sky-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 p-3">
            <div className="space-y-1.5">
              <span className="block h-2 w-full rounded bg-slate-100" />
              <span className="block h-2 w-3/4 rounded bg-slate-100" />
              <span className="block h-1.5 w-5/6 rounded bg-slate-500" />
              <span className="mt-1 inline-block h-3 w-10 rounded bg-sky-400" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="rounded bg-[#19305C]" />
              <div className="rounded bg-sky-400/25" />
              <div className="col-span-2 rounded bg-[#19305C]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-[#1E3561] bg-[#081329] p-4"
      aria-hidden="true"
    >
      <div className="w-full max-w-60 overflow-hidden rounded-lg border border-[#244075] bg-[#102042]">
        <div className="flex items-center justify-between border-b border-[#1D3460] px-3 py-1.5">
          <span className="text-[9px] font-semibold text-white">Prasad M</span>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-4 rounded bg-slate-500" />
            <span className="h-1.5 w-4 rounded bg-slate-500" />
            <span className="h-1.5 w-4 rounded bg-sky-400" />
          </div>
        </div>
        <div className="space-y-2 p-3">
          <div className="space-y-1">
            <span className="block h-1.5 w-12 rounded bg-sky-400/80" />
            <span className="block h-2.5 w-28 rounded bg-white" />
            <span className="block h-1.5 w-full rounded bg-slate-500" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="h-6 rounded border border-[#1D3460] bg-[#0B1730]" />
            <div className="h-6 rounded border border-[#1D3460] bg-[#0B1730]" />
            <div className="h-6 rounded border border-[#1D3460] bg-[#0B1730]" />
          </div>
        </div>
      </div>
    </div>
  );
}
