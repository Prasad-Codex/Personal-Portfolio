import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Briefcase,
  Check,
  Code2,
  Database,
  Download,
  Globe,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { CertificateModal } from './components/CertificateModal';
import { Navbar } from './components/Navbar';
import { ProjectPreviewModal } from './components/ProjectPreviewModal';
import { ProjectThumbnail } from './components/ProjectThumbnail';
import {
  CERTIFICATIONS,
  INTERNSHIP,
  LANGUAGES,
  PROFILE,
  PROJECTS,
  SKILLS,
  type CertificateItem,
  type ProjectItem,
} from './data/portfolioData';
import { downloadResumePdf } from './utils/resumeGenerator';

export default function App() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const handleDownloadResume = () => {
    downloadResumePdf();
    setResumeDownloaded(true);
    window.setTimeout(() => setResumeDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#071124] text-slate-100">
      <Navbar onDownloadResume={handleDownloadResume} />

      <main>
        {/* 1. Home — Centered Showcase Hero (Fits cleanly on initial mobile screen) */}
        <section
          id="home"
          className="scroll-mt-16 flex min-h-[calc(100svh-4rem)] items-center border-b border-[#172B52] bg-[#071124] py-8 sm:min-h-0 sm:py-24 lg:py-32"
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-wide text-sky-400">{PROFILE.role}</p>

              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:mt-3 sm:text-5xl lg:text-6xl text-balance">
                {PROFILE.name}
              </h1>

              <p className="mx-auto mt-3 max-w-2xl font-display text-lg font-medium leading-snug text-slate-200 sm:mt-5 sm:text-2xl text-balance">
                {PROFILE.headline}
              </p>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-base">
                {PROFILE.intro}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-sky-300 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer sm:w-auto sm:px-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  {resumeDownloaded ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Resume Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" aria-hidden="true" />
                      <span>Download Resume</span>
                    </>
                  )}
                </button>

                <a
                  href="#projects"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#244075] bg-[#0D1A36] px-5 py-3 text-sm font-medium text-slate-100 transition-colors duration-150 hover:border-sky-400/60 hover:bg-[#132549] hover:text-white whitespace-nowrap shrink-0 sm:w-auto sm:px-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. About Me — Bento Layout (Summary + Languages + 3 Focus Pillars) */}
        <section
          id="about"
          className="scroll-mt-16 border-b border-[#172B52] bg-[#09152B] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-sky-400">
                About Me
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                Curious learner focused on clear web design.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
              {/* Top-left bio bento */}
              <div className="flex flex-col justify-center rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-6 sm:p-8 lg:col-span-7">
                <div className="space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {PROFILE.aboutParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Top-right Languages bento */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-6 sm:p-8 lg:col-span-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                    <Globe className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">Languages</h3>
                </div>

                <dl className="mt-5 divide-y divide-[#1E3561]">
                  {LANGUAGES.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="text-sm font-semibold text-white">{lang.name}</dt>
                      <dd className="text-xs font-medium text-sky-300">{lang.proficiency}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Bottom 3-column Focus Pillars */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:col-span-12">
                {PROFILE.focusAreas.map((area, index) => {
                  const Icon = index === 0 ? Layers : index === 1 ? Code2 : Sparkles;
                  return (
                    <div
                      key={area.title}
                      className="rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-6 transition-colors duration-150 hover:border-sky-400/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 text-sky-400">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 font-display text-base font-semibold text-white">
                        {area.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                        {area.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Skills — 4-Column Symmetrical Showcase Grid */}
        <section
          id="skills"
          className="scroll-mt-16 border-b border-[#172B52] bg-[#071124] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-sky-400">
                Skills
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                Technical domains and tools I work with.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((skill) => (
                <article
                  key={skill.id}
                  className="group rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-sky-400/60"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 font-mono text-xs font-semibold text-sky-300 transition-colors duration-150 group-hover:bg-sky-400 group-hover:text-slate-950">
                      {skill.code}
                    </span>
                    <span className="text-xs text-slate-400">{skill.category}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">
                    {skill.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {skill.summary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Certifications — 3-Column Text-Based Cards with Small Decorative Icons */}
        <section
          id="certificates"
          className="scroll-mt-16 border-b border-[#172B52] bg-[#09152B] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-sky-400">
                Certifications
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                Completed courses and training programs.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {CERTIFICATIONS.map((cert) => {
                const Icon =
                  cert.iconType === 'ml'
                    ? BrainCircuit
                    : cert.iconType === 'python'
                    ? Code2
                    : Database;

                return (
                  <article
                    key={cert.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-sky-400/60"
                  >
                    <div>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/25 bg-sky-400/10 text-sky-400">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-white">
                        {cert.title}
                      </h3>

                      <p className="mt-1.5 text-sm font-medium text-sky-300">
                        {cert.organization}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {cert.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[#1E3561] pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedCertificate(cert)}
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-sky-400 transition-colors duration-150 hover:text-sky-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Internship Experience — Centered Split Feature Card */}
        <section
          id="internship"
          className="scroll-mt-16 border-b border-[#172B52] bg-[#071124] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-sky-400">
                Internship Experience
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                Practical frontend engineering experience.
              </h2>
            </div>

            <article className="mx-auto mt-10 max-w-4xl rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                <div className="border-b border-[#1E3561] pb-6 md:col-span-5 md:border-r md:border-b-0 md:pr-8 md:pb-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400 text-slate-950">
                    <Briefcase className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {INTERNSHIP.role}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-sky-300">
                    {INTERNSHIP.company}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    Duration: {INTERNSHIP.duration}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Type: {INTERNSHIP.type}
                  </p>
                </div>

                <div className="md:col-span-7">
                  <h4 className="text-sm font-semibold text-white">Overview & Contributions</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {INTERNSHIP.description}
                  </p>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-200 marker:text-sky-400">
                    {INTERNSHIP.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-[#1E3561] pt-4">
                    <h4 className="text-xs font-semibold tracking-wide text-slate-400">
                      Skills Gained
                    </h4>
                    <p className="mt-1.5 text-sm font-medium leading-relaxed text-sky-200">
                      {INTERNSHIP.skillsGained.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 6. Projects — 3-Column Showcase Card Grid */}
        <section id="projects" className="scroll-mt-16 bg-[#09152B] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-wide text-sky-400">
                Projects
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                Selected web development builds.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PROJECTS.map((project, idx) => (
                <article
                  key={project.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#1E3561] bg-[#0D1A36] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-sky-400/60"
                >
                  <div>
                    <ProjectThumbnail projectId={project.id} />

                    <div className="mt-5">
                      <p className="font-mono text-xs font-medium text-sky-400">
                        0{idx + 1}. {project.technologies.join(' · ')}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#1E3561] pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-sky-400 transition-colors duration-150 hover:text-sky-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-[#172B52] bg-[#071124]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <p className="text-center text-sm text-slate-300 sm:text-left">
            © 2026 Prasad M. All rights reserved.
          </p>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400 sm:justify-end sm:gap-6"
          >
            <a href="#home" className="py-1 transition-colors duration-150 hover:text-sky-400">
              Home
            </a>
            <a href="#about" className="py-1 transition-colors duration-150 hover:text-sky-400">
              About
            </a>
            <a href="#skills" className="py-1 transition-colors duration-150 hover:text-sky-400">
              Skills
            </a>
            <a
              href="#certificates"
              className="py-1 transition-colors duration-150 hover:text-sky-400"
            >
              Certificates
            </a>
            <a
              href="#internship"
              className="py-1 transition-colors duration-150 hover:text-sky-400"
            >
              Internship
            </a>
            <a href="#projects" className="py-1 transition-colors duration-150 hover:text-sky-400">
              Projects
            </a>
          </nav>
        </div>
      </footer>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
      <ProjectPreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
