import { readFileSync } from "node:fs";
import { mdToPdf } from "md-to-pdf";

const input = "TECHNICAL_DOCUMENTATION.md";
const output = "TECHNICAL_DOCUMENTATION.pdf";

const css = `
  body { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.5; color: #1a1510; max-width: 100%; padding: 0 4mm; }
  h1 { font-size: 22pt; color: #9c7a32; border-bottom: 2px solid #c8a24d; padding-bottom: 0.3em; page-break-after: avoid; }
  h2 { font-size: 16pt; color: #1a1510; margin-top: 1.4em; page-break-after: avoid; }
  h3 { font-size: 13pt; page-break-after: avoid; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; margin: 1em 0; }
  th, td { border: 1px solid #e7dcc7; padding: 6px 8px; text-align: left; }
  th { background: #f3ead7; }
  code { font-family: Consolas, monospace; font-size: 9pt; background: #f5efe3; padding: 1px 4px; }
  pre { background: #f5efe3; padding: 10px; overflow-x: auto; font-size: 9pt; }
  a { color: #9c7a32; }
  blockquote { border-left: 3px solid #c8a24d; margin-left: 0; padding-left: 1em; color: #6f655b; }
`;

console.log(`Converting ${input} → ${output}...`);

const pdf = await mdToPdf(
  { content: readFileSync(input, "utf8") },
  {
    dest: output,
    css,
    pdf_options: {
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", right: "14mm", bottom: "18mm", left: "14mm" },
    },
    launch_options: {
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  },
);

if (!pdf?.filename) {
  console.error("PDF generation failed.");
  process.exit(1);
}

console.log(`Created ${pdf.filename}`);
