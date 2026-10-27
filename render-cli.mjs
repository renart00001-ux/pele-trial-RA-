import fs from 'node:fs';
import path from 'node:path';
import { render } from 'pele';

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  console.log(`
Pele CLI (Obsidian Mermaid-to-SVG Renderer)
Usage:
  node render-cli.mjs <input.mmd> [output.svg]
  node render-cli.mjs --string "flowchart LR\nA-->B" [output.svg]

Examples:
  node render-cli.mjs samples/flowchart.mmd output.svg
  node render-cli.mjs samples/gitgraph.mmd
`);
  process.exit(0);
}

let mmdContent = '';
let outPath = '';

if (args[0] === '--string' || args[0] === '-s') {
  mmdContent = args[1] || '';
  outPath = args[2] || 'diagram.svg';
} else {
  const inputPath = path.resolve(args[0]);
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: File not found: ${inputPath}`);
    process.exit(1);
  }
  mmdContent = fs.readFileSync(inputPath, 'utf8');
  outPath = args[1] || inputPath.replace(/\.[^.]+$/, '') + '.svg';
}

console.log('Rendering with Obsidian Pele...');
const startTime = performance.now();
try {
  const result = render(mmdContent);
  const duration = (performance.now() - startTime).toFixed(3);

  fs.writeFileSync(outPath, result.svg, 'utf8');
  console.log(`✓ Rendered successfully in ${duration} ms!`);
  console.log(`  - Diagram Type: ${result.type || result.mermaidType}`);
  console.log(`  - Output Dimensions: ${result.width}x${result.height}`);
  console.log(`  - Saved SVG to: ${outPath} (${(result.svg.length / 1024).toFixed(2)} KB)`);
} catch (err) {
  console.error('Pele Render Error:', err.message || err);
  process.exit(1);
}