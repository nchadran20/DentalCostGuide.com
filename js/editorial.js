(function () {
  // Dental Cost Guide articles use .main-content rather than .article-body
  var articleBody = document.querySelector('.main-content') || document.querySelector('.article-body');
  if (!articleBody) return;

  var path = window.location.pathname;
  var skipPages = ['/about.html', '/contact.html', '/privacy.html', '/disclaimer.html', '/blog.html'];
  if (skipPages.some(function(p) { return path === p; })) return;

  // Don't inject on the homepage
  if (path === '/' || path === '/index.html') return;

  var bar = document.createElement('div');
  bar.className = 'editorial-bar';
  bar.innerHTML = [
    '<div class="editorial-bar-inner">',
      '<div class="editorial-icon">🦷</div>',
      '<div class="editorial-text">',
        '<strong>Verified by the Dental Cost Guide Research Team</strong>',
        '<span>Cost figures compiled from the ADA Survey of Dental Fees, Fair Health consumer cost data, insurance reimbursement benchmarks, and regional market research. All prices reflect 2026 US national averages. Actual costs vary by location, provider, and individual treatment plan. <strong>This site is not a dental clinic and does not provide dental advice.</strong> Always get a written estimate from a licensed dentist before proceeding with treatment.</span>',
      '</div>',
      '<div class="editorial-updated">',
        '<span class="editorial-updated-label">Last Updated</span>',
        '<span class="editorial-updated-date" id="dental-review-date"></span>',
      '</div>',
    '</div>'
  ].join('');

  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var now = new Date();
  bar.querySelector('#dental-review-date').textContent = months[now.getMonth()] + ' ' + now.getFullYear();

  var style = document.createElement('style');
  style.textContent = [
    '.editorial-bar {',
      'background: #0a5c4a;',
      'border-radius: 10px;',
      'padding: 14px 18px;',
      'margin: 0 0 28px 0;',
      'border-left: 4px solid #1D9E85;',
    '}',
    '.editorial-bar-inner {',
      'display: flex;',
      'align-items: flex-start;',
      'gap: 12px;',
    '}',
    '.editorial-icon {',
      'font-size: 1.2rem;',
      'flex-shrink: 0;',
      'margin-top: 2px;',
    '}',
    '.editorial-text {',
      'flex: 1;',
      'font-size: 0.83rem;',
      'color: rgba(255,255,255,0.8);',
      'line-height: 1.55;',
    '}',
    '.editorial-text strong {',
      'color: #7eecd6;',
      'display: block;',
      'margin-bottom: 3px;',
      'font-size: 0.82rem;',
    '}',
    '.editorial-text strong:last-of-type {',
      'display: inline;',
      'color: rgba(255,255,255,0.95);',
    '}',
    '.editorial-updated {',
      'flex-shrink: 0;',
      'text-align: right;',
      'font-size: 0.78rem;',
    '}',
    '.editorial-updated-label {',
      'display: block;',
      'color: rgba(255,255,255,0.45);',
      'text-transform: uppercase;',
      'letter-spacing: 0.07em;',
      'font-size: 0.7rem;',
      'margin-bottom: 2px;',
    '}',
    '.editorial-updated-date {',
      'color: rgba(255,255,255,0.75);',
      'font-weight: 600;',
      'white-space: nowrap;',
    '}',
    '@media (max-width: 600px) {',
      '.editorial-bar-inner { flex-wrap: wrap; }',
      '.editorial-updated { text-align: left; }',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  // Insert before the breadcrumb if it exists, otherwise at the top
  var breadcrumb = articleBody.querySelector('.breadcrumb');
  if (breadcrumb) {
    articleBody.insertBefore(bar, breadcrumb.nextSibling);
  } else {
    articleBody.insertBefore(bar, articleBody.firstChild);
  }
})();
