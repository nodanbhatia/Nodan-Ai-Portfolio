/**
 * Standards-compliant PDF 1.4 Generator for Nodan Bhatia's Resume.
 * Generates a real downloadable `Nodan_Bhatia_Resume.pdf` file directly in the browser
 * from the single-source-of-truth resume content without requiring external dependencies.
 */

function escapePdfText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/–/g, '-')
    .replace(/’/g, "'")
    .replace(/²/g, '2')
    .replace(/•/g, '-');
}

export function buildResumePdfBlob(): Blob {
  // Page dimensions: Letter / A4-like (612 x 792 pt)
  const ops: string[] = [];
  let y = 750;

  const addCenteredText = (text: string, font: 'F1' | 'F2', size: number, yPos: number) => {
    const approxWidth = text.length * size * 0.52;
    const x = Math.max(40, (612 - approxWidth) / 2);
    ops.push(`BT /${font} ${size} Tf ${x.toFixed(1)} ${yPos.toFixed(1)} Td (${escapePdfText(text)}) Tj ET`);
  };

  const addLeftText = (text: string, font: 'F1' | 'F2', size: number, x: number, yPos: number) => {
    ops.push(`BT /${font} ${size} Tf ${x.toFixed(1)} ${yPos.toFixed(1)} Td (${escapePdfText(text)}) Tj ET`);
  };

  const addRightText = (text: string, font: 'F1' | 'F2', size: number, rightEdge: number, yPos: number) => {
    const approxWidth = text.length * size * 0.5;
    const x = rightEdge - approxWidth;
    ops.push(`BT /${font} ${size} Tf ${x.toFixed(1)} ${yPos.toFixed(1)} Td (${escapePdfText(text)}) Tj ET`);
  };

  const addLine = (yPos: number) => {
    ops.push(`0.6 w 40 ${yPos.toFixed(1)} m 572 ${yPos.toFixed(1)} l S`);
  };

  const addSectionHeader = (title: string) => {
    y -= 16;
    addLeftText(title, 'F2', 10.5, 40, y);
    y -= 4;
    addLine(y);
    y -= 13;
  };

  // Header
  addCenteredText('NODAN BHATIA', 'F2', 16, y);
  y -= 14;
  addCenteredText('Data Scientist', 'F2', 10.5, y);
  y -= 14;
  addCenteredText('+91-7888958903 | nodanbhatia376@gmail.com | LinkedIn | GitHub', 'F1', 9.5, y);
  y -= 6;

  // SUMMARY
  addSectionHeader('SUMMARY');
  const summaryLines = [
    'Strong technical foundation in data science, machine learning, and data analytics, supported by relevant AI',
    'Data Analyst internship experience. Well-structured projects demonstrating practical application of Python, SQL,',
    'predictive analytics, data wrangling, EDA, NLP, machine learning algorithms, and data visualization.',
    'Experienced in building end-to-end analytical solutions and interactive dashboards, with a focus on applying',
    'data-driven insights to real-world problems.',
  ];
  for (const line of summaryLines) {
    addLeftText(line, 'F1', 9.2, 40, y);
    y -= 12;
  }

  // TECHNICAL SKILLS
  addSectionHeader('TECHNICAL SKILLS');
  const skillLines: [string, string][] = [
    ['Programming & Querying:', 'Python, SQL, MongoDB'],
    ['Data Science:', 'Pandas, NumPy, Data Wrangling, EDA, Statistical Analysis, Data Modeling, Feature Engineering'],
    [
      'Machine Learning:',
      'Machine Learning Algorithms, Regression, Classification, Random Forest, Predictive Analytics, Model Evaluation',
    ],
    ['Data Visualization & BI:', 'Power BI, Tableau, Excel, Plotly, Seaborn'],
    ['Tools & Platforms:', 'Streamlit, Git, GitHub, Jupyter Notebook, VS Code'],
  ];
  for (const [label, items] of skillLines) {
    addLeftText(`${label} ${items}`, 'F1', 9.0, 40, y);
    y -= 12;
  }

  // EXPERIENCE
  addSectionHeader('EXPERIENCE');
  addLeftText('AI Data Analyst Intern - InAmigos Foundation', 'F2', 9.8, 40, y);
  addRightText('Jul 2026 - Sep 2026', 'F2', 9.5, 572, y);
  y -= 13;
  const expBullets = [
    '- Completed a 2-month internship focused on data research, data collection, data wrangling, analysis, and insight generation.',
    '- Researched and structured information from 10 organizations into validated datasets covering organizational details,',
    '  initiatives, areas of work, and operational information.',
    '- Applied Excel and SQL techniques for data organization, validation, filtering, and analytical reporting, improving',
    '  data validation efficiency by 20% through optimized SQL queries.',
    '- Prepared structured reports and summaries using statistical analysis, data visualization, and data-driven',
    '  insights to support research and reporting activities.',
  ];
  for (const b of expBullets) {
    addLeftText(b, 'F1', 9.0, 46, y);
    y -= 11.5;
  }

  // PROJECTS
  addSectionHeader('PROJECTS');

  // Project 1
  addLeftText('Walmart Sales Intelligence System', 'F2', 9.8, 40, y);
  addRightText('Python, Pandas, NumPy, Scikit-learn, Plotly, Streamlit', 'F1', 8.8, 572, y);
  y -= 12.5;
  const p1Bullets = [
    '- Built an end-to-end sales intelligence system to analyze and model 10,000+ Walmart sales records using data',
    '  wrangling, EDA, feature engineering, and predictive analytics.',
    '- Developed a Random Forest Regression model to predict total sales and evaluated performance using MAE, RMSE, and R2.',
    '- Developed an interactive Streamlit dashboard containing business KPIs, sales analysis, data visualizations, and ML predictions.',
    '- Achieved 82% R2 score on the test set, demonstrating the model\'s predictive performance.',
  ];
  for (const b of p1Bullets) {
    addLeftText(b, 'F1', 9.0, 46, y);
    y -= 11.5;
  }
  y -= 3;

  // Project 2
  addLeftText('Social Media Sentiment & Engagement Analytics', 'F2', 9.8, 40, y);
  addRightText('Python, Pandas, NumPy, NLP', 'F1', 8.8, 572, y);
  y -= 12.5;
  const p2Bullets = [
    '- Performed data wrangling, EDA, and statistical analysis to identify engagement patterns and content performance.',
    '- Implemented NLP-based sentiment analysis to classify user-generated content into positive, negative, and neutral sentiment.',
    '- Created analytical visualizations to evaluate engagement, sentiment distribution, audience behavior, and content performance.',
    '- Achieved 86% sentiment classification accuracy on the evaluated dataset.',
  ];
  for (const b of p2Bullets) {
    addLeftText(b, 'F1', 9.0, 46, y);
    y -= 11.5;
  }
  y -= 3;

  // Project 3
  addLeftText('AI Skin Specialist - Multimodal AI Assistant', 'F2', 9.8, 40, y);
  addRightText('Python, Machine Learning, Image Processing', 'F1', 8.8, 572, y);
  y -= 12.5;
  const p3Bullets = [
    '- Developed an AI-assisted image analysis system for preliminary skin-condition classification using machine learning',
    '  and image-processing techniques.',
    '- Implemented an image preprocessing and prediction pipeline using computer vision and machine learning algorithms.',
    '- Structured the solution as an AI-assisted workflow for image analysis and predictive classification.',
  ];
  for (const b of p3Bullets) {
    addLeftText(b, 'F1', 9.0, 46, y);
    y -= 11.5;
  }

  // CERTIFICATIONS & ACHIEVEMENTS
  addSectionHeader('CERTIFICATIONS & ACHIEVEMENTS');
  const certs: [string, string][] = [
    ['Data Science Job Simulation - BCG X / Forage', 'Aug 2025'],
    ['Data Science & Analytics - HP LIFE', 'Aug 2026'],
    ['Introduction to Generative AI - Google', 'Jul 2026'],
    ['Python 101 for Data Science - IBM / Cognitive Class', 'Apr 2025'],
  ];
  for (const [cTitle, cDate] of certs) {
    addLeftText(cTitle, 'F2', 9.2, 40, y);
    addRightText(cDate, 'F1', 9.0, 572, y);
    y -= 12;
  }

  // EDUCATION
  addSectionHeader('EDUCATION');
  addLeftText('B.Tech. Computer Science Engineering - Data Science', 'F2', 9.8, 40, y);
  addRightText('Passout 2028', 'F2', 9.5, 572, y);
  y -= 12.5;
  addLeftText('Chandigarh Group of Colleges, Landran', 'F1', 9.2, 40, y);
  addRightText('CGPA: 9.1/10', 'F2', 9.5, 572, y);

  const contentStream = ops.join('\n');

  // Construct valid PDF 1.4 objects
  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  objects.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj'
  );
  objects.push(`4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj`);
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj + '\n';
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    pdf += `${offsetStr} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
}

export function triggerResumeDownload(): void {
  const blob = buildResumePdfBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Nodan_Bhatia_Data_Scientist_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
