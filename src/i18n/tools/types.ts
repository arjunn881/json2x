import type { ToolFAQ } from '../../data/tools';
import type { ToolHowToStep } from '../../data/tool-content';
import type { EdgeCaseAnalysis } from '../../data/toolsRegistry';

export type ToolId =
  | 'formatter'
  | 'validator'
  | 'minifier'
  | 'diff'
  | 'json-to-csv'
  | 'csv-to-json'
  | 'json-to-yaml'
  | 'json-to-xml'
  | 'json-to-toml'
  | 'json-to-sql'
  | 'json-converter'
  | 'json-to-ts'
  | 'json-to-code'
  | 'schema'
  | 'json-mock-generator'
  | 'json-to-zod'
  | 'json-to-prisma'
  | 'json-to-drizzle'
  | 'json-to-graphql'
  | 'jsonpath'
  | 'viewer';

export type CategoryId = 'format-validate' | 'converters' | 'generators' | 'query-view';

export interface LocalizedCategoryData {
  name: string;
  desc: string;
}

export interface LocalizedToolData {
  name: string;
  h1: string;
  title: string;
  metaDesc: string;
  keywords: string;
  desc: string;
  badge?: string;
  answer: string;
  inputLabel: string;
  outputLabel: string;
  ctrKeywords: string[];
  faqs: ToolFAQ[];
  howTo: ToolHowToStep[];
  edgeCases?: EdgeCaseAnalysis[];
}

export interface LocalizedToolsBundle {
  categories: Record<CategoryId, LocalizedCategoryData>;
  tools: Record<ToolId, LocalizedToolData>;
  defaultEdgeCases: EdgeCaseAnalysis[];
}

