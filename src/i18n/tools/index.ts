import type { ToolCategory, ToolItem } from '../../data/tools';
import { CATEGORIES, TOOLS, getRelatedTools } from '../../data/tools';
import { TOOL_CONTENT, type ToolHowToStep } from '../../data/tool-content';
import { getToolRegistry, type EdgeCaseAnalysis, type ToolRegistryEntry } from '../../data/toolsRegistry';
import type { Lang } from '../ui';
import type { CategoryId, LocalizedToolsBundle, ToolId } from './types';
import { esTools } from './es';
import { jaTools } from './ja';
import { frTools } from './fr';
import { deTools } from './de';
import { ptTools } from './pt';
import { koTools } from './ko';
import { itTools } from './it';

const BUNDLES: Partial<Record<Exclude<Lang, 'en'>, LocalizedToolsBundle>> = {
  es: esTools,
  ja: jaTools,
  fr: frTools,
  de: deTools,
  pt: ptTools,
  ko: koTools,
  it: itTools,
};

export function getToolsBundle(lang: Lang): LocalizedToolsBundle | undefined {
  if (lang === 'en') return undefined;
  return BUNDLES[lang];
}

export function prefixToolHref(href: string, lang: Lang): string {
  if (lang === 'en') return href;
  return `/${lang}${href}`;
}

export function getLocalizedTool(tool: ToolItem, lang: Lang): ToolItem {
  if (lang === 'en') return tool;
  const bundle = BUNDLES[lang];
  if (!bundle) return tool;
  const tr = bundle.tools[tool.id as ToolId];
  if (!tr) return { ...tool, href: prefixToolHref(tool.href, lang) };

  return {
    ...tool,
    name: tr.name,
    h1: tr.h1,
    title: tr.title,
    metaDesc: tr.metaDesc,
    keywords: tr.keywords,
    desc: tr.desc,
    badge: tr.badge !== undefined ? tr.badge : tool.badge,
    answer: tr.answer,
    inputLabel: tr.inputLabel,
    outputLabel: tr.outputLabel,
    ctrKeywords: tr.ctrKeywords,
    faqs: tr.faqs,
    href: prefixToolHref(tool.href, lang),
  };
}

export function getLocalizedTools(lang: Lang): ToolItem[] {
  if (lang === 'en') return TOOLS;
  return TOOLS.map((tool) => getLocalizedTool(tool, lang));
}

export function getLocalizedCategory(category: ToolCategory, lang: Lang): ToolCategory {
  if (lang === 'en') return category;
  const bundle = BUNDLES[lang];
  const tr = bundle?.categories[category.id as CategoryId];
  if (!tr) return category;
  return {
    ...category,
    name: tr.name,
    desc: tr.desc,
  };
}

export function getLocalizedCategories(lang: Lang): ToolCategory[] {
  if (lang === 'en') return CATEGORIES;
  return CATEGORIES.map((cat) => getLocalizedCategory(cat, lang));
}

export function getLocalizedHowTo(toolId: string, lang: Lang): ToolHowToStep[] {
  if (lang === 'en') {
    return TOOL_CONTENT[toolId]?.howTo || [];
  }
  const bundle = BUNDLES[lang];
  const tr = bundle?.tools[toolId as ToolId];
  if (tr?.howTo && tr.howTo.length > 0) {
    return tr.howTo;
  }
  return TOOL_CONTENT[toolId]?.howTo || [];
}

export function getRelatedLocalizedTools(tool: ToolItem, lang: Lang): ToolItem[] {
  return getRelatedTools(tool).map((rel) => getLocalizedTool(rel, lang));
}

export function getLocalizedToolRegistry(toolId: string, lang: Lang): ToolRegistryEntry {
  const base = getToolRegistry(toolId);
  if (lang === 'en') return base;
  const bundle = BUNDLES[lang];
  if (!bundle) return base;
  const tr = bundle.tools[toolId as ToolId];
  const edgeCases: EdgeCaseAnalysis[] =
    tr?.edgeCases && tr.edgeCases.length > 0 ? tr.edgeCases : bundle.defaultEdgeCases;

  return {
    ...base,
    edgeCaseAnalysis: edgeCases,
  };
}

