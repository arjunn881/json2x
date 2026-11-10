import {
  ui,
  defaultLang,
  showDefaultLang,
  LOCALES,
  LANGUAGE_META,
  isLocalizedRoute,
  normalizeCleanPath,
  type Lang,
  type UiKey,
} from './ui';

export function isValidLang(value: string | undefined): value is Lang {
  return Boolean(value && value in ui);
}

/**
 * Derive current locale from URL pathname (supports both clean URLs like `/es/tools`
 * and build-format `file` paths like `/es.html` or `/es/tools.html`).
 */
export function getLangFromUrl(url: URL): Lang {
  const clean = normalizeCleanPath(url.pathname);
  const [, lang] = clean.split('/');
  if (isValidLang(lang)) return lang;
  return defaultLang;
}

/**
 * Type-safe UI string lookup with automatic fallback to default English (`en`).
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang]?.[key] || ui[defaultLang][key];
  };
}

/**
 * Remove any leading locale segment (`/es`, `/ja`, ...) and normalize `.html`/trailing slashes.
 */
export function stripLocaleFromPath(pathname: string): string {
  const clean = normalizeCleanPath(pathname);
  const parts = clean.split('/').filter(Boolean);
  if (parts.length > 0 && isValidLang(parts[0])) {
    const rest = parts.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return clean;
}

/**
 * Extract the non-localized route key from a URL (per Astro i18n recipe).
 */
export function getRouteFromUrl(url: URL): string | undefined {
  const stripped = stripLocaleFromPath(url.pathname);
  const parts = stripped.split('/').filter(Boolean);
  if (parts.length === 0) return undefined;
  return parts.join('/');
}

/**
 * Translate an internal path into the target language if and only if that route exists
 * across all localized locales. English-only routes (`/privacy`, `/docs/*`, `/kb/*`, `/blog/*`, etc.)
 * always stay unprefixed so internal links never 404.
 */
export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang): string {
    if (!path) return path;
    if (
      path.startsWith('http://') ||
      path.startsWith('https://') ||
      path.startsWith('mailto:') ||
      path.startsWith('#')
    ) {
      return path;
    }

    const hashIdx = path.indexOf('#');
    const hash = hashIdx !== -1 ? path.slice(hashIdx) : '';
    const beforeHash = hashIdx !== -1 ? path.slice(0, hashIdx) : path;

    const queryIdx = beforeHash.indexOf('?');
    const query = queryIdx !== -1 ? beforeHash.slice(queryIdx) : '';
    const rawPath = queryIdx !== -1 ? beforeHash.slice(0, queryIdx) : beforeHash;

    const targetLang: Lang = isValidLang(l) ? l : defaultLang;
    const baseClean = stripLocaleFromPath(rawPath || '/');
    const suffix = `${query}${hash}`;

    if (!isLocalizedRoute(baseClean)) {
      return `${baseClean}${suffix}`;
    }

    if (!showDefaultLang && targetLang === defaultLang) {
      return `${baseClean}${suffix}`;
    }

    if (baseClean === '/') {
      return `/${targetLang}${suffix}`;
    }

    return `/${targetLang}${baseClean}${suffix}`;
  };
}

/**
 * Build a clean extensionless canonical URL for the current pathname.
 * Root `/` keeps trailing slash (`https://json2x.com/`), all other paths strip `.html` and trailing `/`.
 */
export function getCanonicalUrl(pathname: string, siteUrl = 'https://json2x.com'): string {
  const clean = normalizeCleanPath(pathname);
  return clean === '/' ? `${siteUrl}/` : `${siteUrl}${clean}`;
}

export interface HreflangAlternate {
  hreflang: string;
  href: string;
  locale: Lang;
  ogLocale: string;
}

/**
 * Build strict bidirectional `hreflang` alternates + `x-default` for localized routes.
 * Returns `[]` for English-only routes (`/privacy`, `/kb/*`, `/docs/*`, `/blog/*`, `/404`, etc.).
 */
export function getHreflangAlternates(
  pathname: string,
  siteUrl = 'https://json2x.com'
): HreflangAlternate[] {
  const baseClean = stripLocaleFromPath(pathname);
  if (!isLocalizedRoute(baseClean)) {
    return [];
  }

  const alternates: HreflangAlternate[] = LOCALES.map((loc) => {
    const meta = LANGUAGE_META[loc];
    let href: string;
    if (loc === defaultLang && !showDefaultLang) {
      href = baseClean === '/' ? `${siteUrl}/` : `${siteUrl}${baseClean}`;
    } else {
      href = baseClean === '/' ? `${siteUrl}/${loc}` : `${siteUrl}/${loc}${baseClean}`;
    }
    return {
      hreflang: meta.bcp47,
      href,
      locale: loc,
      ogLocale: meta.ogLocale,
    };
  });

  const enAlt = alternates.find((a) => a.locale === defaultLang);
  if (enAlt) {
    alternates.push({
      hreflang: 'x-default',
      href: enAlt.href,
      locale: defaultLang,
      ogLocale: enAlt.ogLocale,
    });
  }

  return alternates;
}

