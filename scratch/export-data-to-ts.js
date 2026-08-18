const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 1. Export Blog Articles
try {
  const blogScript = fs.readFileSync(path.join(ROOT, 'scripts', 'build-blog.js'), 'utf8');
  // Match BLOG_ARTICLES array
  const match = blogScript.match(/const BLOG_ARTICLES\s*=\s*(\[[\s\S]*?\n\];)/m);
  if (match) {
    let arrayContent = match[1].trim();
    if (arrayContent.endsWith(';')) arrayContent = arrayContent.slice(0, -1);
    const content = `export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  metaDesc: string;
  h1: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  primaryTool: string;
  tags: string[];
  intro: string;
  sections: BlogSection[];
  faqs?: BlogFAQ[];
}

export const BLOG_ARTICLES: BlogArticle[] = ${arrayContent};
`;
    fs.writeFileSync(path.join(DATA_DIR, 'blog.ts'), content, 'utf8');
    console.log('Successfully wrote src/data/blog.ts');
  } else {
    console.warn('Could not match BLOG_ARTICLES');
  }
} catch (e) {
  console.error('Error exporting blog:', e);
}

// 2. Export Docs
try {
  const docsScript = fs.readFileSync(path.join(ROOT, 'scripts', 'build-docs.js'), 'utf8');
  const match = docsScript.match(/const SAMPLE_DOCS\s*=\s*(\[[\s\S]*?\]);\s*\n\s*\/\//m) ||
                docsScript.match(/const SAMPLE_DOCS\s*=\s*(\[[\s\S]*?\]);\s*function/m);
  if (match) {
    const content = `export interface DocFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  primaryTool: string;
}

export interface DocItem {
  filename: string;
  frontmatter: DocFrontmatter;
  markdown: string;
}

export const DOCS: DocItem[] = ${match[1]};
`;
    fs.writeFileSync(path.join(DATA_DIR, 'docs.ts'), content, 'utf8');
    console.log('Successfully wrote src/data/docs.ts');
  } else {
    console.warn('Could not match SAMPLE_DOCS');
  }
} catch (e) {
  console.error('Error exporting docs:', e);
}

// 3. Export KB (PSEO_TOPICS)
try {
  const pseoScript = fs.readFileSync(path.join(ROOT, 'scripts', 'build-pseo.js'), 'utf8');
  const match = pseoScript.match(/const PSEO_TOPICS\s*=\s*(\[[\s\S]*?\]);\s*\n\s*\/\//m) ||
                pseoScript.match(/const PSEO_TOPICS\s*=\s*(\[[\s\S]*?\]);\s*function/m);
  if (match) {
    const content = `export interface KbFAQ {
  q: string;
  a: string;
}

export interface KbTopic {
  slug: string;
  title: string;
  h1: string;
  category: string;
  metaDesc: string;
  primaryTool: string;
  keywords: string;
  content: string;
  codeExample?: string;
  faqs?: KbFAQ[];
}

export const KB_TOPICS: KbTopic[] = ${match[1]};
`;
    fs.writeFileSync(path.join(DATA_DIR, 'kb.ts'), content, 'utf8');
    console.log('Successfully wrote src/data/kb.ts');
  } else {
    console.warn('Could not match PSEO_TOPICS');
  }
} catch (e) {
  console.error('Error exporting KB topics:', e);
}

// 4. Export Tool pSEO (TOOL_PAGES)
try {
  const toolPseoScript = fs.readFileSync(path.join(ROOT, 'scripts', 'build-tool-pseo.js'), 'utf8');
  const match = toolPseoScript.match(/const TOOL_PAGES\s*=\s*(\[[\s\S]*?\]);\s*\n\s*\/\//m) ||
                toolPseoScript.match(/const TOOL_PAGES\s*=\s*(\[[\s\S]*?\]);\s*function/m);
  if (match) {
    const content = `export interface ToolPseoFAQ {
  q: string;
  a: string;
}

export interface ToolPseoPage {
  slug: string;
  toolSlug: string;
  title: string;
  h1: string;
  metaDesc: string;
  keywords: string;
  category: string;
  content: string;
  faqs?: ToolPseoFAQ[];
}

export const TOOL_PAGES: ToolPseoPage[] = ${match[1]};
`;
    fs.writeFileSync(path.join(DATA_DIR, 'tool-pseo.ts'), content, 'utf8');
    console.log('Successfully wrote src/data/tool-pseo.ts');
  } else {
    console.warn('Could not match TOOL_PAGES');
  }
} catch (e) {
  console.error('Error exporting Tool pSEO:', e);
}
