import fs from 'node:fs';
import { render } from 'pele';

const samples = [
  { name: 'Flowchart (425x823)', file: 'samples/flowchart.mmd' },
  { name: 'GitGraph (9 commits, 2 branches)', file: 'samples/gitgraph.mmd' },
  { name: 'Sequence Diagram', file: 'samples/sequence.mmd' },
  { name: 'Mindmap', file: 'samples/mindmap.mmd' }
];

console.log('='.repeat(65));
console.log('  ⚡ Obsidian Pele Performance Benchmark (Node.js)');
console.log('='.repeat(65));

for (const s of samples) {
  const code = fs.readFileSync(s.file, 'utf8');
  
  // Warmup
  for (let i = 0; i < 20; i++) render(code);

  const iterations = 500;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    render(code);
  }
  const totalMs = performance.now() - start;
  const avgUs = ((totalMs / iterations) * 1000).toFixed(1);
  const avgMs = (totalMs / iterations).toFixed(3);
  const opsPerSec = Math.round((iterations / totalMs) * 1000);

  console.log(`\n📊 Diagram: ${s.name}`);
  console.log(`   - Iterations: ${iterations}`);
  console.log(`   - Average Time per Render: ${avgMs} ms (${avgUs} µs)`);
  console.log(`   - Throughput: ${opsPerSec.toLocaleString()} diagrams/sec`);
}
console.log('\n' + '='.repeat(65));