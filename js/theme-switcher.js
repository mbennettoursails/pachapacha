/**
 * PachaPacha — Theme Switcher
 * themes-switcher.js
 *
 * All widget positioning done via inline styles.
 * Zero dependency on themes.css for visibility — bypasses
 * overflow:hidden on <body> and any CSS specificity issues.
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       Config
    ----------------------------------------------------------------------- */
    const STORAGE_KEY = 'pachapacha-theme';
    const DEFAULT_THEME = 'mono';

    const THEMES = [
        { id: 'mono',  label: 'Mono',  desc: 'Minimal black & white',  swatchGradient: 'linear-gradient(135deg, #111 50%, #f7f7f7 50%)' },
        { id: 'earth', label: 'Earth', desc: 'Warm greens & nature',   swatchGradient: 'linear-gradient(135deg, #0f2a1e 50%, #fafaf8 50%)' },
        { id: 'paper', label: 'Paper', desc: 'Soft cream editorial',   swatchGradient: 'linear-gradient(135deg, #2c2016 50%, #fefcf8 50%)' },
        { id: 'night', label: 'Night', desc: 'Deep dark mode',         swatchGradient: 'linear-gradient(135deg, #070a10 50%, #0e1117 50%)' },
    ];

    /* -----------------------------------------------------------------------
       Apply theme — sets [data-theme] on <html> and updates active buttons
    ----------------------------------------------------------------------- */
    function applyTheme(id, save) {
        if (!THEMES.find(t => t.id === id)) id = DEFAULT_THEME;

        document.documentElement.setAttribute('data-theme', id);

        // Update any rendered option buttons
        document.querySelectorAll('[data-theme-option]').forEach(btn => {
            const isActive = btn.dataset.themeOption === id;
            btn.style.background   = isActive ? '#f0f0f0' : 'transparent';
            btn.style.borderColor  = isActive ? '#111111' : 'transparent';
            btn.setAttribute('aria-pressed', String(isActive));
            const check = btn.querySelector('[data-check]');
            if (check) check.style.opacity = isActive ? '1' : '0';
        });

        if (save) {
            try { localStorage.setItem(STORAGE_KEY, id); } catch (_) {}
        }
    }

    /* -----------------------------------------------------------------------
       Read saved preference
    ----------------------------------------------------------------------- */
    function getSavedTheme() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && THEMES.find(t => t.id === saved)) return saved;
        } catch (_) {}
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'night';
        }
        return DEFAULT_THEME;
    }

    /* -----------------------------------------------------------------------
       Build widget — 100% inline styles, no CSS class dependency
    ----------------------------------------------------------------------- */
    function buildWidget() {

        /* Wrapper — fixed bottom-right anchor */
        const wrapper = document.createElement('div');
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', 'Theme selector');
        Object.assign(wrapper.style, {
            position:      'fixed',
            bottom:        '24px',
            right:         '24px',
            zIndex:        '2147483647',
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'flex-end',
            fontFamily:    "'DM Sans', 'Noto Sans JP', sans-serif",
        });

        /* Panel — sits above the FAB, hidden by default */
        const panel = document.createElement('div');
        Object.assign(panel.style, {
            marginBottom:  '10px',
            background:    '#ffffff',
            border:        '1px solid #e5e5e5',
            borderRadius:  '14px',
            padding:       '12px',
            boxShadow:     '0 4px 6px -1px rgba(0,0,0,0.08), 0 20px 48px -8px rgba(0,0,0,0.22)',
            width:         '210px',
            opacity:       '0',
            transform:     'translateY(8px) scale(0.97)',
            pointerEvents: 'none',
            transition:    'opacity 0.20s ease, transform 0.20s cubic-bezier(0.22,1,0.36,1)',
        });

        /* Heading */
        const heading = document.createElement('p');
        heading.textContent = 'Visual Style';
        Object.assign(heading.style, {
            fontSize:      '0.62rem',
            fontWeight:    '700',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         '#888',
            margin:        '0 0 8px 4px',
        });
        panel.appendChild(heading);

        /* Theme option buttons */
        THEMES.forEach(theme => {
            const btn = document.createElement('button');
            btn.dataset.themeOption = theme.id;
            btn.setAttribute('role', 'option');
            btn.setAttribute('aria-pressed', 'false');
            btn.title = theme.label;
            Object.assign(btn.style, {
                display:       'flex',
                alignItems:    'center',
                gap:           '12px',
                width:         '100%',
                padding:       '10px 12px',
                border:        '1px solid transparent',
                borderRadius:  '10px',
                background:    'transparent',
                cursor:        'pointer',
                textAlign:     'left',
                fontFamily:    'inherit',
                marginBottom:  '4px',
                transition:    'background 0.15s ease, border-color 0.15s ease',
            });

            // Swatch
            const swatch = document.createElement('div');
            Object.assign(swatch.style, {
                width:           '30px',
                height:          '30px',
                borderRadius:    '8px',
                flexShrink:      '0',
                border:          '1px solid rgba(0,0,0,0.08)',
                backgroundImage: theme.swatchGradient,
            });

            // Label
            const labelWrap = document.createElement('div');
            Object.assign(labelWrap.style, { display: 'flex', flexDirection: 'column' });

            const strong = document.createElement('strong');
            strong.textContent = theme.label;
            Object.assign(strong.style, {
                fontSize: '0.8rem', fontWeight: '600',
                color: '#111', lineHeight: '1', marginBottom: '2px', display: 'block',
            });

            const desc = document.createElement('span');
            desc.textContent = theme.desc;
            Object.assign(desc.style, { fontSize: '0.7rem', color: '#888', lineHeight: '1' });

            labelWrap.appendChild(strong);
            labelWrap.appendChild(desc);

            // Checkmark SVG
            const checkSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            checkSVG.dataset.check = '';
            checkSVG.setAttribute('viewBox', '0 0 16 16');
            checkSVG.setAttribute('fill', 'none');
            checkSVG.setAttribute('stroke', '#111');
            checkSVG.setAttribute('stroke-width', '2.5');
            checkSVG.setAttribute('stroke-linecap', 'round');
            checkSVG.setAttribute('stroke-linejoin', 'round');
            checkSVG.setAttribute('aria-hidden', 'true');
            Object.assign(checkSVG.style, {
                marginLeft: 'auto', width: '16px', height: '16px',
                flexShrink: '0', opacity: '0', transition: 'opacity 0.15s ease',
            });
            const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            poly.setAttribute('points', '2.5 8.5 6 12 13.5 4');
            checkSVG.appendChild(poly);

            btn.appendChild(swatch);
            btn.appendChild(labelWrap);
            btn.appendChild(checkSVG);

            btn.addEventListener('mouseenter', () => { btn.style.background = '#f7f7f7'; });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = btn.dataset.themeOption === document.documentElement.getAttribute('data-theme') ? '#f0f0f0' : 'transparent';
            });
            btn.addEventListener('click', () => applyTheme(theme.id, true));

            panel.appendChild(btn);
        });

        /* FAB toggle button */
        const fab = document.createElement('button');
        fab.setAttribute('aria-label', 'Open theme switcher');
        fab.setAttribute('aria-expanded', 'false');
        Object.assign(fab.style, {
            display:       'flex',
            alignItems:    'center',
            gap:           '6px',
            padding:       '10px 18px',
            borderRadius:  '50px',
            border:        '1px solid rgba(0,0,0,0.14)',
            background:    '#ffffff',
            color:         '#111111',
            cursor:        'pointer',
            fontSize:      '0.78rem',
            fontWeight:    '600',
            fontFamily:    'inherit',
            letterSpacing: '0.02em',
            whiteSpace:    'nowrap',
            outline:       'none',
            boxShadow:     '0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)',
            transition:    'box-shadow 0.2s ease, transform 0.15s ease',
        });

        fab.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                 style="width:14px;height:14px;flex-shrink:0;" aria-hidden="true">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <span>Style</span>
        `;

        fab.addEventListener('mouseenter', () => {
            fab.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)';
            fab.style.transform = 'translateY(-2px)';
        });
        fab.addEventListener('mouseleave', () => {
            fab.style.boxShadow = '0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)';
            fab.style.transform = 'translateY(0)';
        });

        /* Panel open / close */
        let panelOpen = false;

        function openPanel() {
            panelOpen = true;
            panel.style.opacity      = '1';
            panel.style.transform    = 'translateY(0) scale(1)';
            panel.style.pointerEvents= 'all';
            fab.setAttribute('aria-expanded', 'true');
            fab.setAttribute('aria-label', 'Close theme switcher');
        }

        function closePanel() {
            panelOpen = false;
            panel.style.opacity      = '0';
            panel.style.transform    = 'translateY(8px) scale(0.97)';
            panel.style.pointerEvents= 'none';
            fab.setAttribute('aria-expanded', 'false');
            fab.setAttribute('aria-label', 'Open theme switcher');
        }

        fab.addEventListener('click', (e) => {
            e.stopPropagation();
            panelOpen ? closePanel() : openPanel();
        });

        document.addEventListener('click', (e) => {
            if (panelOpen && !wrapper.contains(e.target)) closePanel();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panelOpen) { closePanel(); fab.focus(); }
        });

        wrapper.appendChild(panel);
        wrapper.appendChild(fab);
        return wrapper;
    }

    /* -----------------------------------------------------------------------
       Section marking (for theme CSS hooks)
    ----------------------------------------------------------------------- */
    function markSections() {
        const hero = document.querySelector('section[class*="from-water-950"]') ||
                     document.querySelector('section[class*="bg-gradient-to-b"]');
        if (hero) {
            hero.classList.add('hero-section');
            const wave = hero.querySelector('.absolute.bottom-0');
            if (wave) wave.classList.add('hero-wave-fade');
            const orbs = hero.querySelectorAll('.absolute:not(.bottom-0)[class*="animate-"]');
            orbs.forEach((orb, i) => orb.classList.add(i === 0 ? 'hero-orb-a' : 'hero-orb-b'));
        }
        const approachVisual = document.querySelector('.aspect-\\[4\\/3\\]');
        if (approachVisual) approachVisual.classList.add('approach-visual');
        const approachSection = document.querySelector('#approach');
        if (approachSection) approachSection.classList.add('approach-section');
        const decoA = document.querySelector('.absolute.-top-6');
        const decoB = document.querySelector('.absolute.-bottom-6');
        if (decoA) decoA.classList.add('approach-deco-a');
        if (decoB) decoB.classList.add('approach-deco-b');
        const contact = document.querySelector('section[class*="from-water-900"]');
        if (contact) contact.classList.add('contact-section');
    }

    /* -----------------------------------------------------------------------
       Init
    ----------------------------------------------------------------------- */
    function init() {
        // Apply theme immediately to avoid flash
        applyTheme(getSavedTheme(), false);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }

    function setup() {
        markSections();
        const widget = buildWidget();

        // Mount on <html> to escape any overflow:hidden on <body>
        document.documentElement.appendChild(widget);

        // Set correct active state on the freshly rendered buttons
        applyTheme(getSavedTheme(), false);
    }

    init();

})();