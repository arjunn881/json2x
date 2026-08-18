const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://json2x.com';
const DOCS_DIR = path.join(WORKSPACE_ROOT, 'docs');
const CONTENT_DIR = path.join(DOCS_DIR, 'content');

if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// ── Complete 17-Tool Documentation Matrix (AdSense Compliant) ───
const SAMPLE_DOCS = [
  {
    filename: 'rfc8259-json-specification.mdx',
    frontmatter: {
      title: 'Complete RFC 8259 JSON Specification & Grammar Reference',
      description: 'An authoritative developer reference on official RFC 8259 JSON syntax rules, primitive data types, string escaping, and number encoding.',
      category: 'Format & Validate',
      tags: ['json', 'rfc8259', 'specification', 'syntax', 'validator'],
      author: 'JSON2X Engineering Team',
      date: '2026-08-16',
      primaryTool: 'json-validator'
    },
    markdown: `
# Complete RFC 8259 JSON Specification & Grammar Reference

JSON (JavaScript Object Notation) is governed by **IETF RFC 8259** and **ECMA-404**. It is a lightweight, text-based, language-independent data interchange format.

## 1. Core Data Types in RFC 8259

RFC 8259 defines six fundamental primitive and structural data types:

- **Objects (\`{ }\`):** Unordered collections of zero or more key-value pairs. Keys MUST be double-quoted strings.
- **Arrays (\`[ ]\`):** Ordered sequences of zero or more values of any type.
- **Strings (\`"..."\`):** Sequences of Unicode code points enclosed in double quotes (\`"...\`).
- **Numbers:** Signed decimal numbers in standard or scientific exponential notation.
- **Booleans:** Keyword literals \`true\` or \`false\` (strictly lowercase).
- **Null:** The keyword literal \`null\`.

\`\`\`json
{
  "name": "JSON2X Enterprise API",
  "version": 2.4,
  "isActive": true,
  "metadata": null,
  "tags": ["developer", "tools", "privacy-first"]
}
\`\`\`

## 2. String Escaping & Special Characters

RFC 8259 mandates backslash (\`\\\`) escaping for special control characters:

| Character | Escape Sequence | Description |
| :--- | :--- | :--- |
| Quotation mark | \`\\"\` | Double quote character |
| Reverse solidus | \`\\\\\` | Backslash character |
| Solidus | \`\\/\` | Forward slash (optional) |
| Backspace | \`\\b\` | Backspace control code |
| Form feed | \`\\f\` | Form feed control code |
| Line feed | \`\\n\` | Standard Unix newline |
| Carriage return | \`\\r\` | Carriage return |
| Tab | \`\\t\` | Horizontal tab |
| Unicode code point | \`\\uXXXX\` | 4-hex digit Unicode hex |

## 3. Strict RFC 8259 Parsing Rules

1. **No Single Quotes:** Keys and string values must strictly use double quotes (\`"key": "value"\`).
2. **No Trailing Commas:** A comma after the final element in an object or array causes a syntax violation.
3. **No Unquoted Keys:** Property names like \`{ age: 30 }\` are valid JavaScript object literals, but invalid JSON.
4. **No Comments:** Comments (\`//\` or \`/* */\`) are prohibited under standard RFC 8259.
5. **No Leading Zeros:** Numbers like \`0123\` or \`+42\` are invalid in JSON.

## 4. Frequently Asked Questions

### Why does JSON reject single quotes?
RFC 8259 explicitly standardized on double quotes (\`"\`) to ensure absolute cross-platform interoperability across all programming language parsers (C, Java, Python, Go, Rust).

### How does client-side validation prevent data corruption?
Client-side validation runs in the browser's JavaScript engine before network transmission, preventing invalid payloads from hitting backend databases and APIs.
    `
  },
  {
    filename: 'json-formatting-and-linting-architecture.mdx',
    frontmatter: {
      title: 'JSON Formatting & Line-Level Linting Architecture',
      description: 'In-depth guide on JSON pretty-printing algorithms, recursive AST indentation, syntax highlighting, and exact line/column error pinpointing.',
      category: 'Format & Validate',
      tags: ['formatter', 'beautify', 'linter', 'ast', 'formatting'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-formatter'
    },
    markdown: `
# JSON Formatting & Line-Level Linting Architecture

Formatting unformatted JSON transforms dense single-line network payloads into structured, human-readable representations.

## 1. Indentation Mechanics & Spacing Algorithms

The JSON formatter supports 2-space, 4-space, and tab-based recursive tree formatting.

\`\`\`javascript
// High-performance native formatting
function formatJson(rawText, indentLevel = 2) {
  const parsed = JSON.parse(rawText);
  return JSON.stringify(parsed, null, indentLevel);
}
\`\`\`

## 2. Line and Column Error Pinpointing

When parsing fails, the linter identifies the exact byte offset, calculating:
- **Line Number:** Count of newline characters (\`\\n\`) prior to the error offset + 1.
- **Column Number:** Number of characters between the previous newline and the error offset.
- **Error Excerpt:** A 3-line contextual window with an arrow pointer directly beneath the offending character.

## 3. Key Sorting & Deterministic Canonical JSON

In cryptographic workflows, deterministic hashing, and Git version control, sorting object keys alphabetically ensures idempotent diffs:

\`\`\`javascript
function sortObjectKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  return Object.keys(obj).sort().reduce((acc, key) => {
    acc[key] = sortObjectKeys(obj[key]);
    return acc;
  }, {});
}
\`\`\`

## 4. Best Practices for Large JSON Payloads
1. Offload formatting of files over 1MB to Web Workers to prevent main-thread UI jank.
2. Use streaming serializers for memory-constrained environments.
    `
  },
  {
    filename: 'json-minification-performance.mdx',
    frontmatter: {
      title: 'High-Performance JSON Minification & Payload Compression',
      description: 'Engineering guide on JSON payload minification, whitespace elimination algorithms, network bandwidth optimization, and HTTP compression interactions.',
      category: 'Format & Validate',
      tags: ['json', 'minification', 'performance', 'bandwidth', 'optimization'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-minifier'
    },
    markdown: `
# High-Performance JSON Minification & Payload Compression

Minifying JSON payloads strips all non-structural whitespace, tabs, and line feeds to produce the smallest possible text representation.

## 1. Single-Pass Token Scanning

Minification identifies quotes, escape sequences, and structural delimiters without allocating complex intermediate AST nodes:

\`\`\`javascript
function minifyJson(jsonString) {
  return JSON.stringify(JSON.parse(jsonString));
}
\`\`\`

## 2. Byte Savings Analysis & HTTP Compression

| Payload Type | Unformatted (KB) | Formatted (KB) | Minified (KB) | Minified + Brotli (KB) |
| :--- | :--- | :--- | :--- | :--- |
| User Profile API | 12.4 | 18.2 | 11.8 | 2.6 |
| Catalog Dataset | 245.0 | 380.5 | 231.2 | 34.8 |
| Large Log Export | 4,200.0 | 6,500.0 | 3,950.0 | 480.0 |

Minification combined with Brotli or Gzip HTTP transfer compression yields up to 90% bandwidth reductions.
    `
  },
  {
    filename: 'structural-json-diffing-algorithms.mdx',
    frontmatter: {
      title: 'Structural JSON Diffing & Semantic Comparison Algorithms',
      description: 'Deep-dive into structural JSON diff algorithms, key ordering normalization, LCS diff engines, and visual delta rendering.',
      category: 'Format & Validate',
      tags: ['diff', 'comparison', 'algorithms', 'json-diff'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-diff'
    },
    markdown: `
# Structural JSON Diffing & Semantic Comparison Algorithms

Standard line-by-line diff tools (like Git diff) often fail on JSON because unordered keys and formatting variations produce false positives. Structural JSON diffing analyzes the hierarchical tree.

## 1. Semantic vs Lexical Diffing

- **Lexical Diff:** Compares text line-by-line. Sensitive to spaces, indentation, and key reordering.
- **Structural / Semantic Diff:** Parses both inputs into abstract syntax trees, normalizes key orders, and compares value types and leaves.

## 2. The Myers Diff & Tree Delta Model

The diff engine classifies changes into 4 atomic states:
- \`ADDED\`: A key or array index present in the Right payload but absent in Left.
- \`REMOVED\`: A key or array index present in Left but absent in Right.
- \`MODIFIED\`: The key exists in both, but primitive values or types differ.
- \`UNCHANGED\`: Identical key and value.

\`\`\`javascript
// Delta node representation
type Delta = {
  path: string;
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  leftValue?: any;
  rightValue?: any;
};
\`\`\`
    `
  },
  {
    filename: 'json-to-csv-flattening-mechanics.mdx',
    frontmatter: {
      title: 'JSON to CSV Flattening Mechanics & Dot-Notation Mapping',
      description: 'Complete guide on converting nested JSON object arrays to RFC 4180 CSV tables with dot-notation column flattening and delimiter controls.',
      category: 'Data Converters',
      tags: ['json-to-csv', 'csv', 'converter', 'export', 'data-engineering'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-csv'
    },
    markdown: `
# JSON to CSV Flattening Mechanics & Dot-Notation Mapping

Relational spreadsheets and analytics platforms (Excel, Google Sheets, Pandas) require tabular 2D structures. JSON to CSV conversion flattens multi-level objects into rectangular rows and columns.

## 1. Recursive Key Flattening (Dot-Notation)

Nested object properties are transformed into delimited column headers:

\`\`\`json
// Input JSON
[
  {
    "id": 101,
    "user": { "name": "Alice", "address": { "city": "London" } }
  }
]
\`\`\`

\`\`\`csv
id,user.name,user.address.city
101,Alice,London
\`\`\`

## 2. Array Serialization Modes
- **JSON String Mode:** Encodes inner arrays as stringified JSON (e.g. \`"[\"admin\", \"billing\"]"\`).
- **Joined String Mode:** Joins primitive array values with semicolons or pipes (e.g. \`"admin;billing"\`).

## 3. RFC 4180 Escaping Compliance
Fields containing commas, line breaks, or double quotes must be wrapped in double quotes, with internal quotes escaped as \`""\`.
    `
  },
  {
    filename: 'csv-to-json-parsing-and-type-inference.mdx',
    frontmatter: {
      title: 'CSV to JSON Parsing & Automatic Type Inference',
      description: 'Comprehensive guide to parsing RFC 4180 CSV documents, auto-detecting delimiters, and inferring boolean, integer, float, and null types.',
      category: 'Data Converters',
      tags: ['csv-to-json', 'csv', 'parser', 'type-inference', 'converter'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'csv-to-json'
    },
    markdown: `
# CSV to JSON Parsing & Automatic Type Inference

Converting raw CSV spreadsheets into valid JSON is essential for feeding databases and REST APIs.

## 1. Delimiter Auto-Detection

The parser analyzes the first 5 rows to statistically detect the primary separator:
- Comma (\`,\`)
- Semicolon (\`;\`)
- Tab (\`\\t\`)
- Pipe (\`|\`)

## 2. Type Inference Engine

Since CSV is pure un-typed text, the engine inspects values against regex patterns:

| Raw CSV Value | Inferred JSON Type | Parsed Output |
| :--- | :--- | :--- |
| \`"42"\` | Integer (\`number\`) | \`42\` |
| \`"3.1415"\` | Float (\`number\`) | \`3.1415\` |
| \`"true"\` / \`"TRUE"\` | Boolean (\`boolean\`) | \`true\` |
| \`"null"\` / \`"NULL"\` / \`""\` | Null | \`null\` |
| \`"2026-08-16T12:00:00Z"\` | String (ISO Date) | \`"2026-08-16T12:00:00Z"\` |
    `
  },
  {
    filename: 'json-to-yaml-serialization-rules.mdx',
    frontmatter: {
      title: 'JSON to YAML Serialization & Formatting Guide',
      description: 'Technical reference on converting JSON structures to clean YAML 1.2 configuration files with custom indentation and block scalar formatting.',
      category: 'Data Converters',
      tags: ['json-to-yaml', 'yaml', 'kubernetes', 'docker', 'devops'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-yaml'
    },
    markdown: `
# JSON to YAML Serialization & Formatting Guide

YAML (YAML Ain't Markup Language) is the de facto standard for cloud-native configurations (Kubernetes manifests, GitHub Actions, Docker Compose, Ansible playbooks).

## 1. Structural Equivalence

Because JSON is a strict subset of YAML 1.2, every valid JSON document is syntactically valid YAML. However, formatting JSON as human-readable YAML eliminates curly braces, brackets, and quotes where safe.

\`\`\`yaml
# Output YAML
name: production-cluster
replicas: 3
environment:
  region: us-east-1
  tier: api
services:
  - name: auth-service
    port: 8080
  - name: billing-service
    port: 9000
\`\`\`

## 2. Block Scalars & Multiline Text
Multiline strings in JSON (with \`\\n\`) serialize into clean YAML block scalars (\`|\` or \`>\`), maintaining readability.
    `
  },
  {
    filename: 'json-to-xml-mapping-and-attributes.mdx',
    frontmatter: {
      title: 'JSON to XML Mapping, Root Elements & Attribute Syntax',
      description: 'Engineering guide on converting JSON hierarchies to valid XML documents, managing root tags, XML declaration headers, and attribute prefixes.',
      category: 'Data Converters',
      tags: ['json-to-xml', 'xml', 'soap', 'rss', 'markup'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-xml'
    },
    markdown: `
# JSON to XML Mapping, Root Elements & Attribute Syntax

While modern web applications utilize JSON, enterprise SOAP services, legacy finance systems, and RSS feeds rely on XML.

## 1. Tree Mapping Rules
- **Objects:** Converted into parent XML tags containing child element tags.
- **Arrays:** Repeated sibling tags with a configurable item tag (e.g. \`<item>\` or pluralized root).
- **Attributes:** Keys prefixed with \`@\` (e.g. \`"@id": "100"\`) map directly to XML element attributes.

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <user id="usr_101">
    <name>Alice Smith</name>
    <roles>
      <role>Admin</role>
      <role>Developer</role>
    </roles>
  </user>
</root>
\`\`\`
    `
  },
  {
    filename: 'json-to-toml-specification-guide.mdx',
    frontmatter: {
      title: 'JSON to TOML Transformation & Config Engineering',
      description: 'Developer guide to transforming JSON documents into TOML v1.0.0 configurations for Rust Cargo, Python pyproject.toml, and Hugo static sites.',
      category: 'Data Converters',
      tags: ['json-to-toml', 'toml', 'rust', 'cargo', 'python'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-toml'
    },
    markdown: `
# JSON to TOML Transformation & Config Engineering

TOML (Tom's Obvious Minimal Language) is designed for unambiguous human configuration, widely adopted by Rust (\`Cargo.toml\`), Python (\`pyproject.toml\`), and Go tools.

## 1. Table Syntax & Array of Tables

- Primitive key-value pairs serialize at the root: \`key = "value"\`.
- Nested objects serialize as standard tables: \`[package.metadata]\`.
- Arrays of objects serialize as double-bracket tables: \`[[dependencies]]\`.

\`\`\`toml
[package]
name = "json2x-engine"
version = "2.8.0"
edition = "2024"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1.35", features = ["full"] }
\`\`\`
    `
  },
  {
    filename: 'json-to-sql-schema-inference-ddl.mdx',
    frontmatter: {
      title: 'JSON to SQL Schema Inference, DDL & INSERT Generation',
      description: 'Learn how to generate relational SQL CREATE TABLE schemas and INSERT statement migrations from JSON object collections.',
      category: 'Data Converters',
      tags: ['json-to-sql', 'sql', 'postgres', 'mysql', 'sqlite', 'database'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-sql'
    },
    markdown: `
# JSON to SQL Schema Inference, DDL & INSERT Generation

Converting document-oriented JSON into relational SQL requires inspecting sample records, determining optimal column data types, and synthesizing DDL.

## 1. Supported SQL Dialects
- **PostgreSQL:** Uses \`SERIAL PRIMARY KEY\`, \`VARCHAR\`, \`BOOLEAN\`, \`TIMESTAMP WITH TIME ZONE\`, \`JSONB\`.
- **MySQL:** Uses \`AUTO_INCREMENT\`, \`DATETIME\`, \`TEXT\`, \`JSON\`.
- **SQLite:** Uses \`INTEGER PRIMARY KEY AUTOINCREMENT\`, \`TEXT\`, \`REAL\`.

\`\`\`sql
-- Generated PostgreSQL DDL
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated INSERT DML
INSERT INTO users (id, name, email, is_active) VALUES
(1, 'Alice Smith', 'alice@example.com', true),
(2, 'Bob Jones', 'bob@example.com', false);
\`\`\`
    `
  },
  {
    filename: 'json-multi-converter-architecture.mdx',
    frontmatter: {
      title: '7-in-1 JSON Multi-Converter Architecture & AST Pipelines',
      description: 'Technical architecture of the unified 7-in-1 JSON multi-converter: simultaneous synthesis of TypeScript, Zod, Mongoose, SQL, OpenAPI 3.0, JSON Schema, and Mock Data.',
      category: 'Code & Schema',
      tags: ['json-converter', 'multi-converter', 'typescript', 'zod', 'openapi', 'mongoose'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-converter'
    },
    markdown: `
# 7-in-1 JSON Multi-Converter Architecture & AST Pipelines

The 7-in-1 Multi-Converter parses raw JSON once into an intermediate type graph, emitting 7 targets concurrently in memory without server network latency.

## 1. Conversion Targets

1. **TypeScript:** Interfaces and optional Type aliases.
2. **Zod:** Runtime validation schemas with chained type checks.
3. **Mongoose:** MongoDB schema definitions with field types.
4. **SQL DDL:** Relational schema tables and insert statements.
5. **OpenAPI 3.0:** REST API contract schema components.
6. **JSON Schema:** Draft-07 compliant specification models.
7. **Mock Data:** Synthetic test records matching the inferred structure.

\`\`\`typescript
// Shared Type Node Graph
interface TypeNode {
  kind: 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object';
  optional: boolean;
  properties?: Record<string, TypeNode>;
  itemType?: TypeNode;
}
\`\`\`
    `
  },
  {
    filename: 'typescript-zod-generation-guide.mdx',
    frontmatter: {
      title: 'TypeScript Interface & Zod Schema Generation Guide',
      description: 'Step-by-step tutorial on converting raw JSON API responses into strongly-typed TypeScript declarations and runtime Zod validation schemas.',
      category: 'Code & Schema',
      tags: ['typescript', 'zod', 'schema', 'api', 'types'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-ts'
    },
    markdown: `
# TypeScript Interface & Zod Schema Generation Guide

Type safety is critical for modern full-stack web applications. Converting raw JSON payloads into TypeScript interfaces eliminates runtime undefined errors.

## 1. Inferring Types from Dynamic Data

The generator inspects primitive values, nullability, nested dictionaries, and homogeneous arrays:

\`\`\`typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  tags: string[];
  settings: {
    theme: 'dark' | 'light';
    notifications: boolean;
  };
}
\`\`\`

## 2. Synthesizing Runtime Zod Schemas

\`\`\`typescript
import { z } from 'zod';

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  tags: z.array(z.string()),
  settings: z.object({
    theme: z.enum(['dark', 'light']),
    notifications: z.boolean()
  })
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
\`\`\`
    `
  },
  {
    filename: 'json-to-code-models-go-rust-python.mdx',
    frontmatter: {
      title: 'Generating Idiomatic Code Models: Go, Rust & Python',
      description: 'Technical guide on synthesizing strongly-typed Go structs with json tags, Rust Serde models with derive macros, and Python Pydantic BaseModel classes.',
      category: 'Code & Schema',
      tags: ['json-to-code', 'go', 'golang', 'rust', 'serde', 'python', 'pydantic'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-to-code'
    },
    markdown: `
# Generating Idiomatic Code Models: Go, Rust & Python

Transforming sample API responses into backend models saves hours of boilerplate coding across microservices.

## 1. Go Structs (with JSON tags)

\`\`\`go
package models

type UserPayload struct {
    ID        int64    \`json:"id"\`
    Username  string   \`json:"username"\`
    Email     string   \`json:"email"\`
    IsAdmin   bool     \`json:"is_admin"\`
    Roles     []string \`json:"roles"\`
}
\`\`\`

## 2. Rust Structs (Serde Serialize & Deserialize)

\`\`\`rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserPayload {
    pub id: i64,
    pub username: String,
    pub email: String,
    pub is_admin: bool,
    pub roles: Vec<String>,
}
\`\`\`

## 3. Python (Pydantic v2 BaseModels)

\`\`\`python
from pydantic import BaseModel, EmailStr
from typing import List

class UserPayload(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool
    roles: List[str]
\`\`\`
    `
  },
  {
    filename: 'json-schema-draft-07-inference.mdx',
    frontmatter: {
      title: 'JSON Schema Draft-07 Automated Inference & Validation',
      description: 'Deep dive into Draft-07 JSON Schema inference, required properties detection, format validators (email, uri, date-time), and contract testing.',
      category: 'Code & Schema',
      tags: ['json-schema', 'schema', 'draft-07', 'validation', 'api-contracts'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'schema'
    },
    markdown: `
# JSON Schema Draft-07 Automated Inference & Validation

JSON Schema provides a formal contract for validating payload structure, data types, and required fields across microservices.

## 1. Draft-07 Schema Anatomy

\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "UserRecord",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" },
    "createdAt": { "type": "string", "format": "date-time" }
  },
  "required": ["id", "email"]
}
\`\`\`

## 2. Automated Format Inference
The schema generator detects string formats automatically:
- \`email\`: Strings matching RFC 5322 email patterns.
- \`date-time\`: ISO 8601 timestamps (e.g. \`2026-08-16T12:00:00Z\`).
- \`uri\`: URLs starting with \`http://\` or \`https://\`.
- \`uuid\`: Canonical 36-character hexadecimal UUIDs.
    `
  },
  {
    filename: 'synthetic-json-mock-generation.mdx',
    frontmatter: {
      title: 'Generating Realistic Synthetic Mock JSON Datasets',
      description: 'Complete guide on generating high-fidelity synthetic JSON datasets for API testing, frontend state mockups, and benchmarking without PII compliance risk.',
      category: 'Code & Schema',
      tags: ['json-mock-generator', 'mock', 'synthetic-data', 'testing', 'api'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-mock-generator'
    },
    markdown: `
# Generating Realistic Synthetic Mock JSON Datasets

Real-world API testing and frontend prototyping require realistic mock datasets without exposing sensitive Personally Identifiable Information (PII).

## 1. Pre-Configured Templates

- **User Accounts:** Realistic first/last names, company emails, avatars, UUIDs, phone numbers.
- **E-Commerce Orders:** Product catalogs, SKU identifiers, currency prices, shipping addresses.
- **Server Logs:** HTTP status codes, latency timings, user agent strings, client IP addresses.

\`\`\`json
[
  {
    "id": "usr_9912",
    "fullName": "Sarah Connor",
    "email": "sarah.connor@cyberdyne.org",
    "role": "Security Engineer",
    "isActive": true
  }
]
\`\`\`
    `
  },
  {
    filename: 'jsonpath-syntax-and-evaluator-engine.mdx',
    frontmatter: {
      title: 'JSONPath Query Syntax & Real-Time Evaluator Guide',
      description: 'Comprehensive developer manual on JSONPath expressions (RFC 9535), recursive descent operators, slice notations, and filter expressions.',
      category: 'Query & Inspection',
      tags: ['jsonpath', 'query', 'filter', 'evaluator', 'rfc9535'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'jsonpath'
    },
    markdown: `
# JSONPath Query Syntax & Real-Time Evaluator Guide

JSONPath is an expression language for querying, filtering, and extracting nodes from JSON structures, codified under **IETF RFC 9535**.

## 1. Core Operators Syntax

| Operator | Syntax | Description |
| :--- | :--- | :--- |
| Root object | \`$\` | The root context object or array |
| Child operator | \`.\` or \`[]\` | Access named property or array index |
| Recursive descent | \`..\` | Search across all nested depths |
| Wildcard | \`*\` | Matches all elements or properties |
| Array slice | \`[start:end:step]\` | Subarray slicing |
| Filter expression | \`[?(@.price < 20)]\` | Predicate filtering on current node |

## 2. Real-World Query Examples

\`\`\`javascript
// Extract all author names across any depth
$.store.book[*].author

// Filter all items where price is greater than 10
$..book[?(@.price > 10)]

// Retrieve the last two elements of an array
$.orders[-2:]
\`\`\`
    `
  },
  {
    filename: 'json-tree-viewer-virtualization.mdx',
    frontmatter: {
      title: 'JSON Tree Viewer Architecture & DOM Virtualization',
      description: 'Engineering guide on building collapsible, searchable interactive JSON tree diagrams with node counts, depth management, and memory virtualization.',
      category: 'Query & Inspection',
      tags: ['json-tree-viewer', 'viewer', 'tree', 'virtualization', 'dom'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'viewer'
    },
    markdown: `
# JSON Tree Viewer Architecture & DOM Virtualization

Visualizing deeply nested JSON payloads requires an intuitive, collapsible tree diagram capable of rendering thousands of nodes without browser lag.

## 1. Hierarchical Node Classification
Every node in the tree is labeled by its structural data type:
- \`Object\`: Collapsible container displaying total key count (e.g. \`object [5 keys]\`).
- \`Array\`: Collapsible list displaying element count (e.g. \`array [100 items]\`).
- \`Primitives\`: Color-coded string, number, boolean, and null badges.

## 2. Real-Time Tree Search & Filtering
The search engine traverses node keys and primitive values, automatically expanding parent paths containing query matches while dimming non-matching siblings.
    `
  },
  {
    filename: 'parsing-large-json-web-workers.mdx',
    frontmatter: {
      title: 'Parsing 100MB+ JSON Payloads with Web Workers',
      description: 'Developer guide on offloading heavy JSON parsing and streaming tokenization to dedicated background Web Workers to maintain 60FPS UI performance.',
      category: 'Performance Notes',
      tags: ['web-workers', 'performance', 'parsing', 'javascript'],
      author: 'Staff Developer Tools Engineer',
      date: '2026-08-16',
      primaryTool: 'json-formatter'
    },
    markdown: `
# Parsing 100MB+ JSON Payloads with Web Workers

Parsing massive JSON files directly on the main thread causes UI freezing, dropped frames, and poor Core Web Vitals (Interaction to Next Paint - INP).

## 1. Web Worker Thread Offloading

By delegating \`JSON.parse()\` and AST serialization to a dedicated background Worker, the main-thread event loop remains completely responsive.

\`\`\`javascript
// worker-formatter.js
self.onmessage = function (e) {
  try {
    const parsed = JSON.parse(e.data);
    const formatted = JSON.stringify(parsed, null, 2);
    self.postMessage({ status: 'success', result: formatted });
  } catch (err) {
    self.postMessage({ status: 'error', message: err.message });
  }
};
\`\`\`
    `
  }
];

// Write out MDX content files
SAMPLE_DOCS.forEach(doc => {
  const filePath = path.join(CONTENT_DIR, doc.filename);
  const fileBody = `---
title: "${doc.frontmatter.title}"
description: "${doc.frontmatter.description}"
category: "${doc.frontmatter.category}"
tags: ${JSON.stringify(doc.frontmatter.tags)}
author: "${doc.frontmatter.author}"
date: "${doc.frontmatter.date}"
primaryTool: "${doc.frontmatter.primaryTool || 'json-formatter'}"
---
${doc.markdown}`;
  fs.writeFileSync(filePath, fileBody, 'utf8');
});

// Simple Markdown to HTML parser
function parseMarkdown(md) {
  let html = md;
  // Tables
  html = html.replace(/\n\|(.+)\|\n\| *[-:]+[-| :]*\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headers = header.split('|').filter(h => h.trim() !== '').map(h => `<th>${h.trim()}</th>`).join('');
    const bodyRows = rows.trim().split('\n').map(row => {
      const cols = row.split('|').filter(c => c.trim() !== '').map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cols}</tr>`;
    }).join('\n');
    return `<div class="table-responsive"><table class="docs-table"><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
  });
  // Fenced Code blocks matching Knowledge Base tool-code-example
  html = html.replace(/```([a-z0-9_-]+)?\n([\s\S]*?)```/g, (m, lang, code) => {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="tool-code-example" style="margin:var(--space-6) 0;"><code>${escaped.trim()}</code></div>`;
  });
  // Strip top H1 heading (rendered cleanly in page hero)
  html = html.replace(/^# .*$/m, '');
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  // Lists (unordered & numbered)
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Paragraphs
  html = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<div') || p.startsWith('<table')) return p;
    return `<p>${p}</p>`;
  }).join('\n');

  return html;
}

// Build individual Doc HTML pages
console.log('Building Scalable MD/MDX Documentation System...');

const compiledDocs = [];

SAMPLE_DOCS.forEach(doc => {
  const slug = doc.filename.replace(/\.mdx?$/, '');
  const htmlContent = parseMarkdown(doc.markdown);
  const toolSlug = doc.frontmatter.primaryTool || 'json-formatter';
  const toolHref = `/tools/${toolSlug.endsWith('.html') ? toolSlug : toolSlug + '.html'}`;

  const relatedDocsHtml = SAMPLE_DOCS
    .filter(d => d.filename !== doc.filename)
    .slice(0, 5)
    .map(d => {
      const s = d.filename.replace(/\.mdx?$/, '');
      return `<li><a href="${BASE_URL}/docs/${s}.html" style="color:var(--accent); text-decoration:none;">${d.frontmatter.title}</a></li>`;
    })
    .join('\n');

  const docHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>(function(){var t;try{t=localStorage.getItem('jsontoolkit_theme')}catch(e){}if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})();</script>

  <title>${doc.frontmatter.title} | JSON2X</title>
  <meta name="description" content="${doc.frontmatter.description.slice(0, 165)}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0d1117" />
  <meta name="color-scheme" content="dark light" />
  <link rel="canonical" href="${BASE_URL}/docs/${slug}.html" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

  <meta property="og:title" content="${doc.frontmatter.title} | JSON2X" />
  <meta property="og:description" content="${doc.frontmatter.description.slice(0, 165)}" />
  <meta property="og:url" content="${BASE_URL}/docs/${slug}.html" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${BASE_URL}/assets/og-image.png" />
  <meta property="og:site_name" content="JSON2X" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${doc.frontmatter.title}" />
  <meta name="twitter:description" content="${doc.frontmatter.description.slice(0, 165)}" />
  <meta name="twitter:image" content="${BASE_URL}/assets/og-image.png" />

  <link rel="stylesheet" href="/assets/css/design-system.css" />
  <link rel="stylesheet" href="/assets/css/components.css?v=2.9.0" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "${doc.frontmatter.title}",
    "description": "${doc.frontmatter.description}",
    "author": {
      "@type": "Organization",
      "name": "JSON2X"
    },
    "datePublished": "${doc.frontmatter.date}",
    "mainEntityOfPage": "${BASE_URL}/docs/${slug}.html"
  }
  </script>
</head>
<body>
  <div id="site-header-placeholder"></div>

  <main id="main-content">
    <div class="container" style="padding: var(--space-12) var(--space-4);">
      <div id="breadcrumb-placeholder"></div>

      <div class="tool-hero" style="text-align:left; margin-bottom:var(--space-10)">
        <div class="tool-hero__badge">${doc.frontmatter.category} Documentation</div>
        <h1 class="tool-hero__title">${doc.frontmatter.title}</h1>
        <p class="tool-hero__desc">${doc.frontmatter.description}</p>
      </div>

      <article class="faq-prose" style="margin-bottom:var(--space-12)">
        ${htmlContent}

        <div class="tool-cta-banner">
          <h2 class="tool-cta-banner__title">Try Our Free Client-Side Developer Tools</h2>
          <p class="tool-cta-banner__desc">Zero latency, 100% data privacy, and Web Worker performance.</p>
          <a href="${toolHref}" class="btn btn--primary" style="padding:var(--space-3) var(--space-8); text-decoration:none; font-weight:var(--font-semibold);">Launch Tool</a>
        </div>
      </article>

      <!-- Internal Linking & Related Topics -->
      <section class="tool-section" style="margin-top:var(--space-12)">
        <h2 class="tool-section__title">Related Documentation &amp; Reference Articles</h2>
        <ul style="line-height: var(--leading-relaxed); padding-left: var(--space-6);">
          ${relatedDocsHtml}
        </ul>
      </section>
    </div>
  </main>

  <div id="site-footer-placeholder"></div>
  <script src="/assets/js/i18n.js"></script>
  <script src="/assets/js/common.js"></script>
  <script src="/assets/js/layout.js?v=2.9.0"></script>
</body>
</html>`;

  const outputPath = path.join(DOCS_DIR, `${slug}.html`);
  fs.writeFileSync(outputPath, docHtml, 'utf8');
  compiledDocs.push({ slug, ...doc.frontmatter });
  console.log(`   - Compiled docs page: docs/${slug}.html`);
});

// Build Docs Hub Index
const docsHubCardsHtml = compiledDocs.map(d => {
  return `
  <a href="/docs/${d.slug}.html" class="faq-card" style="text-decoration:none; display:block;">
    <p class="faq-section__eyebrow">${d.category}</p>
    <h2 class="faq-card__q">${d.title}</h2>
    <p class="faq-card__a">${d.description}</p>
  </a>`;
}).join('\n');

const docsIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script>(function(){var t;try{t=localStorage.getItem('jsontoolkit_theme')}catch(e){}if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})();</script>

  <title>Developer Documentation Hub &amp; Specifications — JSON2X</title>
  <meta name="description" content="Technical documentation, IETF specifications, algorithm breakdowns, and code generation manuals for all 17 JSON2X developer utilities." />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0d1117" />
  <meta name="color-scheme" content="dark light" />
  <link rel="canonical" href="${BASE_URL}/docs/index.html" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

  <meta property="og:title" content="Developer Documentation Hub &amp; Specifications — JSON2X" />
  <meta property="og:description" content="Technical documentation, IETF specifications, algorithm breakdowns, and code generation manuals for all 17 JSON2X developer utilities." />
  <meta property="og:url" content="${BASE_URL}/docs/index.html" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${BASE_URL}/assets/og-image.png" />
  <meta property="og:site_name" content="JSON2X" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Developer Documentation Hub &amp; Specifications — JSON2X" />
  <meta name="twitter:description" content="Technical documentation, IETF specifications, algorithm breakdowns, and code generation manuals for all 17 JSON2X developer utilities." />
  <meta name="twitter:image" content="${BASE_URL}/assets/og-image.png" />

  <link rel="stylesheet" href="/assets/css/design-system.css" />
  <link rel="stylesheet" href="/assets/css/components.css?v=2.9.0" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": "Developer Documentation Hub & Specifications — JSON2X",
    "description": "Technical documentation, IETF specifications, and code generation manuals for all 17 JSON2X utilities.",
    "publisher": {
      "@type": "Organization",
      "name": "JSON2X"
    },
    "mainEntityOfPage": "${BASE_URL}/docs/index.html"
  }
  </script>
</head>
<body>
  <div id="site-header-placeholder"></div>

  <main id="main-content">
    <div class="container" style="padding: var(--space-12) var(--space-4);">
      <div id="breadcrumb-placeholder"></div>

      <div class="tool-hero" style="text-align:left; margin-bottom:var(--space-10)">
        <div class="tool-hero__badge">Documentation Hub</div>
        <h1 class="tool-hero__title">Developer Documentation &amp; Specifications</h1>
        <p class="tool-hero__desc">Authoritative architectural references, IETF RFC standards, parser mechanics, and type-safety guides for our suite of 17 browser-native tools.</p>
      </div>

      <div class="faq-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6);">
        ${docsHubCardsHtml}
      </div>
    </div>
  </main>

  <div id="site-footer-placeholder"></div>
  <script src="/assets/js/i18n.js"></script>
  <script src="/assets/js/common.js"></script>
  <script src="/assets/js/layout.js?v=2.9.0"></script>
</body>
</html>`;

fs.writeFileSync(path.join(DOCS_DIR, 'index.html'), docsIndexHtml, 'utf8');
console.log(`Successfully compiled Documentation System (${compiledDocs.length} articles + 1 Hub index)`);
