// ==UserScript==
// @name         JFC Unblur
// @namespace    https://github.com/sp1wn3-gif
// @version      1.0.0
// @description  Removes CSS blur / blur overlays from Jack's Flight Club deal pages
// @match        https://members.jacksflightclub.com/*
// @match        https://*.jacksflightclub.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const BLUR = /blur\(/i;
  const MARK = 'data-jfc-unblurred';

  function fix(el) {
    const cs = getComputedStyle(el);
    let touched = false;

    // filter: blur(...)
    if (BLUR.test(cs.filter)) {
      el.style.setProperty('filter', 'none', 'important');
      touched = true;
    }

    // Frosted-glass overlays: backdrop-filter: blur(...)
    const bf = cs.backdropFilter || cs.webkitBackdropFilter || '';
    if (BLUR.test(bf)) {
      el.style.setProperty('backdrop-filter', 'none', 'important');
      el.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
      el.style.setProperty('background', 'transparent', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      touched = true;
    }

    // Text-shadow trick: transparent text + blurred shadow
    if (cs.textShadow !== 'none' && /rgba\(0, 0, 0, 0\)|transparent/.test(cs.color)) {
      el.style.setProperty('color', 'inherit', 'important');
      el.style.setProperty('text-shadow', 'none', 'important');
      touched = true;
    }

    if (touched) {
      el.style.setProperty('user-select', 'text', 'important');
      el.setAttribute(MARK, '');
    }
  }

  function scan() {
    if (!document.body) return;
    for (const el of document.body.querySelectorAll('*')) fix(el);
  }

  // React re-renders constantly, so rescan (throttled to one per frame) on DOM changes.
  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
})();
