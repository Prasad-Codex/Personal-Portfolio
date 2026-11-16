import { CERTIFICATIONS, INTERNSHIP, LANGUAGES, PROFILE, PROJECTS, SKILLS } from '../data/portfolioData';

function escapePdfText(text: string): string {
  return text
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '\u2013' || ch === '\u2014') return '-';
      if (ch === '\u2022' || ch === '\u00B7') return '|';
      return ' ';
    })
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapLine(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawText(
  commands: string[],
  text: string,
  x: number,
  y: number,
  font: 'F1' | 'F2',
  size: number,
  rgb: string
): void {
  commands.push('BT');
  commands.push(`/${font} ${size} Tf`);
  commands.push(`${rgb} rg`);
  commands.push(`1 0 0 1 ${x} ${y} Tm`);
  commands.push(`(${escapePdfText(text)}) Tj`);
  commands.push('ET');
}

function drawCenteredText(
  commands: string[],
  text: string,
  centerX: number,
  y: number,
  font: 'F1' | 'F2',
  size: number,
  rgb: string
): void {
  const approxWidth = text.length * size * (font === 'F2' ? 0.52 : 0.47);
  const x = Math.max(54, Math.round(centerX - approxWidth / 2));
  drawText(commands, text, x, y, font, size, rgb);
}

function drawRightAlignedText(
  commands: string[],
  text: string,
  rightX: number,
  y: number,
  font: 'F1' | 'F2',
  size: number,
  rgb: string
): void {
  const approxWidth = text.length * size * (font === 'F2' ? 0.52 : 0.47);
  const x = Math.round(rightX - approxWidth);
  drawText(commands, text, x, y, font, size, rgb);
}

function drawSectionHeader(commands: string[], title: string, y: number): number {
  const leftX = 54;
  const rightX = 558;
  drawText(commands, title, leftX, y, 'F2', 10, '0.114 0.306 0.847');
  const ruleY = y - 4;
  commands.push('0.145 0.388 0.922 RG 0.9 w');
  commands.push(`${leftX} ${ruleY} m ${rightX} ${ruleY} l S`);
  return y - 17;
}

export function createResumePdfBlob(): Blob {
  const commands: string[] = [];
  const leftX = 54;
  const rightX = 558;
  const centerX = 306;

  // ---------------- CLASSIC CENTERED HEADER ----------------
  drawCenteredText(commands, PROFILE.name, centerX, 748, 'F2', 22, '0.059 0.090 0.165');
  drawCenteredText(
    commands,
    `${PROFILE.role}  |  Frontend Development  |  Web Development  |  Artificial Intelligence`,
    centerX,
    728,
    'F1',
    9.8,
    '0.278 0.333 0.412'
  );

  // Double rule below header
  commands.push('0.114 0.306 0.847 RG 1.4 w');
  commands.push(`${leftX} 714 m ${rightX} 714 l S`);
  commands.push('0.796 0.835 0.882 RG 0.5 w');
  commands.push(`${leftX} 711 m ${rightX} 711 l S`);

  let y = 690;

  // ---------------- SUMMARY ----------------
  y = drawSectionHeader(commands, 'PROFESSIONAL SUMMARY', y);
  for (const paragraph of PROFILE.aboutParagraphs) {
    for (const line of wrapLine(paragraph, 95)) {
      drawText(commands, line, leftX, y, 'F1', 9.2, '0.165 0.212 0.290');
      y -= 12.5;
    }
    y -= 2;
  }

  // ---------------- TECHNICAL SKILLS (4x2 CLEAN GRID) ----------------
  y -= 8;
  y = drawSectionHeader(commands, 'TECHNICAL SKILLS', y);

  const colPositions = [54, 182, 310, 438];
  for (let i = 0; i < SKILLS.length; i++) {
    const skill = SKILLS[i];
    const col = i % 4;
    const rowY = y - Math.floor(i / 4) * 23;
    const x = colPositions[col];

    drawText(commands, skill.name, x, rowY, 'F2', 8.8, '0.059 0.090 0.165');
    drawText(commands, skill.category, x, rowY - 10, 'F1', 7.8, '0.392 0.455 0.545');
  }
  const skillRows = Math.ceil(SKILLS.length / 4);
  y -= skillRows * 23 + 8;

  // ---------------- INTERNSHIP EXPERIENCE ----------------
  y = drawSectionHeader(commands, 'INTERNSHIP EXPERIENCE', y);

  drawText(
    commands,
    `${INTERNSHIP.role} - ${INTERNSHIP.company}`,
    leftX,
    y,
    'F2',
    10,
    '0.059 0.090 0.165'
  );
  drawRightAlignedText(
    commands,
    `${INTERNSHIP.duration} | ${INTERNSHIP.type}`,
    rightX,
    y,
    'F1',
    8.8,
    '0.114 0.306 0.847'
  );
  y -= 14;

  for (const line of wrapLine(INTERNSHIP.description, 95)) {
    drawText(commands, line, leftX, y, 'F1', 9, '0.165 0.212 0.290');
    y -= 12;
  }
  y -= 2;

  for (const resp of INTERNSHIP.responsibilities) {
    for (const line of wrapLine(`* ${resp}`, 92)) {
      drawText(commands, line, leftX + 8, y, 'F1', 8.8, '0.200 0.255 0.333');
      y -= 11.5;
    }
  }
  y -= 2;
  drawText(
    commands,
    `Skills Gained: ${INTERNSHIP.skillsGained.join('  |  ')}`,
    leftX,
    y,
    'F2',
    8.4,
    '0.278 0.333 0.412'
  );

  // ---------------- PROJECTS ----------------
  y -= 18;
  y = drawSectionHeader(commands, 'PROJECTS', y);

  for (const project of PROJECTS) {
    drawText(commands, project.title, leftX, y, 'F2', 9.8, '0.059 0.090 0.165');
    drawRightAlignedText(
      commands,
      project.technologies.join(' | '),
      rightX,
      y,
      'F1',
      8.6,
      '0.114 0.306 0.847'
    );
    y -= 12.5;

    for (const line of wrapLine(project.description, 94)) {
      drawText(commands, line, leftX + 8, y, 'F1', 8.8, '0.165 0.212 0.290');
      y -= 11.5;
    }
    y -= 5;
  }

  // ---------------- CERTIFICATIONS ----------------
  y -= 8;
  y = drawSectionHeader(commands, 'CERTIFICATIONS', y);

  for (const cert of CERTIFICATIONS) {
    drawText(commands, cert.title, leftX, y, 'F2', 9.4, '0.059 0.090 0.165');
    drawRightAlignedText(commands, cert.organization, rightX, y, 'F1', 8.6, '0.114 0.306 0.847');
    y -= 12;
    for (const line of wrapLine(cert.summary, 94)) {
      drawText(commands, line, leftX + 8, y, 'F1', 8.4, '0.278 0.333 0.412');
      y -= 11;
    }
    y -= 4;
  }

  // ---------------- LANGUAGES ----------------
  y -= 8;
  if (y >= 54) {
    y = drawSectionHeader(commands, 'LANGUAGES', y);
    const langSummary = LANGUAGES.map((l) => `${l.name}: ${l.proficiency}`).join('   |   ');
    drawText(commands, langSummary, leftX, y, 'F1', 9, '0.165 0.212 0.290');
  }

  const streamContent = commands.join('\n');

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${offsets[i].toString().padStart(10, '0')} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadResumePdf(): void {
  const blob = createResumePdfBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Prasad_M_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
