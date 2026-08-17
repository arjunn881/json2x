const fs = require('fs');
const path = require('path');

const CANONICAL_TOOLS = [
  { id: 'formatter', file: 'json-formatter.html', name: 'JSON Formatter', cat: 'format-validate' },
  { id: 'validator', file: 'json-validator.html', name: 'JSON Validator', cat: 'format-validate' },
  { id: 'minifier', file: 'json-minifier.html', name: 'JSON Minifier', cat: 'format-validate' },
  { id: 'diff', file: 'json-diff.html', name: 'JSON Diff Checker', cat: 'format-validate' },
  { id: 'json-to-csv', file: 'json-to-csv.html', name: 'JSON to CSV Converter', cat: 'converters' },
  { id: 'csv-to-json', file: 'csv-to-json.html', name: 'CSV to JSON Converter', cat: 'converters' },
  { id: 'json-to-yaml', file: 'json-to-yaml.html', name: 'JSON to YAML Converter', cat: 'converters' },
  { id: 'json-to-xml', file: 'json-to-xml.html', name: 'JSON to XML Converter', cat: 'converters' },
  { id: 'json-to-toml', file: 'json-to-toml.html', name: 'JSON to TOML Converter', cat: 'converters' },
  { id: 'json-to-sql', file: 'json-to-sql.html', name: 'JSON to SQL Converter', cat: 'converters' },
  { id: 'json-converter', file: 'json-converter.html', name: 'JSON Multi-Converter (7-in-1)', cat: 'generators' },
  { id: 'json-to-ts', file: 'typescript-generator.html', name: 'JSON to TypeScript & Zod', cat: 'generators' },
  { id: 'json-to-code', file: 'json-to-code.html', name: 'JSON to Code Models', cat: 'generators' },
  { id: 'schema', file: 'json-schema-generator.html', name: 'JSON Schema Generator', cat: 'generators' },
  { id: 'json-mock-generator', file: 'json-mock-generator.html', name: 'JSON Mock Generator', cat: 'generators' },
  { id: 'jsonpath', file: 'jsonpath.html', name: 'JSONPath Tester', cat: 'query-view' },
  { id: 'viewer', file: 'json-tree-viewer.html', name: 'JSON Tree Viewer', cat: 'query-view' }
];

console.log(`Auditing 17 canonical tools:\n`);

const results = [];

CANONICAL_TOOLS.forEach(tool => {
  const filePath = path.join('tools', tool.file);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    results.push({ tool: tool.name, status: 'FAIL', error: `File ${filePath} does not exist` });
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];

  // 1. Check title & meta
  if (!content.includes('<title>')) issues.push('Missing <title>');
  if (!content.includes('name="description"')) issues.push('Missing meta description');
  if (!content.includes('rel="canonical"')) issues.push('Missing canonical link');

  // 2. Check layout placeholder elements
  if (!content.includes('id="site-header-placeholder"')) issues.push('Missing site-header-placeholder');
  if (!content.includes('id="site-footer-placeholder"')) issues.push('Missing site-footer-placeholder');
  if (!content.includes('assets/js/common.js')) issues.push('Missing common.js script');
  if (!content.includes('assets/js/layout.js')) issues.push('Missing layout.js script');

  // 3. Check data-tool
  const dataToolMatch = content.match(/data-tool=["']([^"']+)["']/i);
  if (!dataToolMatch) {
    issues.push('Missing data-tool attribute on <main>');
  }

  // 4. Check Editor / UI structure
  const hasInput = content.includes('id="input') || content.includes('id="csv-input') || content.includes('id="json-input') || content.includes('id="editor') || content.includes('id="query') || content.includes('id="editor-a') || content.includes('id="mock-');
  const hasOutput = content.includes('id="output') || content.includes('id="tree-') || content.includes('id="diff-') || content.includes('id="preview') || content.includes('id="results') || content.includes('id="schema-output') || content.includes('id="ts-output') || content.includes('id="code-output');
  if (!hasInput) issues.push('Warning: Unusual input element ID');
  
  // 5. Check Sample Button
  const hasSampleBtn = content.includes('Sample') || content.includes('sample') || content.includes('loadSample') || content.includes('Load Sample');

  // 6. Check Copy / Action Buttons
  const hasCopyBtn = content.includes('Copy') || content.includes('copy') || content.includes('btn--copy');

  results.push({
    tool: tool.name,
    file: tool.file,
    category: tool.cat,
    dataTool: dataToolMatch ? dataToolMatch[1] : null,
    hasInput,
    hasOutput,
    hasSampleBtn,
    hasCopyBtn,
    issues
  });
});

console.log(JSON.stringify(results, null, 2));
