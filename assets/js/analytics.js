/**
 * JSON2X — Privacy-Preserving Analytics & Event Tracking Engine
 * Supports GA4, Cloudflare Web Analytics, and Core Web Vitals Tracking
 * 100% Privacy Compliant: Zero PII or user payload data is ever logged or transmitted.
 */

(function () {
  'use strict';

  // ── GA4 & Verification Configuration Constants ──────────────
  const GA4_MEASUREMENT_ID = 'G-W5LWV30LK1';

  // ── GA4 Script Injection ─────────────────────────────────────
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);
  }

  // ── Structured Analytics Object ─────────────────────────────
  window.JT_Analytics = {
    trackEvent: function (eventName, eventParams) {
      const params = Object.assign({
        page_location: window.location.href,
        page_path: window.location.pathname
      }, eventParams || {});

      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
      }

      // Console logging for verification during development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[Analytics Event] ${eventName}:`, params);
      }
    },

    trackAction: function (actionType, details) {
      this.trackEvent(actionType, {
        event_category: 'tool_interaction',
        event_label: details || ''
      });
    }
  };

  // ── Automatic Outbound Link Tracking ─────────────────────────
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://')) && !href.includes('json2x.com')) {
      window.JT_Analytics.trackEvent('outbound_click', {
        event_category: 'outbound',
        destination_url: href
      });
    }
  }, { passive: true });

  // ── Automatic Copy, Download & Action Tracking ─────────────
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('button, .btn, .icon-btn');
    if (!btn) return;

    const id = btn.id || '';
    const text = (btn.textContent || '').trim().toLowerCase();

    if (id.includes('copy') || text.includes('copy')) {
      window.JT_Analytics.trackAction('copy_output', id);
    } else if (id.includes('download') || text.includes('download')) {
      window.JT_Analytics.trackAction('download_file', id);
    } else if (id.includes('paste') || text.includes('paste')) {
      window.JT_Analytics.trackAction('paste_input', id);
    } else if (id.includes('format') || text.includes('format')) {
      window.JT_Analytics.trackAction('format_json', id);
    } else if (id.includes('validate') || text.includes('validate')) {
      window.JT_Analytics.trackAction('validate_json', id);
    }
  }, { passive: true });

  // ── Scroll Depth Milestone Tracking (25%, 50%, 75%, 100%) ────
  const trackedDepths = {};
  window.addEventListener('scroll', function () {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height <= 0) return;

    const scrolled = Math.round((winScroll / height) * 100);
    [25, 50, 75, 100].forEach(milestone => {
      if (scrolled >= milestone && !trackedDepths[milestone]) {
        trackedDepths[milestone] = true;
        window.JT_Analytics.trackEvent('scroll_depth', {
          event_category: 'engagement',
          depth_percentage: milestone
        });
      }
    });
  }, { passive: true });

  // ── Core Web Vitals Tracking (LCP, CLS, INP) ────────────────
  if ('PerformanceObserver' in window) {
    try {
      // 1. LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          window.JT_Analytics.trackEvent('core_web_vitals', {
            metric_name: 'LCP',
            metric_value: Math.round(lastEntry.startTime)
          });
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // 2. CLS (Cumulative Layout Shift)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        window.JT_Analytics.trackEvent('core_web_vitals', {
          metric_name: 'CLS',
          metric_value: Math.round(clsValue * 1000) / 1000
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}
  }
})();
